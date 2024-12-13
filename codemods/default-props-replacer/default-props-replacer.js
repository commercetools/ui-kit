export default function transformer(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  const root = jscodeshift(fileInfo.source);

  root
    .find(jscodeshift.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        property: { name: 'defaultProps' },
      },
    })
    .forEach((path) => {
      const componentName = path.node.left.object.name;
      const defaultPropsNode = path.node.right;

      // Check if `defaultProps` is assigned via a variable
      if (defaultPropsNode.type === 'Identifier') {
        const defaultPropsVariable = root.find(jscodeshift.VariableDeclarator, {
          id: { name: defaultPropsNode.name },
        });
        // check if we have a variable declaration for the defaultProps and remove it.
        if (defaultPropsVariable.size() > 0) {
          const defaultPropsObject = defaultPropsVariable.get(0).node.init;
          if (
            defaultPropsObject &&
            defaultPropsObject.type === 'ObjectExpression'
          ) {
            applyDefaultPropsInline(
              componentName,
              defaultPropsObject.properties
            );
            defaultPropsVariable.remove();
          }
        }
        // otherwise, apply the default props inline since it's an object expression and no variable to remove
      } else if (defaultPropsNode.type === 'ObjectExpression') {
        applyDefaultPropsInline(componentName, defaultPropsNode.properties);
      }

      // Remove the `defaultProps` assignment
      jscodeshift(path).remove();
    });

  function getTypeName(path) {
    const initNode = path.node.init || path.node;
    const params = initNode.params;
    let typeName;

    //check for type annotation of the component props
    if (params.length > 0 && params[0].type === 'Identifier') {
      const typeAnnotation = params[0].typeAnnotation;

      if (
        typeAnnotation &&
        typeAnnotation.type === 'TSTypeAnnotation' &&
        typeAnnotation.typeAnnotation.type === 'TSTypeReference'
      ) {
        // Extract the type name (e.g., TCalendarBody)
        typeName = typeAnnotation.typeAnnotation.typeName.name;
        return typeName;
      }
    }
    return typeName;
  }

  // Helper to apply default props to a component
  function applyDefaultPropsInline(componentName, defaultProps) {
    let destructuredKeys = [];
    const component = root.find(jscodeshift.FunctionDeclaration, {
      id: { name: componentName },
    });

    const arrowFunction = root.find(jscodeshift.VariableDeclarator, {
      id: { name: componentName },
      init: { type: 'ArrowFunctionExpression' },
    });

    const updateParams = (compPath) => {
      const typeName = `${getTypeName(compPath)}`;
      const params =
        compPath.node.type === 'FunctionDeclaration'
          ? compPath.node.params
          : compPath.node.init?.params;

      if (!params || params.length === 0) {
        // No existing parameters, create a new destructured parameter
        const functionParams = jscodeshift.identifier(
          `{${defaultProps
            .map((prop) => {
              const keyValueAssignment = jscodeshift.assignmentPattern(
                jscodeshift.identifier(prop.key.name),
                prop.value
              );
              destructuredKeys.push(prop.key.name);
              return `${keyValueAssignment.left.name} = ${keyValueAssignment.right.value}`;
            })
            .join(', ')}, ...props}`
        );
        // check if the component is a function declaration or an arrow function
        if (compPath.node.type === 'FunctionDeclaration') {
          compPath.node.params = [functionParams];
          compPath.node.params[0].typeAnnotation = jscodeshift.tsTypeAnnotation(
            jscodeshift.tsTypeReference(jscodeshift.identifier(typeName))
          );
        } else if (compPath.node.init?.type === 'ArrowFunctionExpression') {
          compPath.node.init.params = [functionParams];
          compPath.node.init.params.typeAnnotation =
            jscodeshift.tsTypeAnnotation(
              jscodeshift.tsTypeReference(jscodeshift.identifier(typeName))
            );
        }
      } else {
        const propsParam = params[0];
        // check if the props parameter is an object pattern
        if (propsParam.type === 'ObjectPattern') {
          defaultProps.forEach((prop) => {
            const keyName = prop.key.name;
            const defaultValue = prop.value;
            const existingProp = propsParam.properties.find(
              (p) => p.key.name === keyName
            );
            // check if the prop already exists in the destructured props
            if (!existingProp) {
              propsParam.properties.push(
                jscodeshift.property(
                  'init',
                  jscodeshift.identifier(keyName),
                  jscodeshift.assignmentPattern(
                    jscodeshift.identifier(keyName),
                    defaultValue
                  )
                )
              );
            }
          });
        } else {
          const functionParams = jscodeshift.identifier(
            `{${defaultProps
              .map((prop) => {
                const keyValueAssignment = jscodeshift.assignmentPattern(
                  jscodeshift.identifier(prop.key.name),
                  prop.value
                );
                destructuredKeys.push(prop.key.name);
                // check if the prop value is a string and add quotes or just add the value
                if (typeof prop.value.value === 'string') {
                  return `${keyValueAssignment.left.name} = '${keyValueAssignment.right.value}'`;
                }
                return `${keyValueAssignment.left.name} = ${keyValueAssignment.right.value}`;
              })
              .join(', ')}, ...props}`
          );

          const initNode = compPath.node.init || compPath.node;

          initNode.params[0] = functionParams;
          initNode.params[0].typeAnnotation = jscodeshift.tsTypeAnnotation(
            jscodeshift.tsTypeReference(jscodeshift.identifier(typeName))
          );
        }
      }

      // Process arrow function components
      root.find(jscodeshift.VariableDeclarator).forEach((path) => {
        if (
          path.node.init &&
          path.node.init.type === 'ArrowFunctionExpression'
        ) {
          if (destructuredKeys.length > 0) {
            replacePropsUsage(destructuredKeys, root);
          }
        }
      });

      // Process function declarations
      root.find(jscodeshift.FunctionDeclaration).forEach((path) => {
        if (destructuredKeys.length > 0) {
          replacePropsUsage(destructuredKeys, root);
        }
      });

      // Replace `props.<name>` usage with `<name>` if destructured
      function replacePropsUsage(destructuredKeys, astRoot) {
        astRoot
          .find(jscodeshift.MemberExpression, {
            object: { type: 'Identifier', name: 'props' },
          })
          .forEach((memberPath) => {
            const propertyName = memberPath.node.property.name;
            if (destructuredKeys.includes(propertyName)) {
              jscodeshift(memberPath).replaceWith(
                jscodeshift.identifier(propertyName)
              );
            }
          });
      }
    };

    if (component.size() > 0) {
      component.forEach(updateParams);
    }

    if (arrowFunction.size() > 0) {
      arrowFunction.forEach(updateParams);
    }
  }

  return root.toSource();
}

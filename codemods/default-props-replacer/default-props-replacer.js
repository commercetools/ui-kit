export default function transformer(fileInfo, api) {
  const jscodeshift = api.jscodeshift;

  const root = jscodeshift(fileInfo.source);
  // Go over every file and search for default props assignment
  root
    .find(jscodeshift.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        property: { name: 'defaultProps' },
      },
    })
    .forEach((path) => {
      const componentName = path.node.left.object.name; // Extract the component name
      const defaultPropsNode = path.node.right; // Extract the `defaultProps` value

      // Check if `defaultProps` is assigned via a variable
      // example snippet: `const defaultProps = { ... }`
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

  // Helper to extract the type name of the component. We are extracting the type name from the type annotation of the component props.
  // example: `function TCalendarBody(props: TCalendarBodyProps) { ... }`
  // In this example, the type name is `TCalendarBodyProps`. We need this type name so that we can use it in the new syntax,
  // when arranging the parameters of the component along side it's inline destrcutured default props, we can add the type annotation at the end like so: `{prop1, prop2, ...props}: TCalendarBodyProps`
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

  // Helper to apply default props to a component inline. This function will add the default props as a destructured parameter to the component.
  // example: `function TCalendarBody({prop1 = 'value1', prop2 = 'value2', ...props}: TCalendarBodyProps) { ... }`
  function applyDefaultPropsInline(componentName, defaultProps) {
    let destructuredKeys = [];
    const component = root.find(jscodeshift.FunctionDeclaration, {
      id: { name: componentName },
    });

    // Check if the component is an arrow function. If so, we need to handle it differently.
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

      // Here, we are building function parameter in the structure we want the syntax to exist. that is, we are adding the default props as a destructured parameter to the component.
      // example: `function TCalendarBody({prop1 = 'value1', prop2 = 'value2', ...props}: ...`
      // the No existing parameters, create a new destructured parameter.
      if (!params || params.length === 0) {
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
            .join(', ')}, ...props}` // Add the rest parameter to capture the rest of the props as we would normally do in the end of the new syntax so we can have {prop1 = 'value1', prop2 = 'value2', ...props}....
        );
        // After checking if this is a function declaration or an arrow function, we add the new destructured parameter to the component to get both the params and the type anotation.
        //  everything comes together to give the function parameter `function TCalendarBody({prop1 = 'value1', prop2 = 'value2', ...props}: TCalendarBodyProps) { ... }`
        if (compPath.node.type === 'FunctionDeclaration') {
          compPath.node.params = [functionParams]; // Add the new destructured parameter to the component
          // Add the type annotation to the new destructured parameter
          compPath.node.params[0].typeAnnotation = jscodeshift.tsTypeAnnotation(
            jscodeshift.tsTypeReference(jscodeshift.identifier(typeName))
          );
        } else if (compPath.node.init?.type === 'ArrowFunctionExpression') {
          compPath.node.init.params = [functionParams]; // Add the new destructured parameter to the component
          compPath.node.init.params.typeAnnotation =
            jscodeshift.tsTypeAnnotation(
              jscodeshift.tsTypeReference(jscodeshift.identifier(typeName))
            );
        }
      } else {
        // If the component already has parameters, we need to check if the props parameter is an object pattern or a rest parameter.
        const propsParam = params[0];
        // check if the props parameter is an object pattern
        // if it is, we need to add the default props that are not already in the destructured props. This way, we can avoid overriding the existing props.
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
          // If the props parameter is a rest parameter, we need to add the default props to the rest parameter.
          // The purpose is for us to have the default props and the rest parameter in the same parameter and also capture each prop in the default prop, so we can equate it to it's value in the now inline function parameters.
          // We are concatenating this way because the closest method in jscodeshift documentation to manipulate an object the way we want is the objectPattern and that will return {props1: 'value1} but what we want is {props1 = 'value1'}.
          // The `keyValueAssignment` variable here is used to create the key value pair in the object pattern to help us achieve this.
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

      // Replace `props.<name>` usage with `<name>` if destructured.
      // This is done to avoid the `props` object being used in the component body.
      // Since we are destructuring the props already, we can directly use the prop name.
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

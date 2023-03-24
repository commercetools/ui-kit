import { Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import pick from 'lodash/pick';
import { designTokens } from '../../design-system';
import { LocalThemeProvider } from './local-theme-provider';

const SpecContainer = styled.div`
  display: flex;
  flex-direction: column;
  /*
    We don't want a change in a component's height resulting in diffs of the
    remaining states below it, so we establish a min-height for each spec to
    prevent that.
  */
  min-height: 400px;
`;

const Label = styled.div`
  font-family: ${designTokens.fontFamilyDefault};
  font-weight: bold;
  box-sizing: border-box;
  background-color: #774caf;
  padding: 5px;
  color: ${designTokens.colorSurface};
  font-size: ${designTokens.fontSizeDefault};
`;

const PropList = styled.div`
  font-family: ${designTokens.fontFamilyDefault};
  background-color: #894ac3;
  padding: 5px;
  box-sizing: border-box;
  font-size: 8pt;
  font-family: monospace;
  color: ${designTokens.colorSurface};
`;

const PropLabel = styled.span`
  font-weight: bold;
  padding: 0 ${designTokens.spacing10};
  min-width: 140px;
  display: inline-block;
  box-sizing: border-box;
`;

const PropValue = styled.span`
  padding: 0 ${designTokens.spacing10};
  box-sizing: border-box;
`;

const Box = (props) => {
  return (
    <div
      css={css`
        background-color: ${props.backgroundColor ?? designTokens.colorSurface};
        margin-bottom: 20px;
      `}
    >
      <p
        css={css`
          text-decoration: underline;
          font-weight: bold;
          :first-letter {
            text-transform: capitalize;
          }
        `}
      >
        {props.themeName ? `${props.themeName} theme` : null}
      </p>
      {props.themeName === 'new' ? (
        <LocalThemeProvider theme="test">{props.children}</LocalThemeProvider>
      ) : (
        props.children
      )}
    </div>
  );
};
Box.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  themeName: PropTypes.string.isRequired,
};

const Pill = (props) => {
  const value = (() => {
    if (isValidElement(props.value)) return 'React Element';
    if (
      Array.isArray(props.value) &&
      props.value.every((element) => isValidElement(element))
    )
      return '[React Element]';
    try {
      return JSON.stringify(props.value);
    } catch (e) {
      return '-';
    }
  })();
  return (
    <div>
      <PropLabel>{props.label}</PropLabel>
      <PropValue>{value}</PropValue>
    </div>
  );
};

Pill.displayName = 'Pill';
Pill.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const Props = (props) => {
  const node = props.listPropsOfNestedChild
    ? Children.only(props.children.props.children)
    : Children.only(props.children);

  const propEntries = Object.entries(
    props.propsToList ? pick(node.props, props.propsToList) : node.props
  );

  return (
    <PropList>
      {propEntries
        .filter(([, value]) => typeof value !== 'function')
        .map(([key, value]) => (
          <Pill key={key} label={key} value={value} />
        ))}
    </PropList>
  );
};

Props.displayName = 'Props';
Props.propTypes = {
  children: PropTypes.node.isRequired,
  listPropsOfNestedChild: PropTypes.bool.isRequired,
  propsToList: PropTypes.arrayOf(PropTypes.string),
};

const Spec = (props) => {
  return (
    <SpecContainer>
      <Label>{props.label}</Label>
      {!props.omitPropsList && (
        <Props
          propsToList={props.propsToList}
          listPropsOfNestedChild={props.listPropsOfNestedChild}
        >
          {props.children}
        </Props>
      )}
      {props.testedThemes.includes('old') ? (
        <Box themeName="old" backgroundColor={props.backgroundColor}>
          {props.children}
        </Box>
      ) : null}
      {props.testedThemes.includes('new') ? (
        <Box themeName="new" backgroundColor={props.backgroundColor}>
          {props.children}
        </Box>
      ) : null}
      {/* For cases when the default theme is needed and the theme label is not necessary */}
      {props.testedThemes.length === 0 ? (
        <Box backgroundColor={props.backgroundColor}>{props.children}</Box>
      ) : null}
    </SpecContainer>
  );
};

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  listPropsOfNestedChild: PropTypes.bool,
  propsToList: PropTypes.arrayOf(PropTypes.string),
  omitPropsList: PropTypes.bool,
  backgroundColor: PropTypes.string,
  testedThemes: PropTypes.arrayOf(PropTypes.string),
};

Spec.defaultProps = {
  omitPropsList: false,
  listPropsOfNestedChild: false,
  testedThemes: ['new', 'old'],
};

Spec.displayName = 'Spec';

export default Spec;

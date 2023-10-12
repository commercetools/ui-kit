import { useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import Grid from '@commercetools-uikit/grid';
import Spacings from '@commercetools-uikit/spacings';
import {
  MultilineTextInput,
  RadioInput,
  SelectInput,
} from '@commercetools-uikit/inputs';
import Section from '../../../../docs/.storybook/decorators/section';
import Text from '../../text';
import Readme from '../README.md';
import xssFixtures from './fixtures/xss';
import InlineSvg from './inline-svg';
import * as icons from '.';

const DEPRECATED_ICONS_NAMES = [
  'ArrowTriangleDownIcon',
  'ArrowTriangleUpIcon',
  'AngleThinLeftIcon',
  'AngleThinRightIcon',
  'CubeIcon',
  'CubesIcon',
];

const IconList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 16px 0;
`;

const LegacyBadge = () => (
  <span
    css={css`
      color: ${designTokens.colorSolid};
      background-color: ${designTokens.colorWarning95};
      border: 1px solid ${designTokens.colorWarning};
      border-radius: ${designTokens.borderRadius2};
      font-size: ${designTokens.fontSizeSmall};
      margin-top: ${designTokens.spacing10};
      padding: 0 ${designTokens.spacing10};
    `}
  >
    Legacy
  </span>
);

const iconNames = Object.keys(icons);

const colorValues = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
];
const sizeValues = ['small', 'medium', 'big', 'scale'];
const svgFixtures = {
  cleanSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13.7324356,13 C13.3866262,13.5978014 12.7402824,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.2597176 10.4021986,10.6133738 11,10.2675644 L11,7 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,10.2675644 C13.303628,10.4432037 13.5567963,10.696372 13.7324356,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L13.7324356,13 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"/></svg>`,
  dirtySvg: xssFixtures.filter((fixture) => fixture.payload.includes('svg')),
};
const SelectSvgFixtureOption = (props) => (
  <SelectInput.Option {...props}>
    <Spacings.Stack scale="xs">
      <Text.Body fontWeight="bold">{props.data.label ?? '---'}</Text.Body>
      <Text.Detail>{props.data.value}</Text.Detail>
    </Spacings.Stack>
  </SelectInput.Option>
);
SelectSvgFixtureOption.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

const InlineSvgPage = (props) => {
  const [activeExample, setActiveExample] = useState('cleanSvg');
  const [activeSvgFixture, setActiveSvgFixture] = useState('');
  const [customSvgData, setCustomSvg] = useState('');
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Select the SVG to render:</Text.Headline>
        <RadioInput.Group
          onChange={(event) => {
            setActiveExample(event.target.value);
          }}
          value={activeExample}
        >
          <RadioInput.Option value="cleanSvg">
            <Spacings.Inline alignItems="center">
              Clean SVG (no XSS)
            </Spacings.Inline>
          </RadioInput.Option>
          <RadioInput.Option value="dirtySvg">
            <Spacings.Inline alignItems="center">
              SVG examples with XSS injection
            </Spacings.Inline>
          </RadioInput.Option>
          {activeExample === 'dirtySvg' && (
            <SelectInput
              value={activeSvgFixture}
              onChange={(event) => {
                setActiveSvgFixture(event.target.value);
              }}
              options={svgFixtures.dirtySvg.map((fixture, index) => ({
                label: fixture.title,
                value: fixture.payload,
              }))}
              components={{
                Option: SelectSvgFixtureOption,
              }}
            />
          )}
          <RadioInput.Option value="custom">
            <Spacings.Inline alignItems="center">Custom SVG</Spacings.Inline>
          </RadioInput.Option>
          {activeExample === 'custom' && (
            <MultilineTextInput
              value={customSvgData}
              onChange={(event) => {
                setCustomSvg(event.target.value);
              }}
            />
          )}
        </RadioInput.Group>
      </Spacings.Stack>
      <Spacings.Stack scale="m">
        <Text.Headline as="h2">Rendered:</Text.Headline>
        {colorValues.map((color) => (
          <Spacings.Stack scale="xs" key={color}>
            <Text.Body fontWeight="bold">
              <code>color: {color}</code>
            </Text.Body>
            <div
              style={{
                height: '100%',
                backgroundColor:
                  color === 'surface' ? designTokens.colorSolid : 'inherit',
              }}
            >
              <Grid
                gridGap={designTokens.spacing20}
                gridAutoColumns="1fr"
                gridTemplateColumns={`repeat(${colorValues.length}, 1fr)`}
                alignItems="center"
              >
                {sizeValues.map((size) => {
                  let data = '';
                  switch (activeExample) {
                    case 'cleanSvg': {
                      data = svgFixtures.cleanSvg;
                      break;
                    }
                    case 'dirtySvg': {
                      const fixture = svgFixtures.dirtySvg.find(
                        (fixture) => fixture.payload === activeSvgFixture
                      );
                      data = fixture?.payload ?? '';
                      break;
                    }
                    case 'custom': {
                      data = customSvgData;
                      break;
                    }
                    default:
                      break;
                  }
                  return (
                    <InlineSvg
                      key={`${color}-${size}`}
                      data={data}
                      size={size}
                      color={color}
                    />
                  );
                })}
              </Grid>
            </div>
          </Spacings.Stack>
        ))}
      </Spacings.Stack>
    </Spacings.Stack>
  );
};

storiesOf('Components|Icons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('All Icons', () => (
    <Spacings.Stack scale="m">
      <Text.Body isItalic>
        Icons marked with the <LegacyBadge /> label are not supported anymore.
        <br />
        They will be removed in the future.
      </Text.Body>
      <IconList>
        {Object.values(icons).map((Icon, index) => {
          const sizeValue = select(
            'size',
            ['small', 'medium', 'big', 'scale'],
            'big'
          );
          const containerWidth =
            sizeValue === 'scale'
              ? {
                  width: `${select(
                    'container width',
                    ['100', '200', '300', '400'],
                    '100'
                  )}px`,
                }
              : {};
          return (
            <IconItem key={index}>
              <IconContainer style={containerWidth}>
                <Icon
                  size={sizeValue}
                  color={select(
                    'color',
                    [
                      'solid',
                      'neutral60',
                      'surface',
                      'info',
                      'primary',
                      'primary40',
                      'warning',
                      'error',
                    ],
                    'solid'
                  )}
                />
              </IconContainer>
              <Text.Body>{iconNames[index]}</Text.Body>
              {DEPRECATED_ICONS_NAMES.includes(iconNames[index]) ? (
                <LegacyBadge />
              ) : null}
            </IconItem>
          );
        })}
      </IconList>
    </Spacings.Stack>
  ))
  .add('Inline SVG', () => (
    <Section>
      <InlineSvgPage />
    </Section>
  ));

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Stamp from '@commercetools-uikit/stamp';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import RadioInput from '@commercetools-uikit/radio-input';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import { useState } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TOption } from '@commercetools-uikit/select-input';
import { OptionProps } from 'react-select';

import * as icons from './index';
import xssFixtures from './fixtures/xss';
import InlineSvg from './inline-svg';

const colorOptions: icons.Props['color'][] = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
];
const sizeOptions: icons.Props['size'][] = ['small', 'medium', 'big', 'scale'];

const meta = {
  title: 'Components/Icons',
  component: icons.AngleDownIcon,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: colorOptions,
      control: { type: 'select' },
    },
    size: {
      options: sizeOptions,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof icons.AngleDownIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

const DEPRECATED_ICONS_NAMES = [
  'ArrowTriangleDownIcon',
  'ArrowTriangleUpIcon',
  'AngleThinLeftIcon',
  'AngleThinRightIcon',
  'CubeIcon',
  'CubesIcon',
];

const iconNames = Object.keys(icons);

const IconList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 16px 0;
`;

const LegacyBadge = () => <Stamp tone="warning" isCondensed label="Legacy" />;

export const Default: Story = {
  args: {
    size: 'big',
    color: 'solid',
  },
  render: (args) => (
    <Spacings.Stack scale="m">
      <Text.Body isItalic>
        Icons marked with the <LegacyBadge /> label are not supported anymore.
        <br />
        They will be removed in the future.
      </Text.Body>
      <IconList>
        {Object.values(icons).map((Icon, index) => {
          return (
            <IconItem key={index}>
              <IconContainer>
                <Icon {...args} />
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
  ),
};

const svgFixtures = {
  cleanSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13.7324356,13 C13.3866262,13.5978014 12.7402824,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.2597176 10.4021986,10.6133738 11,10.2675644 L11,7 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,10.2675644 C13.303628,10.4432037 13.5567963,10.696372 13.7324356,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L13.7324356,13 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"/></svg>`,
  dirtySvg: xssFixtures.filter((fixture) => fixture.payload.includes('svg')),
};
const SelectSvgFixtureOption = (props: OptionProps<TOption>) => (
  <SelectInput.Option {...props}>
    <Spacings.Stack scale="xs">
      <Text.Body isBold>{props.data.label ?? '---'}</Text.Body>
      <Text.Detail>{props.data.value}</Text.Detail>
    </Spacings.Stack>
  </SelectInput.Option>
);

const InlineSVGView = () => {
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
                setActiveSvgFixture(
                  Array.isArray(event.target.value)
                    ? event.target.value[0]
                    : event.target.value!
                );
              }}
              options={svgFixtures.dirtySvg.map((fixture) => ({
                label: fixture.title,
                value: fixture.payload,
              }))}
              components={{
                // @ts-ignore
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
        {colorOptions.map((color) => (
          <Spacings.Stack scale="xs" key={color}>
            <Text.Body isBold>
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
                gridTemplateColumns={`repeat(${colorOptions.length}, 1fr)`}
                alignItems="center"
              >
                {sizeOptions.map((size) => {
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

export const InlineSVG: Story = {
  render: () => <InlineSVGView />,
};

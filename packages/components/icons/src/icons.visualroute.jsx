import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';
import { designTokens } from '@commercetools-uikit/design-system';
import * as icons from '@commercetools-uikit/icons';
import CustomIcon from '@commercetools-uikit/icons/custom-icon';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import LeadingIcon from '@commercetools-uikit/icons/leading-icon';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import CustomReactSvg from './fixtures/CustomIconReact';
import rawSvg from './fixtures/raw-svg';
import { Suite, Spec } from '../../../../test/percy';

const IconList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const LeadingIconList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const LeadingIconItem = styled(IconItem)`
  gap: 16px;
`;

const IconContainer = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.big ? '50px' : '25px')};
`;

const allIconNames = Object.keys(icons).sort();

const sizes = ['10', '20', '30', '40', 'scale'];
const colors = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
  'success',
];

const leadingIconColors = [
  'accent',
  'brown',
  'turquoise',
  'purple',
  'neutral',
  'white',
];
const leadingIconSizes = ['10', '20', '30', '40'];
const IconForLeadingIcon = icons[allIconNames[0]];

export const routePath = '/icons';

const renderIcon = (iconName, color, size) => {
  const Icon = icons[iconName];
  return (
    <IconItem key={`${iconName}-${size}-${color}`}>
      <IconContainer big={size === 'scale'}>
        <Icon color={color} size={size} />
      </IconContainer>
      <Text.Body>{iconName}</Text.Body>
    </IconItem>
  );
};

export const component = () => (
  <Switch>
    <Route path={routePath} exact>
      <ul>
        {colors.map((color) => (
          <li key={`${routePath}/${color}`}>
            <a href={`${routePath}/${color}`}>{`${routePath}/${color}`}</a>
          </li>
        ))}
        <li>
          <a href={`${routePath}/theme`}>{`${routePath}/theme`}</a>
        </li>
        <li>
          <a href={`${routePath}/inline-svg`}>{`${routePath}/inline-svg`}</a>
        </li>
        <li>
          <a
            href={`${routePath}/leading-icon`}
          >{`${routePath}/leading-icon`}</a>
        </li>
        <li>
          <a href={`${routePath}/custom-icon`}>{`${routePath}/custom-icon`}</a>
        </li>
      </ul>
    </Route>
    {colors.map((color) => (
      <Route key={color} path={`${routePath}/${color}`} exact>
        <Suite>
          {sizes.map((size) => (
            <Spec
              key={size}
              label={`All Icons - Color: ${color} / Size: ${size}`}
              omitPropsList
            >
              <IconList>
                {allIconNames.map((iconName) =>
                  renderIcon(iconName, color, size)
                )}
              </IconList>
            </Spec>
          ))}
        </Suite>
      </Route>
    ))}
    <Route exact path={`${routePath}/inline-svg`}>
      <Suite>
        <Spacings.Stack>
          {sizes.map((size) => (
            <Spec key={size} label={`Inline SVG - Size: ${size}`} omitPropsList>
              <IconList>
                {colors.map((color) => (
                  <div
                    style={{
                      height: '100%',
                      backgroundColor:
                        color === 'surface'
                          ? designTokens.colorSolid
                          : 'inherit',
                    }}
                    key={`${size}-${color}`}
                  >
                    <InlineSvg data={rawSvg.clock} color={color} size={size} />
                  </div>
                ))}
              </IconList>
            </Spec>
          ))}
        </Spacings.Stack>
      </Suite>
    </Route>
    <Route exact path={`${routePath}/leading-icon`}>
      <Suite>
        {leadingIconSizes.map((size) => (
          <Spec key={size} label={`Leading Icon - Size: ${size}`} omitPropsList>
            <LeadingIconList>
              {leadingIconColors.map((color) => (
                <LeadingIconItem key={`${size}-${color}`}>
                  <Spacings.Stack alignItems="center">
                    <LeadingIcon
                      size={size}
                      color={color}
                      icon={<IconForLeadingIcon />}
                    />
                    <Text.Detail>{`${color}`}</Text.Detail>
                  </Spacings.Stack>
                  <Spacings.Stack alignItems="center">
                    <LeadingIcon
                      size={size}
                      color={color}
                      icon={<IconForLeadingIcon />}
                      isInverted={true}
                    />
                    <Text.Detail>{`inverted`}</Text.Detail>
                  </Spacings.Stack>
                </LeadingIconItem>
              ))}
            </LeadingIconList>
          </Spec>
        ))}
        <Spec label={`Leading Icon - Custom SVG`} omitPropsList>
          <LeadingIconList label={`Leading Icon - Custom SVG`}>
            {leadingIconSizes.map((size) => (
              <LeadingIconItem key={size}>
                <Spacings.Stack alignItems="center">
                  <LeadingIcon size={size} svg={rawSvg.clock} />
                  <Text.Detail>{`custom-svg size ${size}`}</Text.Detail>
                </Spacings.Stack>
                <Spacings.Stack alignItems="center">
                  <LeadingIcon
                    size={size}
                    svg={rawSvg.clock}
                    isInverted={true}
                  />
                  <Text.Detail>{`inverted`}</Text.Detail>
                </Spacings.Stack>
              </LeadingIconItem>
            ))}
          </LeadingIconList>
        </Spec>
      </Suite>
    </Route>
    <Route exact path={`${routePath}/custom-icon`}>
      <Suite>
        <Spec label={`Custom Icon - React Element`} omitPropsList>
          <LeadingIconList label={`Custom Icon - React Element`}>
            {leadingIconSizes.map((size) => (
              <LeadingIconItem key={size}>
                <Spacings.Stack alignItems="center">
                  <CustomIcon size={size} icon={<CustomReactSvg />} />
                  <Text.Detail>{`size ${size}`}</Text.Detail>
                </Spacings.Stack>
              </LeadingIconItem>
            ))}
          </LeadingIconList>
        </Spec>
        <Spec label={`Custom Icon - SVG String`} omitPropsList>
          <LeadingIconList label={`Custom Icon - SVG String`}>
            {leadingIconSizes.map((size) => (
              <LeadingIconItem key={size}>
                <Spacings.Stack alignItems="center">
                  <CustomIcon size={size} icon={rawSvg.clock} />
                  <Text.Detail>{` size ${size}`}</Text.Detail>
                </Spacings.Stack>
              </LeadingIconItem>
            ))}
          </LeadingIconList>
        </Spec>
        <Spec label={`Custom Icon - No Border`} omitPropsList>
          <LeadingIconList label={`Custom Icon - No Border`}>
            {leadingIconSizes.map((size) => (
              <LeadingIconItem key={size}>
                <Spacings.Stack alignItems="center">
                  <CustomIcon
                    size={size}
                    icon={<CustomReactSvg />}
                    hasBorder={false}
                  />
                  <Text.Detail>{`size ${size}`}</Text.Detail>
                </Spacings.Stack>
              </LeadingIconItem>
            ))}
          </LeadingIconList>
        </Spec>
      </Suite>
    </Route>
  </Switch>
);

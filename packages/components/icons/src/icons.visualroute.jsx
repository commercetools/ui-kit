import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';
import { customProperties } from '@commercetools-uikit/design-system';
import * as icons from '@commercetools-uikit/icons';
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec, LocalDarkThemeProvider } from '../../../../test/percy';

const IconList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.big ? '50px' : '25px')};
`;

const allIconNames = Object.keys(icons).sort();

const sizes = ['small', 'medium', 'big', 'scale'];
const colors = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
];

const inlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" fill-rule="evenodd" d="M13.7324356,13 C13.3866262,13.5978014 12.7402824,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.2597176 10.4021986,10.6133738 11,10.2675644 L11,7 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,10.2675644 C13.303628,10.4432037 13.5567963,10.696372 13.7324356,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L13.7324356,13 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"/></svg>`;

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
                          ? customProperties.colorSolid
                          : 'inherit',
                    }}
                    key={`${size}-${color}`}
                  >
                    <InlineSvg data={inlineSvg} color={color} size={size} />
                  </div>
                ))}
              </IconList>
            </Spec>
          ))}
        </Spacings.Stack>
      </Suite>
    </Route>
  </Switch>
);

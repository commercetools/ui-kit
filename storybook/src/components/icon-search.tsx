import { useMemo, useState, type FC } from 'react';
import * as icons from '@commercetools-uikit/icons';
import styled from '@emotion/styled';
import TextInput from '@commercetools-uikit/text-input';
import IconButton from '@commercetools-uikit/icon-button';

const DEPRECATED_ICONS_NAMES = [
  'ArrowTriangleDownIcon',
  'ArrowTriangleUpIcon',
  'AngleThinLeftIcon',
  'AngleThinRightIcon',
  'CubeIcon',
  'CubesIcon',
];

const iconList = Object.keys(icons).map((iconName) => {
  return {
    name: iconName,
    icon: icons[iconName as keyof typeof icons],
    deprecated: DEPRECATED_ICONS_NAMES.includes(iconName),
    importString: `import { ${iconName} } from '@commercetools-uikit/icons';`,
  };
});

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1em;
`;

interface GridItemProps {
  deprecated?: boolean;
}
const GridItem = styled.li<GridItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 128px;

  ${(props) =>
    props.deprecated &&
    `
    opacity: .125;
    cursor: not-allowed;
    user-select: none;
  `};
  position: relative;

  button {
    display: none;
  }

  &:hover {
    background-color: #f9f9f9;
    opacity: 1;

    button {
      display: flex;
    }

    ${(props) =>
      props.deprecated &&
      `
   button { display: none !important; }
  &:after {
    content: '@deprecated';
    position: absolute;
    background: black;
    color: white;
    font-weight: bold;
    padding: .25em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  `};
  }
`;

const IconItem = styled.div`
  aspect-ratio: 1;
  display: block;
  margin-bottom: 1em;

  svg {
    display: block;
    width: 48px;
    height: 48px;
    fill: currentColor;
  }
`;

const CopyContainer = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;

interface IconNameProps {
  deprecated?: boolean;
}
const IconName = styled.div<IconNameProps>`
  text-decoration: ${(props) => (props.deprecated ? 'line-through' : 'none')};
`;

export const IconSearch: FC = () => {
  const [q, setQ] = useState('');

  const filteredIcons = useMemo(() => {
    if (q === '') return iconList;
    return iconList.filter((icon) =>
      icon.name.toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);

  const onCopyRequest = (str: string, iconName: string) => {
    navigator.clipboard.writeText(str);
    alert(`Copied the import statement for '${iconName}' to clipboard!`);
  };

  return (
    <div>
      <TextInput
        onChange={(e) => setQ(e.target.value)}
        value={q}
        placeholder="Filter for name ..."
      />

      <Grid>
        {filteredIcons.map((icon) => (
          <GridItem key={icon.name} deprecated={icon.deprecated}>
            <IconItem>
              <icon.icon />
            </IconItem>
            <IconName deprecated={icon.deprecated}>{icon.name}</IconName>
            <CopyContainer>
              <IconButton
                label="Copy import statement to clipboard"
                size="40"
                icon={<icons.CopyIcon />}
                onClick={() => onCopyRequest(icon.importString, icon.name)}
              />
            </CopyContainer>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

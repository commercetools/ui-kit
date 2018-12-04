import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'react-emotion';
// import { Headline } from '../../../src/components/typography/text';
import TextInput from '../../../src/components/inputs/text-input';
import tokens from '../../custom-properties.json';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

const Group = styled.div`
  padding: 10px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border: 1px solid black;
`;

const Table = styled.table`
  border: 1px solid #ccc;
  & tr td {
    border: 1px solid #ccc;
  }
`;

const prefixes = {
  colors: '--color-',
  backgroundColors: '--token-background-color-',
  fontColors: '--token-font-color-',
};

class Story extends React.Component {
  static displayName = 'Story';

  state = {
    searchText: '',
  };

  render() {
    const tokensWithPrefix = prefix =>
      Object.keys(tokens).filter(
        token =>
          token.startsWith(prefix) && token.includes(this.state.searchText)
      );

    // Categories
    //   Colors
    //   Background Color
    //   Text Color
    //   Border Color
    //   Font
    //   Font Size
    //   Opacity
    //   Line Height
    //   Spacing
    //   Radius
    //   Sizing
    //   Shadow
    //   Media Query
    //   Z-index

    return (
      <Background>
        <TextInput
          value={this.state.searchText}
          onChange={event => {
            this.setState({ searchText: event.target.value });
          }}
          horizontalConstraint="m"
        />
        <Group isVisible={tokensWithPrefix(prefixes.colors).length > 0}>
          <p>Colors</p>
          <Table>
            <tbody>
              <tr>
                <td>Token</td>
                <td>Example</td>
              </tr>
              {tokensWithPrefix(prefixes.colors).map(token => (
                <tr key={`fragment-${token}`}>
                  <td>{token}</td>
                  <td>
                    <ColorSample color={tokens[token]} /> {tokens[token]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Group>
        <Group
          isVisible={tokensWithPrefix(prefixes.backgroundColors).length > 0}
        >
          <p>Background Colors</p>
          <Table>
            <tbody>
              <tr>
                <td>Token</td>
                <td>Example</td>
              </tr>
              {tokensWithPrefix(prefixes.backgroundColors).map(token => (
                <tr key={`fragment-${token}`}>
                  <td>{token}</td>
                  <td>
                    <ColorSample color={tokens[token]} /> {tokens[token]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Group>
        <Group isVisible={tokensWithPrefix(prefixes.fontColors).length > 0}>
          <p>Font Colors</p>
          <Table>
            <tbody>
              <tr>
                <td>Token</td>
                <td>Example</td>
              </tr>
              {tokensWithPrefix(prefixes.fontColors).map(token => (
                <tr key={`fragment-${token}`}>
                  <td>{token}</td>
                  <td>
                    <ColorSample color={tokens[token]} /> {tokens[token]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Group>
      </Background>
    );
  }
}

storiesOf('Basics|Tokens', module).add('All Tokens', () => <Story />);

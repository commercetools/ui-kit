import { Component } from 'react';
import { injectIntl } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  array,
  boolean,
  text,
  select,
} from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import Stack from '../../../spacings/spacings-stack';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import Readme from '../README.md';
import MoneyInput from './money-input';

// This uses a dedicated story component to keep track of state instead of
// react-value. The reason is that MoneyInput can call twice onChange before
// the component rerenders, so we'd need to use two separate <Value />
// components to not lose data. So we use a dedicated component instead.
// That makes it easier to log the parsed value as well.
class MoneyInputStory extends Component {
  static displayName = 'MoneyInputStory';

  state = {
    amount: '',
    currencyCode: '',
  };

  componentDidUpdate(prevState) {
    if (
      prevState.amount !== this.state.amount ||
      prevState.currencyCode !== this.state.currencyCode
    ) {
      // eslint-disable-next-line no-console
      console.log(
        'parsed',
        MoneyInput.convertToMoneyValue(
          {
            amount: this.state.amount,
            currencyCode: this.state.currencyCode,
          },
          // eslint-disable-next-line react/prop-types
          this.props.intl.locale
        )
      );
    }
  }

  render() {
    const currencies = array('currencies', ['EUR', 'USD', 'AED', 'KWD', 'JPY']);
    const name = text('name', '') || 'default-name';
    const value = {
      amount: this.state.amount,
      currencyCode: this.state.currencyCode,
    };
    return (
      <>
        <Section>
          <Stack scale="m">
            <MoneyInput
              id={text('id', '')}
              name={name}
              value={value}
              currencies={boolean('dropdown', true) ? currencies : undefined}
              placeholder={text('placeholder', 'Placeholder')}
              onFocus={action('onFocus')}
              onBlur={action('onBlur')}
              isDisabled={boolean('isDisabled', false)}
              isReadOnly={boolean('isReadOnly', false)}
              isAutofocussed={boolean('isAutofocussed', false)}
              onChange={(event) => {
                action('onChange')(event);

                if (event.target.name.endsWith('.amount')) {
                  this.setState({ amount: event.target.value });
                }

                if (event.target.name.endsWith('.currencyCode')) {
                  this.setState({ currencyCode: event.target.value });
                }
              }}
              hasError={boolean('hasError', false)}
              hasWarning={boolean('hasWarning', false)}
              horizontalConstraint={select(
                'horizontalConstraint',
                Constraints.getAcceptedMaxPropValues(3),
                7
              )}
              hasHighPrecisionBadge={boolean('hasHighPrecisionBadge', false)}
              {...addMenuPortalProps()}
            />
            <NeighbouringStackingContext />
          </Stack>
        </Section>
        <Section>
          <p>
            <i>
              Check the console to see the result of{' '}
              <code>MoneyInput.convertToMoneyValue</code>.
            </i>
          </p>
        </Section>
      </>
    );
  }
}
const Story = injectIntl(MoneyInputStory);
storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('MoneyInput', () => <Story />);

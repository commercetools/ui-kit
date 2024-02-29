import { DateTimeField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-11-30T13:25:59.500Z';

export const routePath = '/date-time-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        description="When will the product be avialable?"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        placeholder="Select release date"
      />
    </Spec>
    <Spec label="with error when not touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="when read-only" propsToList={['isReadOnly']}>
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isReadOnly
      />
    </Spec>
    <Spec label="with warning when not touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <DateTimeField
        timeZone="UTC"
        title="Release Date"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
  </Suite>
);

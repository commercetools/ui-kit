import { Routes, Route } from 'react-router-dom';
import { AsyncSelectField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-select-field';

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with hint">
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hint="Select a state"
      />
    </Spec>
    <Spec label="when read-only">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="when has warning">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <AsyncSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="is condensed">
      <AsyncSelectField
        title="State"
        name="form-field-name"
        isCondensed={true}
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);

const InteractionRoute = () => (
  <Routes>
    <Route
      path="without-default-options/*"
      element={
        <Suite>
          <Spec omitPropsList label="with defaultOptions disabled">
            <AsyncSelectField
              title="State"
              name="form-field-name"
              value={value}
              onChange={() => {}}
              defaultOptions={false}
              loadOptions={loadOptions}
              horizontalConstraint={7}
            />
          </Spec>
        </Suite>
      }
    />
    <Route
      path="/*"
      element={
        <Suite>
          <Spec omitPropsList label="with defaultOptions enabled">
            <AsyncSelectField
              title="State"
              name="form-field-name"
              value={value}
              onChange={() => {}}
              defaultOptions={true}
              loadOptions={loadOptions}
              horizontalConstraint={7}
            />
          </Spec>
        </Suite>
      }
    />
  </Routes>
);

export const component = () => (
  <Routes>
    <Route path="interaction/*" element={<InteractionRoute />} />
    <Route path="/*" element={<DefaultRoute />} />
  </Routes>
);

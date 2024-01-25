import { Switch, Route } from 'react-router-dom';
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
  </Suite>
);

const InteractionRoute = () => (
  <Switch>
    <Route
      path={`${routePath}/interaction/without-default-options`}
      render={() => (
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
      )}
    />
    <Route
      path={`${routePath}/interaction`}
      render={() => (
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
      )}
    />
  </Switch>
);

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interaction`} component={InteractionRoute} />
    <Route exact path={routePath} component={DefaultRoute} />
  </Switch>
);

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AsyncCreatableSelectField } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const loadOptions = () =>
  Promise.resolve([
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]);

const value = { value: 'one', label: 'One' };

export const routePath = '/async-creatable-select-field';

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal">
      <AsyncCreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <AsyncCreatableSelectField
        title="State"
        name="form-field-name"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label='with "missing" error when not touched'>
      <AsyncCreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label='with "missing" error when touched'>
      <AsyncCreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with hint">
      <AsyncCreatableSelectField
        title="State"
        value={value}
        onChange={() => {}}
        loadOptions={loadOptions}
        horizontalConstraint="m"
        hint="Select a state"
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
          <Spec label="with defaultOptions disabled">
            <AsyncCreatableSelectField
              title="State"
              name="form-field-name"
              value={value}
              onChange={() => {}}
              loadOptions={loadOptions}
              horizontalConstraint="m"
            />
          </Spec>
        </Suite>
      )}
    />

    <Route
      path={`${routePath}/interaction`}
      render={() => (
        <Suite>
          <Spec label="with defaultOptions enabled">
            <AsyncCreatableSelectField
              title="State"
              name="form-field-name"
              value={value}
              onChange={() => {}}
              defaultOptions={true}
              loadOptions={loadOptions}
              horizontalConstraint="m"
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
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);

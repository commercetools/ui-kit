/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom';
import { SelectInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';
import { WorldIcon } from '../../../icons';

const defaultOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const longOptions = defaultOptions.concat([
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
  { value: 'seven', label: 'Seven' },
  { value: 'eight', label: 'Eight' },
]);

const options = defaultOptions;

const optionsWithGroups = [
  { label: 'animals', options: [{ value: 'cats', label: 'Cats' }] },
  { options: longOptions },
];

const value = 'one';

export const routePath = '/select-input';

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when condensed">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isCondensed={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with a long placeholder">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </Spec>
    <Spec label="with error">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with multiple values selected">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with multiple values selected and disabled">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        isDisabled={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with multiple values selected and condensed">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        isCondensed={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when read-only">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="with multiple values selected and read-only">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        isReadOnly={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label={'with iconLeft'}>
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label={'with iconLeft and no selected value'}>
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint={7}
        iconLeft={<WorldIcon />}
      />
    </Spec>
    <Spec label="Quiet appearance">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        appearance='quiet'
      />
    </Spec>
    <Spec label="Quiet disabled">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        appearance='quiet'
        isDisabled={true}
      />
    </Spec>
    <Spec label="Quiet read-only">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        appearance='quiet'
        isReadOnly={true}
      />
    </Spec>
    <Spec label="Quiet error">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        appearance='quiet'
        hasError={true}
      />
    </Spec>
    <Spec label="Quiet warning">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        appearance='quiet'
        hasWarning={true}
      />
    </Spec>
    <Spec label="Quiet with multiple values selected">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        horizontalConstraint={"auto"}
        appearance='quiet'
      />
    </Spec>
    <Spec label={'Quiet with iconLeft'}>
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint={"auto"}
        iconLeft={<WorldIcon />}
        appearance='quiet'
      />
    </Spec>
  </Suite>
);

const OpenRoute = () => (
  <Suite>
    <Spec label="option without option groups">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={longOptions}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);

const OpenRouteWithOptionGroups = () => (
  <Suite>
    <Spec label="option group with no divider">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);

const OpenRouteWithOptionGroupsAndDivider = () => (
  <Suite>
    <Spec label="option group with divider">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint={7}
        showOptionGroupDivider={true}
      />
    </Spec>
  </Suite>
);

export const component = () => (
  <Routes>
    <Route path="open" element={<OpenRoute />} />
    <Route
      path={`${routePath}/open-with-option-groups/*`}
      element={<OpenRouteWithOptionGroups />}
    />
    <Route
      path="open-with-option-groups-and-divider/*"
      element={<OpenRouteWithOptionGroupsAndDivider />}
    />
    <Route path="/*" element={<DefaultRoute />} />
  </Routes>
);

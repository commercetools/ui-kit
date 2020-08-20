import React from 'react';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import DataTableManager from './data-table-manager';

/* eslint-disable react/prop-types */
const TestTable = (props) => (
  <div>
    <ul>
      {props.columns.map((column) => (
        <li key={column.key}>{column.label}</li>
      ))}
    </ul>
  </div>
);
/* eslint-enable react/prop-types */

const TestComponent = (props) => (
  <DataTableManager {...props}>
    <TestTable />
  </DataTableManager>
);

const createTestProps = (custom = {}) => ({
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'country', label: 'Country' },
  ],
  displaySettings: {
    disableDisplaySettings: false,
  },
  columnManager: {
    disableColumnManager: false,
  },
  onSettingsChange: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  it('should not render the dropdown if no settings options are passed', async () => {
    const props = createTestProps({
      displaySettings: undefined,
      columnManager: undefined,
    });
    render(<TestComponent {...props} />);

    expect(screen.queryByText('Table layout settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Column Manager')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Open table manager dropdown')
    ).not.toBeInTheDocument();
  });
  it('should render the display settings panel when clicking on the dropdown option', async () => {
    const props = createTestProps();
    render(<TestComponent {...props} />);

    expect(screen.queryByText('Table layout settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Column Manager')).not.toBeInTheDocument();

    const selectDropdown = await screen.findByLabelText(
      'Open table manager dropdown'
    );

    fireEvent.focus(selectDropdown);
    fireEvent.change(selectDropdown, { target: { value: 'display' } });
    fireEvent.keyDown(selectDropdown, { key: 'Enter', keyCode: 13, which: 13 });

    await screen.findByText('Table layout settings');

    expect(
      screen.queryByLabelText('Select radio option: display full text')
    ).toBeChecked();
    expect(
      screen.queryByLabelText('Select radio option: density default')
    ).toBeChecked();
  });
  it('should render the column settings panel when clicking on the dropdown option', async () => {
    const props = createTestProps();
    render(<TestComponent {...props} />);

    expect(screen.queryByText('Table layout settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Column Manager')).not.toBeInTheDocument();

    const selectDropdown = await screen.findByLabelText(
      'Open table manager dropdown'
    );

    fireEvent.focus(selectDropdown);
    fireEvent.change(selectDropdown, { target: { value: 'column' } });
    fireEvent.keyDown(selectDropdown, { key: 'Enter', keyCode: 13, which: 13 });

    await screen.findByText('Column Manager');
  });
});

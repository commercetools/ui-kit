import { useState } from 'react';
import { screen, render, fireEvent, within } from '../../../../test/test-utils';
import DataTableManager from './data-table-manager';
import { UPDATE_ACTIONS } from './constants';

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

const TestComponent = (props) => {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isWrappingText, setIsWrappingText] = useState(false);
  const tableSettingsChangeHandler = {
    [UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
    [UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE]: setIsWrappingText,
  };
  return (
    <DataTableManager
      {...props}
      displaySettings={
        props.displaySettings
          ? {
              ...props.displaySettings,
              isCondensed,
              isWrappingText,
            }
          : undefined
      }
      onSettingsChange={(action, nextValue) => {
        tableSettingsChangeHandler[action](nextValue);
      }}
    >
      <TestTable />
    </DataTableManager>
  );
};
/* eslint-enable react/prop-types */

const defaultColumns = [
  { key: 'title', label: 'Title' },
  { key: 'country', label: 'Country' },
];
const createTestProps = (custom = {}) => ({
  columns: defaultColumns,
  displaySettings: {
    disableDisplaySettings: false,
  },
  columnManager: {
    disableColumnManager: false,
    hideableColumns: defaultColumns,
    visibleColumnKeys: defaultColumns.map(({ key }) => key),
  },
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
  it('should render the layout settings panel when clicking on the dropdown option and interact with the layout options', async () => {
    const props = createTestProps();
    render(<TestComponent {...props} />);

    expect(screen.queryByText('Table layout settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Column Manager')).not.toBeInTheDocument();

    const selectDropdown = await screen.findByLabelText(
      'Open table manager dropdown'
    );

    fireEvent.focus(selectDropdown);
    const layoutSettingsOption = await screen.findByLabelText(
      'Layout settings'
    );
    fireEvent.click(layoutSettingsOption);

    await screen.findByText('Table layout settings');

    const textPreviewsOption = screen.getByLabelText(
      'Select radio option: display full previews'
    );
    const fullTextsOption = screen.getByLabelText(
      'Select radio option: display full text'
    );
    const densityCompactOption = screen.getByLabelText(
      'Select radio option: density compact'
    );
    const densityDefaultOption = screen.getByLabelText(
      'Select radio option: density default'
    );

    expect(fullTextsOption).toBeChecked();
    expect(densityDefaultOption).toBeChecked();

    fireEvent.click(textPreviewsOption);
    expect(textPreviewsOption).toBeChecked();

    fireEvent.click(fullTextsOption);
    expect(fullTextsOption).toBeChecked();

    fireEvent.click(densityCompactOption);
    expect(densityCompactOption).toBeChecked();

    fireEvent.click(densityDefaultOption);
    expect(densityDefaultOption).toBeChecked();
  });
  it('should render the column settings panel when clicking on the dropdown option with no column options in either hidden or visible panels', async () => {
    const props = createTestProps();
    render(<TestComponent {...props} />);

    expect(screen.queryByText('Table layout settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Column Manager')).not.toBeInTheDocument();

    const selectDropdown = await screen.findByLabelText(
      'Open table manager dropdown'
    );

    fireEvent.focus(selectDropdown);
    const columnManagerOption = await screen.findByLabelText('Column manager');
    fireEvent.click(columnManagerOption);

    screen.getByLabelText('Hidden columns');
    expect(
      screen.getByText('There are no hidden columns to show.')
    ).toBeInTheDocument();
    const visibleColumnsContainer = screen.getByLabelText('Visible columns');
    expect(
      within(visibleColumnsContainer).getByText('Title')
    ).toBeInTheDocument();
    expect(
      within(visibleColumnsContainer).getByText('Country')
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { screen, render, fireEvent } from '../../../../../test/test-utils';
import DataTableSettings, {
  getDropdownOptions,
  getMappedColumns,
  getSelectedColumns,
} from './data-table-settings';
import { COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';

const formatMessage = jest.fn();

const createTestProps = (customProps) => ({
  onSettingsChange: jest.fn(),
  displaySettings: {
    disableDisplaySettings: false,
    isCondensed: false,
    isWrappingText: false,
  },
  columnManager: {
    disableColumnManager: false,
    visibleColumnKeys: [],
    hideableColumns: [],
    areHiddenColumnsSearchable: false,
  },
  ...customProps,
});

describe('DataTableSettings', () => {
  describe('settings dropdown', () => {
    describe('when display settings and column manager are disabled', () => {
      it('should not render the settings dropdown', () => {
        const props = createTestProps({
          displaySettings: { disableDisplaySettings: true },
          columnManager: { disableColumnManager: true },
        });

        const { container } = render(<DataTableSettings {...props} />);
        expect(
          container.querySelector("[name='table-settings-dropdown']")
        ).not.toBeInTheDocument();
      });
    });

    it('display settings enabled', () => {
      const options = getDropdownOptions({
        isColumnManagerEnabled: true,
        isDisplaySettingsEnabled: true,
        formatMessage,
      });

      expect(options).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: DISPLAY_SETTINGS,
          }),
        ])
      );
    });

    it('display settings disabled', () => {
      const options = getDropdownOptions({
        isColumnManagerEnabled: true,
        isDisplaySettingsEnabled: false,
        formatMessage,
      });

      expect(options).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: DISPLAY_SETTINGS,
          }),
        ])
      );
    });

    it('column manager enabled', () => {
      const options = getDropdownOptions({
        isColumnManagerEnabled: true,
        isDisplaySettingsEnabled: true,
        formatMessage,
      });

      expect(options).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: COLUMN_MANAGER,
          }),
        ])
      );
    });

    it('column manager disabled', () => {
      const options = getDropdownOptions({
        isColumnManagerEnabled: false,
        isDisplaySettingsEnabled: true,
        formatMessage,
      });

      expect(options).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: COLUMN_MANAGER,
          }),
        ])
      );
    });
  });

  it('table settings topBar component', () => {
    const topBarText = 'Top Bar';
    const topBar = <div>{topBarText}</div>;
    const props = createTestProps({ topBar });
    render(<DataTableSettings {...props} />);

    expect(screen.getByText(topBarText)).toBeInTheDocument();
  });

  describe('display settings panel', () => {
    it('should render display settings panel', () => {
      const props = createTestProps({
        columnManager: { disableColumnManager: true },
      });

      const { container } = render(<DataTableSettings {...props} />);
      const dropDown = container.querySelector(
        "[name='table-settings-dropdown']"
      );

      fireEvent.focus(dropDown);
      fireEvent.keyDown(dropDown, { key: 'ArrowDown' });
      fireEvent.keyUp(dropDown, { key: 'ArrowDown' });
      fireEvent.keyDown(dropDown, { key: 'Enter' });
      fireEvent.keyUp(dropDown, { key: 'Enter' });

      expect(screen.getByTestId(DISPLAY_SETTINGS)).toBeInTheDocument();
    });
  });

  describe('display column manager', () => {
    it('should render display column manager', () => {
      const props = createTestProps({
        displaySettings: { disableDisplaySettings: true },
      });

      const { container } = render(<DataTableSettings {...props} />);
      const dropDown = container.querySelector(
        "[name='table-settings-dropdown']"
      );

      fireEvent.focus(dropDown);
      fireEvent.keyDown(dropDown, { key: 'ArrowDown' });
      fireEvent.keyUp(dropDown, { key: 'ArrowDown' });
      fireEvent.keyDown(dropDown, { key: 'Enter' });
      fireEvent.keyUp(dropDown, { key: 'Enter' });

      expect(screen.getByTestId(COLUMN_MANAGER)).toBeInTheDocument();
    });
  });

  describe('getMappedColumns', () => {
    it('should map the columns', () => {
      expect(
        getMappedColumns([{ key: 'test-key', label: 'test label' }])
      ).toEqual({ 'test-key': { key: 'test-key', label: 'test label' } });
    });
  });

  describe('getSelectedColumns', () => {
    const mappedColumns = {
      'test-key1': { key: 'test-key1', label: 'test label 1' },
      'test-key2': { key: 'test-key2', label: 'test label 2' },
    };
    const visibleColumnsKeys = ['test-key1'];

    it('should return selected columns', () => {
      expect(getSelectedColumns(visibleColumnsKeys, mappedColumns)).toEqual([
        {
          key: 'test-key1',
          label: 'test label 1',
        },
      ]);
    });
  });
});

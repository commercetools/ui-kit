import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { screen, render } from '../../../../../test/test-utils';
import {
  ColumnSettingsManager,
  handleColumnsUpdate,
} from './column-settings-manager';
import { HIDDEN_COLUMNS_PANEL, SELECTED_COLUMNS_PANEL } from './constants';

const createTestProps = (props) => ({
  availableColumns: [],
  selectedColumns: [],
  onUpdateColumns: jest.fn(),
  onClose: jest.fn(),
  ...props,
});

describe('ColumnSettingsManager', () => {
  it('should render visible columns', () => {
    const props = createTestProps({
      selectedColumns: [
        {
          key: 'column1',
          label: 'Column 1',
        },
      ],
      availableColumns: [
        {
          key: 'column1',
          label: 'Column 1',
        },
      ],
    });

    render(<ColumnSettingsManager {...props} />);

    expect(screen.getByText(/Column 1/i)).toBeInTheDocument();
  });

  describe('when `areColumnSettingsEnabled` is true', () => {
    it('should render columns search input', () => {
      const props = createTestProps({
        selectedColumns: [
          {
            key: 'column1',
            label: 'Column 1',
          },
        ],
        availableColumns: [
          {
            key: 'column1',
            label: 'Column 1',
          },
        ],
        areHiddenColumnsSearchable: true,
        searchHiddenColumnsPlaceholder: 'search',
        searchHiddenColumns: jest.fn(),
      });

      render(<ColumnSettingsManager {...props} />);

      expect(screen.getByText(/search/)).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('primary button', () => {
      const primaryButtonLabel = 'Primary Test';
      const props = createTestProps({
        primaryButton: (
          <PrimaryButton label={primaryButtonLabel} onClick={jest.fn()} />
        ),
      });
      render(<ColumnSettingsManager {...props} />);
      expect(screen.getByText(primaryButtonLabel)).toBeInTheDocument();
    });

    it('secondary button', () => {
      const secondaryButtonLabel = 'Secondary Test';
      const props = createTestProps({
        secondaryButton: (
          <SecondaryButton label={secondaryButtonLabel} onClick={jest.fn()} />
        ),
      });
      render(<ColumnSettingsManager {...props} />);
      expect(screen.getByText(secondaryButtonLabel)).toBeInTheDocument();
    });
  });

  describe('handleColumnsUpdate', () => {
    describe('when destination and source is the hidden columns panel', () => {
      it('should not call `onUpdateColumns`', () => {
        const onUpdateColumns = jest.fn();
        const setIsDragging = jest.fn();
        const props = createTestProps({
          selectedColumns: [
            {
              key: 'column1',
              label: 'Column 1',
            },
          ],
          availableColumns: [
            {
              key: 'column1',
              label: 'Column 1',
            },
          ],
          onUpdateColumns,
        });

        const dragResult = {
          destination: { droppableId: HIDDEN_COLUMNS_PANEL },
          source: { droppableId: HIDDEN_COLUMNS_PANEL },
        };

        handleColumnsUpdate(
          dragResult,
          onUpdateColumns,
          props.selectedColumns,
          props.availableColumns,
          setIsDragging
        );

        expect(onUpdateColumns).not.toHaveBeenCalled();
      });
    });

    describe('when hidding columns', () => {
      it('should call `onUpdateColumns` with updated selected columns', () => {
        const onUpdateColumns = jest.fn();
        const setIsDragging = jest.fn();
        const props = createTestProps({
          selectedColumns: [
            {
              key: 'column1',
              label: 'Column 1',
            },
            {
              key: 'column2',
              label: 'Column 2',
            },
          ],
          availableColumns: [
            {
              key: 'column1',
              label: 'Column 1',
            },
            {
              key: 'column2',
              label: 'Column 2',
            },
          ],
          onUpdateColumns,
        });

        const dragResult = {
          destination: { droppableId: HIDDEN_COLUMNS_PANEL },
          source: { droppableId: SELECTED_COLUMNS_PANEL, index: 0 },
        };

        handleColumnsUpdate(
          dragResult,
          onUpdateColumns,
          props.selectedColumns,
          props.availableColumns,
          setIsDragging
        );

        expect(onUpdateColumns).toHaveBeenCalledWith([
          {
            key: 'column2',
            label: 'Column 2',
          },
        ]);
      });
    });
  });

  describe('when re-ordering the columns on the selected columns panel', () => {
    it('should call `onUpdateColumns` with updated order of columns', () => {
      const onUpdateColumns = jest.fn();
      const setIsDragging = jest.fn();
      const props = createTestProps({
        selectedColumns: [
          {
            key: 'column1',
            label: 'Column 1',
          },
          {
            key: 'column2',
            label: 'Column 2',
          },
        ],
        availableColumns: [
          {
            key: 'column1',
            label: 'Column 1',
          },
          {
            key: 'column2',
            label: 'Column 2',
          },
        ],
        onUpdateColumns,
      });

      const dragResult = {
        destination: { droppableId: SELECTED_COLUMNS_PANEL, index: 1 },
        source: { droppableId: SELECTED_COLUMNS_PANEL, index: 0 },
        draggableId: 'column1',
      };

      handleColumnsUpdate(
        dragResult,
        onUpdateColumns,
        props.selectedColumns,
        props.availableColumns,
        setIsDragging
      );

      expect(onUpdateColumns).toHaveBeenCalledWith([
        {
          key: 'column2',
          label: 'Column 2',
        },
        {
          key: 'column1',
          label: 'Column 1',
        },
      ]);
    });
  });
});

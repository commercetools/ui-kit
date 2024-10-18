import { render, screen } from '../../../../test/test-utils';
import Filters, { TFiltersProps } from './filters';
import SelectInput from '@commercetools-uikit/select-input';
import { designTokens } from '@commercetools-uikit/design-system';

const mockRenderSearchComponent = () => <SelectInput />;
const mockOnClearAllRequest = jest.fn();

const getDefaultProps = (custom?: Partial<TFiltersProps>): TFiltersProps => ({
  appliedFilters: [],
  filters: [],
  onClearAllRequest: mockOnClearAllRequest,
  renderSearchComponent: mockRenderSearchComponent,
  ...custom,
});

// filters list === add filter & clear all
describe('Filters', () => {
  // it('should display the filter list when `filters` button is toggled', async () => {
  //   await render(<Filters {...getDefaultProps()} />);
  //   const filtersButton = await screen.findByTestId('filters-button');

  //   fireEvent.click(filtersButton);

  //   //TODO: use roles and text instead of testid
  //   const addFilterButton = await screen.findByTestId('add-filter-button');
  //       //TODO: use roles and text instead of just text
  //   const clearAllFiltersButton = await screen.findByText(/clear all/i);

  //   expect(addFilterButton).toBeInTheDocument();
  //   expect(clearAllFiltersButton).toBeInTheDocument();
  // });

  // it('should hide the filter list when `filters` button is toggled twice', async () => {
  //   await render(<Filters {...getDefaultProps()} />);
  //   const filtersButton = await screen.findByTestId('filters-button');
  //   fireEvent.click(filtersButton);
  //   fireEvent.click(filtersButton);
  //   const addFilterButton = screen.queryByTestId('add-filter-button');
  //   const clearAllFiltersButton = screen.queryByText(/clear all/i);

  //   expect(addFilterButton).not.toBeVisible();
  //   expect(clearAllFiltersButton).not.toBeVisible();
  // });

  // it('should call onClearAllRequest when the `clear all` filters button is clicked', async () => {
  //   await render(<Filters {...getDefaultProps()} />);
  //   const filtersButton = await screen.findByTestId('filters-button');
  //   fireEvent.click(filtersButton);
  //   const clearAllFiltersButton = await screen.findByText(/clear all/i);
  //   fireEvent.click(clearAllFiltersButton);
  //   expect(mockOnClearAllRequest).toHaveBeenCalled();
  // });

  // it('should render a SelectInput component when the `add filter` button is clicked', async () => {
  //   await render(<Filters {...getDefaultProps()} />);
  //   const filtersButton = await screen.findByTestId('filters-button');
  //   fireEvent.click(filtersButton);

  //   const addFilterButton = await screen.findByTestId('add-filter-button');
  //   fireEvent.click(addFilterButton);

  //   const selectOption = await screen.findByText(/select/);
  //   expect(selectOption).toBeInTheDocument();
  // });

  it('renders the custom search component when passed as a prop', () => {
    render(
      <Filters
        {...getDefaultProps()}
        renderSearchComponent={() => (
          <div
            css={{
              maxWidth: `${designTokens.constraint13}`,
              border: `1px solid ${designTokens.colorNeutral90}`,
            }}
          >
            SearchPlaceholderSearchPlaceholder
          </div>
        )}
      />
    );

    expect(
      screen.getByText('SearchPlaceholderSearchPlaceholder')
    ).toBeInTheDocument();
  });
});

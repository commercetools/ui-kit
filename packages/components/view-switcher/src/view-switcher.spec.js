import { warning } from '@commercetools-uikit/utils';
import { screen, render } from '../../../../test/test-utils';
import Group from './view-switcher';
import Button from './view-switcher-button';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const createButtonTestProps = (index) => ({
  value: `test-button-${index}`,
  children: `test button ${index}`,
  isDisabled: false,
});

const createGroupTestProps = (numberOfChildren = 3, custom) => {
  const buttonChildren = [...Array(numberOfChildren).keys()].map((i) => (
    <Button key={i} {...createButtonTestProps(i)} />
  ));
  return {
    isCondensed: false,
    defaultSelected: 'test-button-1',
    children: buttonChildren,
    ...custom,
  };
};

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createGroupTestProps(3);
  });
  it('should render', () => {
    render(<Group {...props} />);
    const button1 = screen.getByLabelText('test button 1');
    expect(button1).toBeInTheDocument();
    expect(button1).toBeEnabled();

    const button2 = screen.getByLabelText('test button 2');
    expect(button2).toBeInTheDocument();
    expect(button2).toBeEnabled();
  });

  it('should render disabled button', () => {
    render(
      <Group {...props}>
        <Button value="test-button-1" isDisabled>
          test button 1
        </Button>
        <Button value="test-button-1">test button 2</Button>
      </Group>
    );
    const button = screen.getByLabelText('test button 1');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not call onChange when button is disabled', () => {
    const handleChange = jest.fn();
    render(
      <Group onChange={handleChange} {...props}>
        <Button value="disabled-button" isDisabled>
          disabled button
        </Button>
        <Button value="test-button">test button</Button>
      </Group>
    );

    screen.getByLabelText('disabled button').click();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should mark button as selected', () => {
    const handleChange = jest.fn();
    render(
      <Group
        onChange={handleChange}
        {...createGroupTestProps(3, { defaultSelected: 'test value 0' })}
      />
    );

    screen.getByLabelText('test button 1').click();
    expect(handleChange).toBeCalledWith('test-button-1');

    screen.getByLabelText('test button 2').click();
    expect(handleChange).toBeCalledWith('test-button-2');
  });

  it('should not call onChange when selected option is clicked', () => {
    const handleChange = jest.fn();
    render(
      <Group
        onChange={handleChange}
        {...createGroupTestProps(3, { defaultSelected: 'test-button-1' })}
      />
    );

    screen.getByLabelText('test button 1').click();
    expect(handleChange).not.toBeCalledWith('test-button-1');
  });

  it('should call onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <Group defaultSelected="test-button-2">
        <Button value="test-button-1" onClick={handleClick}>
          Test Button 1
        </Button>
        <Button value="test-button-2" onClick={handleClick}>
          Test Button 2
        </Button>
      </Group>
    );

    screen.getByLabelText('Test Button 1').click();
    expect(handleClick).toBeCalledWith('test-button-1');
  });

  it('should not call onClick when button is active', () => {
    const handleClick = jest.fn();
    render(
      <Group defaultSelected="test-button-1">
        <Button value="test-button-1" onClick={handleClick}>
          Test Button 1
        </Button>
      </Group>
    );

    screen.getByLabelText('Test Button 1').click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe('warnings', () => {
  let props;
  beforeEach(() => {
    props = createGroupTestProps(0);
  });
  it('should warn when there are no view switcher button in the group', () => {
    render(<Group {...props} />);
    expect(warning).toHaveBeenCalledWith(
      false,
      'ViewSwitcher.Group must contain at least one ViewSwitcher.Button'
    );
  });
});

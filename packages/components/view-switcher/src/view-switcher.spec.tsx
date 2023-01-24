import { useState } from 'react';
import { warning } from '@commercetools-uikit/utils';
import { screen, render } from '../../../../test/test-utils';
import Group, { type TViewSwitcherProps } from './view-switcher';
import Button from './view-switcher-button';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const createButtonTestProps = (index: number) => ({
  value: `test-button-${index}`,
  children: `test button ${index}`,
  isDisabled: false,
});

const createGroupTestProps = (
  numberOfChildren = 3,
  custom: Partial<TViewSwitcherProps> = {}
): TViewSwitcherProps => {
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
  let props: TViewSwitcherProps;
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

  it('should run only icon buttons', () => {
    render(
      <Group defaultSelected="test-button-1">
        <Button value="test-button-1" icon={<i>Icon</i>} />
      </Group>
    );
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
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

  it('should call onChange by the selected button', () => {
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

  it('should be controlled when selectedValue is passed', () => {
    const handleClick = jest.fn();
    function TestComponent(props: { defaultSelected: string }) {
      const [seletedValue, setSelectedValue] = useState(props.defaultSelected);

      return (
        <Group selectedValue={seletedValue} onChange={setSelectedValue}>
          <Button value="test-button-1" onClick={handleClick}>
            Test Button 1
          </Button>
          <Button value="test-button-2" onClick={handleClick}>
            Test Button 2
          </Button>
        </Group>
      );
    }
    render(<TestComponent defaultSelected="test-button-1" />);

    // test-button-1 is already active so onClick is not called.
    screen.getByLabelText('Test Button 1').click();
    expect(handleClick).not.toHaveBeenCalled();

    // test-button-2 is not active so onClick is called.
    screen.getByLabelText('Test Button 2').click();
    expect(handleClick).toHaveBeenCalled();

    // test-button-2 is now active so onClick is not called again.
    screen.getByLabelText('Test Button 2').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('warnings', () => {
  let props: TViewSwitcherProps;
  beforeEach(() => {
    props = createGroupTestProps(0);
  });
  it('should warn when there are no view switcher buttons in the group', () => {
    render(<Group {...props} />);
    expect(warning).toHaveBeenCalledWith(
      false,
      'ViewSwitcher.Group must contain at least one ViewSwitcher.Button'
    );
  });
  it('should warn when selectedValue is passed but no onChange', () => {
    render(
      <Group selectedValue="test-button-1">
        <Button value="test-button-1">Test Button 1</Button>
      </Group>
    );
    expect(warning).toHaveBeenCalledWith(
      false,
      'ViewSwitcher.Group must contain at least one ViewSwitcher.Button'
    );
  });
  it('should warn when both defaultSelected and selectedValue as passed', () => {
    render(
      <Group selectedValue="test-button-1" defaultSelected="test-button-1">
        <Button value="test-button-1">Test Button 1</Button>
      </Group>
    );
    expect(warning).toHaveBeenCalledWith(
      false,
      'ui-kit/ViewSwitcher: passed both "selectedValue" (uncontrolled component) prop and "defaultSelected" (uncontrolled component). Please pass only one as the component can only be either controlled or uncontrolled.'
    );
  });
  it('should warn when a button is used with no children and no icon', () => {
    render(
      <Group defaultSelected="test-button-1">
        <Button value="test-button-1" />
      </Group>
    );
    expect(warning).toHaveBeenCalledWith(
      true,
      'uikit/ViewSwitcherButton: You need to provide at least the children to render inside the button or an icon at least.'
    );
  });
  it('should warn when a button is used only with an icon and no label', () => {
    render(
      <Group defaultSelected="test-button-1">
        <Button value="test-button-1" icon={<i>Icon</i>} />
      </Group>
    );
    expect(warning).toHaveBeenCalledWith(
      true,
      'uikit/ViewSwitcherButton: You need to provide a label when rendering only an icon within the button.'
    );
  });
});

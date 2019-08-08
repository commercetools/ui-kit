import { renderHook, act } from '@testing-library/react-hooks';
import useToggleState from './use-toggle-state';

describe('useToggleState', () => {
  describe('when set without default state', () => {
    it('should be open by default', () => {
      const { result } = renderHook(() => useToggleState());
      expect(result.current[0]).toBe(true);
    });
    it('should be possible to toggle the open state', () => {
      const { result } = renderHook(() => useToggleState());
      const [, toggle] = result.current;
      act(() => {
        toggle();
      });
      expect(result.current[0]).toBe(false);
    });
  });
  describe('when set to default false', () => {
    it('should be closed by default', () => {
      const { result } = renderHook(() => useToggleState(false));
      const [isToggled] = result.current;
      expect(isToggled).toBe(false);
    });
  });
});
// it('should be open by default', () => {
//   const { getByTestId } = render(<TestComponent />);
//   expect(getByTestId('openState')).toHaveTextContent('open');
// });
//
// it('should be possible to toggle the open state', () => {
//   const { getByTestId } = render(<TestComponent />);
//   expect(getByTestId('openState')).toHaveTextContent('open');
//   getByTestId('toggle').click();
//   expect(getByTestId('openState')).toHaveTextContent('closed');
// });
//
// it('should be possible to set the state on and off', () => {
//   const { getByTestId } = render(<TestComponent />);
//   expect(getByTestId('openState')).toHaveTextContent('open');
//   getByTestId('setOff').click();
//   expect(getByTestId('openState')).toHaveTextContent('closed');
//   getByTestId('setOn').click();
//   expect(getByTestId('openState')).toHaveTextContent('open');
// });
//
// it('should respect the default closed state', () => {
//   const { getByTestId } = render(<TestComponent isDefaultOpen={false} />);
//   expect(getByTestId('openState')).toHaveTextContent('closed');
// });

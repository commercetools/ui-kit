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
  describe('when toggling with force', () => {
    it('should toggle to the forced state', () => {
      const { result } = renderHook(() => useToggleState(false));
      const [, toggle] = result.current;
      act(() => {
        toggle(true);
      });
      expect(result.current[0]).toBe(true);
      act(() => {
        toggle(false);
      });
      expect(result.current[0]).toBe(false);
    });
  });
});

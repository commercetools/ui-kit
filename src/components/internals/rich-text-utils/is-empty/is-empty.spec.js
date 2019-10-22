import isEmpty from './is-empty';

describe('isEmpty', () => {
  describe('when totally empty', () => {
    it('should return true', () => {
      expect(isEmpty('')).toBeTruthy();
    });
  });
  describe('when empty but has empty html tags', () => {
    it('should return true', () => {
      expect(isEmpty('<h1></h1><ul><li></li></ul>')).toBeTruthy();
    });
  });
  describe('when not empty', () => {
    it('should return false', () => {
      expect(isEmpty('<H1>Okay</h1>')).toBeFalsy();
    });
  });
});

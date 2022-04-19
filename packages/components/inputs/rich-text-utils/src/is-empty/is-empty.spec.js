import isEmpty from './is-empty';

describe('isEmpty', () => {
  describe('when totally empty', () => {
    it('should indicate that the value is empty', () => {
      expect(isEmpty('')).toBeTruthy();
    });
  });
  describe('when empty but has empty html tags', () => {
    it('should indicate that the value is empty', () => {
      expect(isEmpty('<h1></h1><ul><li></li></ul>')).toBeTruthy();
    });
  });
  describe('when empty but has empty html tags', () => {
    it('should indicate that the value is not empty', () => {
      expect(isEmpty('<ol><li><em>Not empty</em></li></ol>')).toBeFalsy();
    });
  });
  describe('when not empty', () => {
    it('should indicate that the value is not empty', () => {
      expect(isEmpty('<H1>Okay</h1>')).toBeFalsy();
    });
  });
});

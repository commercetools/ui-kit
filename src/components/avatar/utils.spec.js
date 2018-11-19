import { getInitialsFromName } from './utils';

describe('helper', () => {
  describe('generateInitialsFromName', () => {
    let subject;

    describe('with standard options', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: 'Caspar',
          lastName: 'Commercetools',
        });
      });

      it('should return "CC"', () => {
        expect(subject).toEqual('CC');
      });
    });

    describe('with empty strings', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: '',
          lastName: '',
        });
      });

      it('should return an empty string', () => {
        expect(subject).toEqual('');
      });
    });

    describe('with non string-inputs', () => {
      beforeEach(() => {
        subject = getInitialsFromName({
          firstName: 50,
          lastName: null,
        });
      });

      it('should return an empty string', () => {
        expect(subject).toEqual('');
      });
    });
  });
});

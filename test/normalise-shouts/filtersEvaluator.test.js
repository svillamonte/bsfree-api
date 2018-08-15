import { assert, expect } from 'chai';
import evalFilters from '~/normalise-shouts/filtersEvaluator';

const asyncFilterTrue = (shout) =>
  new Promise((resolve) => {
    resolve(true);
  });

const asyncFilterFalse = (shout) =>
  new Promise((resolve) => {
    resolve(false);
  });

const syncFilterTrue = (shout) => true;

const syncFilterFalse = (shout) => false;

describe('filtersEvaluator', () => {
  describe('#evalFilters()', () => {
    it('returns false for false async filter and no sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterFalse, asyncFilterTrue];
      const syncFilters = [];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns true for no false async filter and no sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterTrue];
      const syncFilters = [];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(true);
      });
    });

    it('returns false for no async filter and false sync filter', () => {
      const shout = {};
      const asyncFilters = [];
      const syncFilters = [syncFilterTrue, syncFilterFalse];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns true for no async filter and no false sync filter', () => {
      const shout = {};
      const asyncFilters = [];
      const syncFilters = [syncFilterTrue, syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(true);
      });
    });

    it('returns false for false async filter and true sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterFalse];
      const syncFilters = [syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns false for true async filter and false sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue];
      const syncFilters = [syncFilterFalse];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns true for true async filter and true sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue];
      const syncFilters = [syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(true);
      });
    });

    it('returns false for one false async filter and one false sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterFalse, asyncFilterTrue];
      const syncFilters = [syncFilterTrue, syncFilterFalse, syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns false for one false async filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterFalse, asyncFilterTrue];
      const syncFilters = [syncFilterTrue, syncFilterTrue, syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns false for one false sync filter', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterTrue, asyncFilterTrue];
      const syncFilters = [syncFilterTrue, syncFilterFalse, syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(false);
      });
    });

    it('returns true for all true filters', () => {
      const shout = {};
      const asyncFilters = [asyncFilterTrue, asyncFilterTrue, asyncFilterTrue];
      const syncFilters = [syncFilterTrue, syncFilterTrue, syncFilterTrue];

      return evalFilters(shout, asyncFilters, syncFilters).then((result) => {
        expect(result).to.equal(true);
      });
    });
  });
});

import Model from '../client/src/js/model.js';
import fetchMock from 'fetch-mock';
import chai from 'chai';
import sinon from 'sinon';
import spies from 'chai-spies';

const assert = chai.assert;
const expect = chai.expect;

chai.use(spies);

describe('Model', () => {

  describe('check onChange', () => {
    let model;

    beforeEach(() => {
      model = new Model('http://example.com');
    });
    afterEach(() => {
      model = null;
    });

    it('should return empty model initialy', () => {
      expect(model.model).to.deep.equal([]);
    });

    it('should return model that was set', () => {
      model.model = [1,2,3];
      expect(model.model).to.deep.equal([1,2,3]);
    });

    it('should check that model inits correctly', (done) => {
      fetchMock.mock('http://example.com', {
        body: [1,2,3,4]
      });
      model.init();
      model.onChange(() => {
        expect(model.model).to.deep.equal([1,2,3,4]);
        done();
      });
    });

    it('should call onChange event when model changes', () => {
      let spy = sinon.spy();
      model.onChange(spy);
      model.model = [1,2,3];
      assert(spy.calledWith([1,2,3]));
    });

    it('should call onChangeOnce once event when model changes', () => {
      let spy = sinon.spy();
      model.onChangeOnce(spy);
      model.onChangeOnce('spy');
      model.model = [1,2,3];
      model.model = [3,2,1];
      expect(spy.calledOnce).to.be.ok;
    });

    it('should not call onChange if callback argument is not a function', () => {
      const spy1 = sinon.spy();
      const spy2 = 'function';
      const spy3 = sinon.spy();
      model.onChange(spy1);
      model.onChange(spy2);
      model.onChange(spy3);
      model.model = [1,2,3];
      assert(spy1.calledWith([1,2,3]));
      assert(spy3.calledWith([1,2,3]));
    });

    it('should call two functions onChange event when model changes', () => {
      let spyOne = sinon.spy();
      let spyTwo = sinon.spy();
      model.onChange(spyOne);
      model.model = [1,2,3];
      assert(spyOne.calledWith([1,2,3]));
      model.onChange(spyTwo);
      model.model = [1];
      assert(spyOne.calledWith([1]));
      assert(spyTwo.calledWith([1]));
    });

  });
});

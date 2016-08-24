import Filter from '../client/src/js/filter.js';

const chai = require('chai');
const sinon = require('sinon');

/*jshint expr: true*/
const expect = chai.expect;
const assert = chai.assert;

describe('Filter', () => {
  describe('check Filter class', () => {
    let filter;

    afterEach(() => {
      filter = null;
    });

    describe('should check that filterd by ', () => {
      let spy;
      let clock;
      let spyOnce;
      let modelMock;
      let filterBy;

      beforeEach(() => {
        spy = sinon.spy(input => { input(modelMock.model); });
        spyOnce = sinon.spy(input => { input(modelMock.model); });
        modelMock = {
          onChange: spy,
          onChangeOnce: spyOnce,
          model: [
            { title: 'hello word', content: 'this is word content'},
            { title: 'this is some hell title', content: 'is some title'}
          ],
        };
        filterBy = ['title'];
        clock = sinon.useFakeTimers();
      });
      afterEach(() => {
        spy = null;
        spyOnce = null;
        modelMock = null;
        filterBy = null;
        clock.restore();
      });

      it('data prop \'title\' contains string and return 1 result',
        () => {
          const filterConfig = {
            model: modelMock,
            filterBy
          };
          filter = new Filter(filterConfig);
          expect(filter.filter('hello').length).to.be.equal(1);
        });

      it('that model not filters if input strings is the same as previous',
        () => {
          const value = 'title';
          const filterConfig = {
            model: modelMock,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          filter.initialModel.filter = sinon.spy();

          filter.filter(value);

          expect(filter.initialModel.filter.calledOnce).to.be.ok;
          expect(filter.value).to.be.equal('title');

          filter.filter(value);

          expect(filter.initialModel.filter.calledOnce).to.be.ok;
        });

      it('\'title\' and not ignore case contains string and return 2 results',
        () => {
          const value = 'HELL';
          const filterConfig = {
            model: modelMock,
            filterBy,
            caseSensetive: false
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(2);
        });

      it('\'title\' and not ignore case contains string and return 0 result',
        () => {
          const value = 'Hello';
          const filterConfig = {
            model: modelMock,
            filterBy,
            caseSensetive: true
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(0);
        });

      it('\'title\' contains string and return 2 results',
        () => {
          const value = 'hell';
          const filterConfig = {
            model: modelMock,
            filterBy
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(2);
        });

      it('\'title\' not contains search string and return 0 result',
        () => {
          const value = '123';
          const filterConfig = {
            model: modelMock,
            filterBy
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(0);
        });

      it('\'title\' and \'content\' contains string and return 2 result',
        () => {
          const value = 'this';
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(2);
        });

      it('\'title\' and \'content\' contains string and return 2 results',
        () => {
          const value = 'hell';
          const filterConfig = {
            model: modelMock,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(2);
        });

      it('\'title\' and \'content\' contains string and return 1 results',
        () => {
          const value = 'title';
          const filterConfig = {
            model: modelMock,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          
          
          expect(filter.filter(value).length).to.be.equal(1);
        });

      it('\'title\' and \'content\' not contains search string and return 0 result',
        () => {
          const filterConfig = {
            model: modelMock,
            filterBy: ['title', 'content']
          };
          const value = '123';
          filter = new Filter(filterConfig);
          expect(filter.filter(value).length).to.be.equal(0);
        });

      xit('should set timeout for key event',
        () => {
          let callbackSpy;
          const e = { srcElement: { value: 'title' } };
          const document = {
            getElementById: () => {
              return {
                addEventListener: (event, callback) => {
                  callbackSpy = callback;
                }
              };
            }
          };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          filter.filterEvent = sinon.spy();

          callbackSpy();
          clock.tick(150);
          expect(filter.filterEvent.calledOnce).to.be.ok;

          callbackSpy();
          clock.tick(50);
          expect(filter.filterEvent.calledTwice).to.not.be.ok;
          callbackSpy();
          clock.tick(100);
          expect(filter.filterEvent.calledTwice).to.not.be.ok;

          clock.tick(50);
          expect(filter.filterEvent.calledTwice).to.be.ok;
        });

    });
  });
});

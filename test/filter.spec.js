import Filter from '../client/src/js/filter.js';

const assert = require('chai').assert;
const sinon = require('sinon');

describe('Filter', () => {
  describe('check Filter class', () => {
    let filter;
    const document = {
      getElementById: () => {
        return {
          addEventListener: () => {}
        };
      }
    };

    afterEach(() => {
      filter = null;
    });

    describe('should check that filterd by ', () => {
      let spy;
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
      });
      afterEach(() => {
        spy = null;
        modelMock = null;
        filterBy = null;
      });

      it('\'title\' contains string and return 1 result',
        () => {
          const e = { srcElement: { value: 'hello' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: filterBy
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 1, 'model length is');
        });

      it('\'title\' and not ignore case contains string and return 2 results',
        () => {
          const e = { srcElement: { value: 'HELL' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: filterBy,
            caseSensetive: true
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 0, 'model length is');
        });

      it('\'title\' and not ignore case contains string and return 0 result',
        () => {
          const e = { srcElement: { value: 'Hello' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: filterBy,
            caseSensetive: true
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 0, 'model length is');
        });

      it('\'title\' contains string and return 2 results',
        () => {
          const e = { srcElement: { value: 'hell' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: filterBy
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 2, 'model length is');
        });

      it('\'title\' not contains search string and return 0 result',
        () => {
          const e = { srcElement: { value: '123' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: filterBy
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 0, 'model length is');
        });

      it('\'title\' and \'content\' contains string and return 2 result',
        () => {
          const e = { srcElement: { value: 'this' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 2, 'model length is');
        });

      it('\'title\' and \'content\' contains string and return 2 results',
        () => {
          const e = { srcElement: { value: 'hell' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 2, 'model length is');
        });

      it('\'title\' and \'content\' contains string and return 1 results',
        () => {
          const e = { srcElement: { value: 'title' } };
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: ['title', 'content']
          };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 1, 'model length is');
        });

      it('\'title\' and \'content\' not contains search string and return 0 result',
        () => {
          const filterConfig = {
            id: 'mockFilter',
            model: modelMock,
            document: document,
            filterBy: ['title', 'content']
          };
          const e = { srcElement: { value: '123' } };
          filter = new Filter(filterConfig);
          filter.filter(e);
          assert(modelMock.model.length === 0, 'model length is');
      });

      it('should set timeout for key event',
        () => {
          const e = { srcElement: { value: 'title' } };
          const document = {
            getElementById: () => {
              return {
                addEventListener: (event, callback) => {
                  callback(e);
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
          const element = document.getElementById();
          element.addEventListener('key', (e, cb) => {
            console.log(e, cb);
          });
          element.addEventListener('key', (e, cb) => {
            console.log(e, cb);
          });
          //filter.filter(e);
          //assert(modelMock.model.length === 1, 'model length is');
      });

    });
  });
});

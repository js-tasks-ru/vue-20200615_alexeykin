const { getSolutionPath } = require('taskbook-test-utils');
const { LINK } = require(getSolutionPath('index'));

describe('5-module-1-task', () => {
  test('Файл index.js должен содержать ссылку на репозиторий с проектом', () => {
    expect(LINK).toBeTruthy();
  });
});

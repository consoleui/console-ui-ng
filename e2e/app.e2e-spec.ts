import { ConsoleUiNgPage } from './app.po';

describe('console-ui-ng App', () => {
  let page: ConsoleUiNgPage;

  beforeEach(() => {
    page = new ConsoleUiNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

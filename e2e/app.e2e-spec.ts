import { MergeAppPage } from './app.po';

describe('merge-app App', () => {
  let page: MergeAppPage;

  beforeEach(() => {
    page = new MergeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

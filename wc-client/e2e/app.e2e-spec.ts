import { WcClientPage } from './app.po';

describe('wc-client App', function() {
  let page: WcClientPage;

  beforeEach(() => {
    page = new WcClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

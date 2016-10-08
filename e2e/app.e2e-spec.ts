import { HappyShopperPage } from './app.po';

describe('happy-shopper App', function() {
  let page: HappyShopperPage;

  beforeEach(() => {
    page = new HappyShopperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hs works!');
  });
});

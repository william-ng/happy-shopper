import { browser, element, by } from 'protractor';

export class HappyShopperPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hs-root h1')).getText();
  }
}

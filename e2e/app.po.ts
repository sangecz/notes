import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(route: string) {
    return browser.get(route);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  setLanguage(lang: 'cs' | 'en') {
    element(by.cssContainingText('option', lang)).click();
  }

  clickBtnWithText(text: string) {
    element(by.buttonText(text)).click();
  }
}

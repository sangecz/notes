import { AppPage } from './app.po';

describe('Notes App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should auto redirect to /notes', () => {
    page.navigateTo('/');
    expect(page.getUrl()).toContain('/notes');
  });

  it('should auto redirect to /notes when unknown route entered', () => {
    page.navigateTo('/jksdbfksjbfljs');
    expect(page.getUrl()).toContain('/notes');
  });

  it('should display title in default language (EN)', () => {
    page.navigateTo('/');
    expect(page.getTitleText()).toEqual('Notes');
  });

  it('should display title in CS', () => {
    page.navigateTo('/');
    page.setLanguage('cs');
    expect(page.getTitleText()).toEqual('Poznámky');
  });

  it('should display title in EN', () => {
    page.navigateTo('/');
    page.setLanguage('en');
    expect(page.getTitleText()).toEqual('Notes');
  });

  it('should go to new note', () => {
    page.navigateTo('/');
    page.clickBtnWithText('Add new Note');
    expect(page.getUrl()).toContain('/new');
    expect(page.getTitleText()).toEqual('Note detail');
  });
});

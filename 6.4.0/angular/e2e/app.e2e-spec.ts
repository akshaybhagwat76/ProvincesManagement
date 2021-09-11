import { ProvincesManagementTemplatePage } from './app.po';

describe('ProvincesManagement App', function() {
  let page: ProvincesManagementTemplatePage;

  beforeEach(() => {
    page = new ProvincesManagementTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

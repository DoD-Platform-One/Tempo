beforeEach(function () {
  cy.getCookies().then((cookies) => {
    const namesOfCookies = cookies.map((cm) => cm.name);
    cy.session(namesOfCookies, () => {});
  });
});

describe('Tempo Test', function () {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  // Basic test that validates pages are accessible, basic error check
  it('Check Tempo is accessible w/ services', function () {
    cy.visit(Cypress.env('url'), { failOnStatusCode: false });
    if (Cypress.env('keycloak_test_enable')) {
      cy.performKeycloakLogin(Cypress.env('tnr_username'), Cypress.env('tnr_password'))
    }
    cy.title().should('contain', 'Jaeger UI');
    // Check to ensure more than zero services are populated
    cy.intercept('GET', '**/api/services').as('servicesLoaded')
    cy.reload()
    cy.wait('@servicesLoaded').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    });
  });

  if (Cypress.env('check_datasource')) {
    it('Check Tempo is available as a data source in grafana ', function () {
      cy.visit(Cypress.env('grafana_url'));
      cy.performGrafanaLogin('admin', 'prom-operator')
      // Visit the datasources page
      cy.visit(`${Cypress.env('grafana_url')}/connections/datasources`);

      // Set constant for output options to save/test data source
      const saveOutputOptions = ['Data source is working', 'Data source successfully connected', 'Successfully connected to']
      const saveOutput = new RegExp(`${saveOutputOptions.join('|')}`, 'g')

      // Enter 'tempo' in the search field and
      cy.get('input[placeholder="Search by name or type"]').type('tempo');
      // Click on the tempo datasource
      cy.get('a').contains('Tempo').click();
      // Click on the 'Save & test` button
      cy.get('button[type="submit"]').click();
      // Check to ensure the data source is working
      cy.get('[data-testid="data-testid Alert success"]').contains(saveOutput, { timeout: 10000 });
    });

    after(function () {
      cy.clearCookies();
    });
  }
});

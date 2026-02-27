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

  it('Check Tempo is available as a data source in grafana ', function () {
    cy.env(['check_datasource', 'grafana_url']).then(({ check_datasource, grafana_url }) => {
      if (!check_datasource) {
        this.skip();
      }

      cy.visit(grafana_url);
      cy.performGrafanaLogin('admin', 'prom-operator')
      // Visit the datasources page
      cy.visit(`${grafana_url}/connections/datasources`);

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
  });

  after(function () {
    cy.clearCookies();
  });
});

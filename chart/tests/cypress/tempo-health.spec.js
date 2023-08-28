beforeEach(function () {
  cy.getCookies().then(cookies => {
    const namesOfCookies = cookies.map(cm => cm.name)
    Cypress.Cookies.preserveOnce(...namesOfCookies)
  })
})

describe('Tempo Test', function() {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  // Basic test that validates pages are accessible, basic error check
  it('Check Tempo is accessible w/ services', function() {
    cy.visit(Cypress.env('url'), {failOnStatusCode: false})
    if (Cypress.env('keycloak_test_enable')) {
      cy.get('input[id="username"]')
        .type(Cypress.env('tnr_username'))
        .should('have.value', Cypress.env('tnr_username'));

      cy.get('input[id="password"]')
        .type(Cypress.env('tnr_password'))
        .should('have.value', Cypress.env('tnr_password'));
            
      cy.get('form').submit(); 

      cy.get('input[id="kc-accept"]').click();

      cy.get('input[id="kc-login"]').click();
    }
    cy.title().should('contain', 'Jaeger UI')
    // Check to ensure more than zero services are populated
    cy.get(':nth-child(1) > .ant-form-item-label > label > :nth-child(1) > .SearchForm--labelCount').should(item => {
      const str = item[0].outerText;
      const num = str.replace(/[\])}[{(]/g, '');

      expect(parseInt(num)).to.be.greaterThan(0);
    })
  })

  if (Cypress.env("check_datasource")) {

      it('Check Tempo is available as a data source in grafana ', function() {
          cy.visit(Cypress.env('grafana_url'))
          cy.get('input[name="user"]')
            .type('admin')
          cy.get('input[name="password"]')
            .type('prom-operator')
          cy.contains("Log in").click()
          cy.get('.page-dashboard').contains('Welcome', {timeout: 30000})
          // Visit the datasources page
          cy.visit(`${Cypress.env('grafana_url')}/connections/datasources`)
          
          // // Enter 'tempo' in the search field and 
          cy.get('input[placeholder="Search by name or type"]')
          .type('tempo')
          // Click on the tempo datasource
          cy.get('a').contains('Tempo').click()
          // Click on the 'Save & test` button
          cy.get('button[type="submit"]').click()
          // Check to ensure the data source is working
          cy.get('.p-t-2').contains('Data source is working', {timeout: 10000})
        })

        after(function () {
          cy.clearCookies()
        })
  }
})

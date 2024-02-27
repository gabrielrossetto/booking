/// <reference types="cypress" />
describe('Home Container E2E', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
  });

  it('should display date pickers and search button', () => {
    cy.contains('label', 'Check-in').should('exist');
    cy.contains('label', 'Check-out').should('exist');
    cy.get('[data-testid="round-search-button"]').should('exist');
  });

  it('should display rooms after searching', () => {
    cy.contains('label', 'Check-in').click({ force: true }).type('03/01/2024');
    cy.get('.gap-8').should('exist').click();
    cy.contains('label', 'Check-out').click({ force: true }).type('03/01/2024');
    cy.get('.MuiCard-root').should('exist');
  });

  it('should display error message if rooms loading fails', () => {
    cy.intercept('/rooms', { statusCode: 500 });
    cy.get('.MuiTypography-root').should('contain.text', 'Error loading data');
  });
});

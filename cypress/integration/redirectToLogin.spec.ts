describe('Pages redirections', function () {
  it('should redirect to login page when logged out and visiting /', function () {
    cy.visit("/");
    cy.url().should("equal", "http://localhost:3000/login")
  });
  it('should redirect to login pahe when logged out and visiting the teacher dashboard', () => {
    cy.visit("/teacher/contracts")
    cy.url().should("equal", "http://localhost:3000/login")
  })
  it('should redirect to login pahe when logged out and visiting the student dashboard', () => {
    cy.visit("/student")
    cy.url().should("equal", "http://localhost:3000/login")
  })
});

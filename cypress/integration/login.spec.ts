describe('Authentication', function () {
  it('should display "unknown user" when the username is unknown', function () {
    cy.visit("/login")
    cy.get("#username").type("unknown username")
    cy.get("form").submit()
    cy.contains("Utilisateur inconnu")
  });
  it('should warn the user when their password is incorrect', function () {
    cy.visit("/login")
    cy.get("#username").type("pixselve")
    cy.get("#password").type("wrong password")
    cy.get("form").submit()
    cy.contains("Mot de passe incorrect")
  });
  it('should redirect a teacher to the teacher dashboard after sign in', function () {
    cy.visit("/login")
    cy.get("#username").type("pixselve")
    cy.get("#password").type("password")
    cy.get("form").submit()
    cy.url().should("equal", "http://localhost:3000/teacher/contracts")
  });
});

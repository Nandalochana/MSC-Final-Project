describe('Login Test', () => {
  it('should successfully log in with valid credentials', () => {
    cy.visit('/sign-in');  

    cy.get('input[name="email"]').type('admin1@gmail.com');  
    cy.get('input[name="password"]').type('123456');  

    cy.get('button[type="submit"]').click();  

 
    cy.url().should('include', ''); 
  });
});

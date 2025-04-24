describe("Sign Up Test", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("should complete the multi-step sign-up process successfully", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe@gmail.com");
    cy.get('input[name="telephoneNr"]').type("1234567890");
    cy.get('input[name="mobileNr"]').type("0987654321");

    const imagePath = "images/avatar.svg";
    cy.get('input[type="file"]').attachFile(imagePath);

    cy.contains("Next").click();

    cy.get('input[name="address1"]').should("be.visible");

    cy.get('input[name="address1"]').type("123 Main St");
    cy.get('input[name="address2"]').type("Apt 4B");
    cy.get('input[name="address3"]').type("New York");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    cy.contains("Next").click();

    cy.contains("Freelancer").click();

    cy.contains("Sign Up").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Welcome, John").should("be.visible");
  });

  it("should display validation errors for missing fields in Step 1", () => {
    cy.contains("Next").click();

    cy.contains("First Name is required").should("be.visible");
    cy.contains("Last Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Telephone Number is required").should("be.visible");
    cy.contains("Mobile Number is required").should("be.visible");
    cy.contains("Profile Image is required").should("be.visible");
  });

  it("should display validation errors for missing fields in Step 2", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe@gmail.com");
    cy.get('input[name="telephoneNr"]').type("1234567890");
    cy.get('input[name="mobileNr"]').type("0987654321");
    const imagePath = "images/avatar.svg";
    cy.get('input[type="file"]').attachFile(imagePath);
    cy.contains("Next").click();

    cy.contains("Next").click();

    cy.contains("Address is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("Confirm Password is required").should("be.visible");
  });

  it("should display validation error for missing role in Step 3", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="email"]').type("johndoe@gmail.com");
    cy.get('input[name="telephoneNr"]').type("1234567890");
    cy.get('input[name="mobileNr"]').type("0987654321");
    const imagePath = "images/avatar.svg";
    cy.get('input[type="file"]').attachFile(imagePath);
    cy.contains("Next").click();

    cy.get('input[name="address1"]').type("123 Main St");
    cy.get('input[name="address2"]').type("Apt 4B");
    cy.get('input[name="address3"]').type("New York");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");
    cy.contains("Next").click();

    cy.contains("Sign Up").click();

    cy.contains("Role is required").should("be.visible");
  });
});

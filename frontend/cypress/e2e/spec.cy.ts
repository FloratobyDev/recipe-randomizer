describe("recipe application testing", () => {
  it("renders the default screen", () => {
    cy.visit("http://localhost:9000/");
    cy.contains("Chef Rand");
  });

  it("adds a new item", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("sugar");
    cy.contains("Add").click();
    cy.contains("sugar");
  });

  it("shows no recipe found", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("nothingness");
    cy.contains("Add").click();
    cy.contains("Randomize").click();
    cy.wait(1000);
    cy.contains("No recipe found");
  });

  it("shows recipe", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("chicken");
    cy.contains("Add").click();
    cy.contains("Randomize").click();
    cy.wait(1000);
    cy.contains("Ingredients");
  });

  it("saves recipe", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("chicken");
    cy.contains("Add").click();
    cy.contains("Randomize").click();
    cy.wait(1000);

    cy.get('[data-testid="recipe-name"]')
      .find("h2")
      .then((el) => {
        const recipeName = el.text();
        cy.get('[data-testid="save-button"]').click();
        cy.get('[data-testid="saved-recipes"]').find("div").click();
        cy.contains(recipeName).should("exist"); // Use 'should' to assert that the element with text exists
      });
  });

  it("deletes recipe", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("chicken");
    cy.contains("Add").click();
    cy.contains("Randomize").click();
    cy.wait(1000);

    cy.get('[data-testid="recipe-name"]')
      .find("h2")
      .then((el) => {
        const recipeName = el.text();
        cy.get('[data-testid="save-button"]').click();
        cy.get('[data-testid="saved-recipes"]').find("div").click();
        cy.contains(recipeName).should("not.exist"); // Use 'should' to assert that the element with text does not exist
      });
  });

  it("shows saved recipe after refresh", () => {
    cy.visit("http://localhost:9000/");
    cy.get('[data-testid="add-item"]').type("chicken");
    cy.contains("Add").click();
    cy.intercept("GET", "http://localhost:9000/randomize", {
      fixture: "randomRecipe.json",
    });

    cy.get('[data-testid="recipe-name"]')
      .find("h2")
      .then((el) => {
        const recipeName = el.text();
        cy.get('[data-testid="save-button"]').click();
        cy.reload();
        cy.get('[data-testid="saved-recipes"]').find("div").click();
        cy.contains(recipeName).should("exist"); // Use 'should' to assert that the element with text exists
      });
  });
});

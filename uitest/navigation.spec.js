context('navigation', () => {
    beforeEach(() => { 
        cy.visit("http://localhost:8000");
    })

    const views = ["Home", "Login", "Object", "Configuration"];
    views.forEach(view => {
        it (`nav by hash -> ${view}`, () => {
            cy.get(`[href="#${view}"]`).click();
            cy.get(`[href="#${view}"]`).should("have.class", "active-link");
        });
    });
});
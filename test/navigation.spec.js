context('navigation', () => {

    const views = ["Home", "Login", "Object"];
    views.forEach(view => {
        it (`nav by hash -> ${view}`, () => {
            cy.visit(`#${view}`);
            cy.get(`[href="#${view}"]`)
            .should("have.class", "active-link");
        });
    });
});
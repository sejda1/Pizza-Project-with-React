describe ("app works", () => {
    it("passes", () => {
        cy.visit("http://localhost:5173");
    });
});

describe ("forma gidiyor", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });
});


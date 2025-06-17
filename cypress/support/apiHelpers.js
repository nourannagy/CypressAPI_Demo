Cypress.Commands.add('loginViaAPI', (username, password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: { username, password },
    }).then((response) => {
        expect(response.status).to.eq(200);
        window.localStorage.setItem('token', response.body.token);
    });
});
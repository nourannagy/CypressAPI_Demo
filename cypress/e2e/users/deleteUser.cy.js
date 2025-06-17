let accessToken = '55b4cb3beafc11042ff8d1c8d334e6583bd8df4e97d16c3807d57bf3e0d4ed8e'
const dataJson = require('../../fixtures/userData.json')


it('Verify that api can delete the user created successfully', () => {
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            'authorization': 'Bearer ' + accessToken
        },
        body: {
            'name': dataJson.name,
            'gender': dataJson.gender,
            'email': dataJson.email,
            'status': dataJson.status
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).has.property('email', dataJson.email)
        expect(response.body).has.property('name', dataJson.name)
    }).then((response) => {
        const userId = response.body.id
        cy.request({
            method: 'DELETE',
            url: 'https://gorest.co.in/public/v2/users/' + userId,
            headers: {
                'authorization': 'Bearer ' + accessToken
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        })

    })
})
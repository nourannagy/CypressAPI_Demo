
let accessToken = '55b4cb3beafc11042ff8d1c8d334e6583bd8df4e97d16c3807d57bf3e0d4ed8e'

it('Verify that api get all users', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            'authorization': 'Bearer' + accessToken
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        //const names = response.body.map(userData => userData.name);
        //expect(names).to.include('Trilok Pothuvaal');
    })
})
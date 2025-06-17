
const dataJson = require('../../fixtures/userData.json')

let accessToken = '55b4cb3beafc11042ff8d1c8d334e6583bd8df4e97d16c3807d57bf3e0d4ed8e'

let randomText = ''
let testEmail = ''

it('Verify that api can create user successfully', () => {
    var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    for (var i = 0; i < 10; i++)
        randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
    testEmail = randomText + '@gmail.com'

    // cy.fixture('userData').then((payload)=>{
    // })

    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            'authorization': 'Bearer ' + accessToken
        },
        body: {
            'name': dataJson.name,
            'gender': dataJson.gender,
            'email': testEmail,
            'status': dataJson.status
        }
    }).then((response) => {
        //cy.log(JSON.stringify(response))
        expect(response.status).is.eq(201)
        expect(response.body).has.property('email', testEmail)
        expect(response.body).has.property('name', dataJson.name)
    }).then((response) => {
        const userId = response.body.id
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/' + userId,
            headers: {
                'authorization': 'Bearer ' + accessToken
            },
        }).then((response) => {
            expect(response.status).is.eq(200)
            expect(response.body).has.property('email', testEmail)
            expect(response.body).has.property('name', dataJson.name)
            expect(response.body).has.property('id', userId)
        })
    })
})
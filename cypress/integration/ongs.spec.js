/// <reference types="cypress" />

describe('Ongs', () => {
    it('deve poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy=name]').type('Teste Ongs')
        cy.get('[data-cy=email]').type('test@mail.com')
        cy.get('[data-cy=whatsapp]').type('199999999')
        cy.get('[data-cy=city]').type('São Paulo')
        cy.get('[data-cy=uf]').type('SP')
        
        
        //criar uma rota com cy.route() e atribuir a rota a um alias
        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click()

        //esperar com cy.wait e fazer uma validação
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
 
    });

    it('deve poder realizar login no sistema', () => {
    
    const createOngId = Cypress.env('createdOngId');
    
    cy.log(createOngId);

    cy.visit('http://localhost:3000/');
    cy.get('input').type(createOngId)
    cy.get('.button').click();

    });

});


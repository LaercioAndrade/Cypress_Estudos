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
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    });

    it('deve poder fazer logout', () => {
        cy.login();
        cy.get('button').click();
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();
        cy.get('.button').click();
        cy.get('[placeholder="Título do caso"]').type('Animal abandonado');
        cy.get('textarea').type('Animal precisa de apoio ara aonde morar');
        cy.get('[placeholder="Valor em reais"]').type(200);

        // POST 200 / incidents
        cy.route('POST', '**/incidents').as('newIncident');
        cy.get('.button').click();
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();
        
        // DELETE 204 Request URL: http://localhost:3333/incidents/38
        cy.route('DELETE', '**/incidents/*' ).as('deleteIncident')

        cy.get('li > button > svg').click();

        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    })

});

///dc8c60fd
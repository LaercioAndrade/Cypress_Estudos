const el = require('./elements').ELEMENTS;

class Register {
    acessarCadastro(){
        cy.visit('http://localhost:3000/register')
    }

    preencherCadastro(){
        cy.get(el.name).type('Teste Ongs')
        cy.get(el.email).type('test@mail.com')
        cy.get(el.whatsapp).type('199999999')
        cy.get(el.city).type('São Paulo')
        cy.get(el.uf).type('SP')
        
        
        //criar uma rota com cy.route() e atribuir a rota a um alias
        cy.route('POST', '**/ongs').as('postOng');

        cy.get(el.submit).click()
    }

    validarCadastroDeOngComSucesso(){
        cy.wait('@postOng').then((xhr) => {
        expect(xhr.status).be.eq(200);
        expect(xhr.response.body).has.property('id');
        expect(xhr.response.body.id).is.not.null;
    })

   }
}

export default new Register();
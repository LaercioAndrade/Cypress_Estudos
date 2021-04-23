const el = require('./elements').ELEMENTS;

class NewIncident {
    preencherCadastroDeCaso(){
        cy.get(el.title).type('Teste');
        cy.get(el.description).type('Animal precisa de apoio ara aonde morar');
        cy.get(el.value).type(200);

        // POST 200 / incidents
        cy.route('POST', '**/incidents').as('newIncident');
        cy.get(el.buttonSave).click();
    }

    validarCadastroDeCaso(){
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }

}

export default new NewIncident();
const el = require('./elements').ELEMENTS;

class Profile {
    clicarNoBotaoLogout(){
        cy.get(el.buttonLogout).click();
    }

    clicarNoBotatoCadastrarNovosCasos(){
        cy.get(el.buttonNewIncident).click();
    }

    clicarBotaoExcluirUmCaso(){
        cy.route('DELETE', '**/incidents/*' ).as('deleteIncident')
        cy.get(el.buttonDelete).click();
    }

    validarExclusaoDeCasoComSucesso(){
        cy.wait('@deleteIncident').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    }
}

export default new Profile();
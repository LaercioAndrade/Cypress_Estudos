/// <reference types="cypress" />

import Logon from '../support/pages/Logon';
import Register from '../support/pages/Register';
import Profile from '../support/pages/Profile';
import NewIncident from '../support/pages/NewIncident';


describe('Ongs', () => {
    it('deve poder realizar um cadastro', () => {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroDeOngComSucesso();
 
    });

    it('deve poder realizar login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    it('deve poder fazer logout', () => {
        cy.login();
        Profile.clicarNoBotaoLogout();       
    });

    it('devem poder cadastrar novos casos', () => {
        cy.login();
        Profile.clicarNoBotatoCadastrarNovosCasos();
        NewIncident.preencherCadastroDeCaso();
        NewIncident.validarCadastroDeCaso();
    });

    it('devem poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();
        
        // DELETE 204 Request URL: http://localhost:3333/incidents/38
        Profile.clicarBotaoExcluirUmCaso();
        Profile.validarExclusaoDeCasoComSucesso();

       
    })

});

///dc8c60fd
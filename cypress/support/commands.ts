/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/* global Cypress */

import { Colors } from '../styles/colors'

import { Functions } from './functions'
import 'cypress-real-events/support'

const functions = new Functions()

Cypress.Commands.add('storyBook', () => {
  cy.get('iframe').then((iframe) => {
    const body = iframe.contents().find('body').find('#storybook-root')

    return body
  })
})

Cypress.Commands.add('testCssStyles', { prevSubject: true }, (subject, filePath) => {
  cy.readFile(filePath).then((styles) => {
    // Split style declarations into an array of individual styles
    const styleArray = styles.split('\n').filter((style) => style.trim() !== '')

    // Test CSS properties for each element in the subject
    cy.wrap(subject).each(($el) => {
      styleArray.forEach((style) => {
        const [property, value] = style.split(':').map((s) => s.trim())
        const trimmedValue = value.endsWith(';') ? value.slice(0, -1) : value

        if (property.charAt(0) !== '/' && property.charAt(0) !== '>') { // skip commented rows
          if (trimmedValue.charAt(0) === '#' && !Colors.myList.includes(trimmedValue)) { // check if colour is listed
            // fail test
            throw new Error('Colour is not listed.')
          }
          if (trimmedValue.charAt(0) === '#') { // check if color matches
            const rgbCoror = functions.hexToRgb(trimmedValue)

            cy.wrap($el).should('have.css', property).and('match', new RegExp(`^${rgbCoror}.*$`, 'i'))
          } else {
            cy.wrap($el).should('have.css', property).and('match', new RegExp(`^${trimmedValue}.*$`, 'i'))
          }
        }
      })
    })
  })
})

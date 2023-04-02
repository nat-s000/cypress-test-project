import * as dayjs from 'dayjs'
describe('One Way Search fields test', () => {
    beforeEach(() => {
	  cy.wait(60000) // needed to prevent 429 Too Many Requests error
      cy.visit('https://flights.tmobiletravel.com/')
    })
	
	it('Displays expected fields by default with default placeholder text, User can fill out form and search', () => {
	cy.get('[data-component="flight-search-type-oneWay"]').contains('One-way')
    cy.get('[data-selenium="flight-origin-search-input"]').invoke('attr', 'placeholder').should('contain','Flying from')
	cy.get('[data-selenium="flight-destination-search-input"]').invoke('attr', 'placeholder').should('contain','Flying to')
	cy.get('[data-selenium="date-selector-title"]').contains('Departure')
	cy.get('[data-selenium="icon-box-child"]').contains('1 Passenger, Economy')
	cy.get('[data-selenium="searchButton"]').contains('SEARCH FLIGHTS')
    cy.get('[data-selenium="flight-origin-search-input"]')
		.type('MCO')
	cy.contains('Orlando (FL)').click() 
	cy.get('[data-selenium="flight-destination-search-input"]')
		.type('NYC')
	cy.contains('New York (NY)').click()
	const targetDate = dayjs().format('YYYY-MM-DD') // today's date
	cy.get(`[data-selenium-date="${targetDate}"]`).click()
	cy.get('[data-selenium="arrow-down-icon"]').click()
	cy.get('[data-selenium="searchButton"]').click()
	cy.location('pathname').should('eq', '/flights/results')
	const returnDate = dayjs().add(1, 'day').format('YYYY-MM-DD') // tomorrow's date
	cy.location('search').should('eq', `?cid=-1&departureFrom=ORL&departureFromType=0&arrivalTo=NYC&arrivalToType=0&departDate=${targetDate}&returnDate=${returnDate}&searchType=1&cabinType=Economy&adults=1&sort=1`)
  })  
  
  	it('Displays an error when a user selects the search button without making field selections', () => {
	cy.get('[data-selenium="searchButton"]').click()
	cy.get('[data-component="flight-error-modal"]').contains('Please enter the origin, destination and your travel date to proceed.')
	cy.get('[data-selenium="modal-close-btn-icon"').click()
  })
  
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
})
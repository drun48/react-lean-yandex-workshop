import './commands'

declare global {
    namespace Cypress {
        interface Chainable {
            dropElement(queryElement:string, queryContainer:string):Chainable<void>,
            auth(visitNext?:string):Chainable<void>,
            createOrder():Chainable<void>
        }
    }
}
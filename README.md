### Domain Driven Development

Domain - предметная область

### Architecture

Entity: (class)
Repository: ( entity -> db, db -> entity )
Service: (not DB, only BL)
Controller: (handle user input, validation, delegate to service) -> Response
Events: ( onSomething -> doSomething )

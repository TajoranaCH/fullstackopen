sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: save note and send status response 201
    deactivate server

    Note right of browser: The browser refresh its notes view and show all notes accordingly.


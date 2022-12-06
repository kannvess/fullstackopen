```mermaid
sequenceDiagram
    participant b as browser
    participant s as server
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    s-->>b: HTTP 200 HTML
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    s-->>b: HTTP 200 main.css
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    s-->>b: HTTP 200 main.js
    b->>s: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    s-->>b: HTTP 200 data.json
    b->>s: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note over s: Server processed the new note then redirects the browser to the same URL, therefore making the same 4 requests seen above
    s-->>b: HTTP 302 https://studies.cs.helsinki.fi/exampleapp/notes
```
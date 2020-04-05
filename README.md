# Check Room

Project made under the Innovative Projects program.

## Running

To run locally using Docker, use:

```bash
docker build . -t cr
docker run -it -p 8000:8000 cr
```

For development, run simultaneously:

```bash
cd backend && npm run dev
cd frontend && npm run start
```

Our backend expects these environment variables to be present:

```text
GOOGLE_API_CREDENTIALS={"installed":{"client_id":"...","project_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"...","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
GOOGLE_API_TOKEN={"access_token":"...","refresh_token":"...","scope":"https://www.googleapis.com/auth/calendar","token_type":"Bearer","expiry_date":...}
ENVIRONMENT=development
```

You can generate the credentials in the Google Developer Console, and get the token by running `node backend/app/google-auth-cli.js` wizard. `ENVIRONMENT` should be either `development` or `production`.

Our project supports `.env` files - you can place the variables into `backend/.env` file.

## Development

We use VS Code with [ESLint extension] and additional settings:

```text
"eslint.format.enable": true,
"[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
```

ESLint settings are picked up only when the config is in the root folder,
so we run editors for frontend and backend separately.

[ESLint extension]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

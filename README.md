# Check Room

Site that lets you quickly check room availability and make reservations.

Features:

- integration with Google Calendar,
- logging in with Google accounts,
- searching and filtering rooms,
- adding events, with room suggestions shown automatically,
- generating QR codes,
- admin panel for user and room management.

Project made under the Innovative Projects program.

Live at [checkroom.herokuapp.com](https://checkroom.herokuapp.com).

## Running

To run locally using Docker, use:

```bash
docker build . -t cr
docker run -it -p 8000:8000 cr
```

For development, run simultaneously:

```bash
cd backend && npm run start
cd frontend && npm run start
```

Our backend expects these environment variables to be present:

```text
GOOGLE_API_CREDENTIALS={"installed":{"client_id":"...","project_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"...","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
GOOGLE_API_TOKEN={"access_token":"...","refresh_token":"...","scope":"https://www.googleapis.com/auth/calendar","token_type":"Bearer","expiry_date":...}
MONGO_URL=mongodb+srv://...:...@.../...?retryWrites=true&w=majority
GOOGLE_CLIENT_SECRET=abcdefghijklmnopqrstu_wx
ENVIRONMENT=development
```

You can generate the API credentials in the Google Developer Console, and get the API token by running `npm run get-google-token` wizard in `backend`. `ENVIRONMENT` should be either `development` or `production`. Client secret is for logging in with Google functionality. If you set it, you will also need to change the ID in `frontend/src/assets/configs/constants.js`.

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

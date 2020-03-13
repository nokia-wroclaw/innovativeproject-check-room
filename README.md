# Check Room

Project made under the Innovative Projects program.

## Running

To run locally using Docker, use:

```bash
docker build -t cr .
docker run -it -p 8000:80 cr
```

For development, run simultaneously:

```bash
cd backend && npm run dev
cd frontend && npm run start
```

 we use VS Code with [ESLint extension] and additional settings:

```text
"eslint.format.enable": true,
"[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
```

ESLint settings are picked up only when the config is in the root folder,
so we run editors for frontend and backend separately.

[ESLint extension]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

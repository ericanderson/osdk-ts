# expected-template-react

This project demonstrates using the OSDK package `@fake/sdk` with React on top of Vite. Check out the [Vite](https://vitejs.dev/guide/) docs for further configuration.

## Developing

Run the following command or equivalent with your preferred package manager to start a local development server on `http://localhost:8080`:

```sh
npm run dev
```

Development configuration is stored in `.env.development`.

In order to make API requests to Foundry, CORS must be configured for the stack to allow `http://localhost:8080` to load resources. The configured OAuth client must also allow `http://localhost:8080/auth/callback` as a redirect URL.

## Deploying

Run the following command or equivalent with your preferred package manager to create a production build of your application:

```sh
npm run build
```

Production configuration is stored in `.env.production`.

If you did not fill in the URL your production application will be hosted on you will need to fill in the `VITE_FOUNDRY_REDIRECT_URL` in `.env.production`.

In order to make API requests to Foundry, CORS must be configured for the stack to allow the production origin to load resources. The configured OAuth client must also allow the production origin auth callback as a redirect URL.
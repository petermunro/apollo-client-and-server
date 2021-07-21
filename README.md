# GraphQL and Apollo Demo App

There are two subdirectories within this repo: `server` and `client`,
each a separate project. However they share a single git repo.

## To start the server

To start the server, first change into the `server/` folder and do:

```bash
npm install
```

then:

```bash
npm start
```

The GraphQL server listens on port 5000, but does not host any data
itself. For that it makes HTTP calls to a `json-server` running on port 5050.

## To start the client

To start the client, first change into the `client/` folder and do:

```bash
npm install
```

then:

```bash
npm start
```

This is an app built with `create-react-app` and with the
Apollo GraphQL client added to retrieve data from the server.

## Access the Application

To view the web site, open a web browser, and navigate to: <http://localhost:5000>

To view the GraphQL Playground, open a web browser, and navigate to: <http://localhost:5000/graphql>

To view the REST API, open a web browser, and navigate to: <http://localhost:5050>

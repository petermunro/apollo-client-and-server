import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

let link;

const httpLink = new HttpLink({
  credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
  uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
});

if (process.browser) {
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:5000/graphql",
    options: {
      reconnect: true,
    },
  });

  link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );
} else {
  link = httpLink;
}

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});

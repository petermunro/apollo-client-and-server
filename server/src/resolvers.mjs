import { PubSub } from 'graphql-subscriptions';

import fetch from 'node-fetch';

const pubSub = new PubSub();

export const resolvers = {
  Query: {
    message() {
      return 'Welcome to React and Apollo!';
    },
  },
};

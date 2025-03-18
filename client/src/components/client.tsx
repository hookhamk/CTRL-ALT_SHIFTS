import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const Client = () => {
  // Create the HTTP link
  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql', // Make sure this matches your server port
  });

  // Auth link for JWT
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Create the Apollo client
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default Client;
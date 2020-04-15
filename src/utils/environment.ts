/**
 * environment.ts
 * Defines environment variables for each "release channel" for the React Native app.
 * This enables us to configure values specific to running the app in development, staging, or production environments.
 */

import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: false,
    message: 'Hello, dev!'
  },
  staging: {
    apiUrl: 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, staging!'
  },
  prod: {
    apiUrl: 'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, prod!'
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } if (env === 'staging') {
    return ENV.staging;
  } if (env === 'prod') {
    return ENV.prod;
  }

  return ENV.dev;
};

export default getEnvVars;

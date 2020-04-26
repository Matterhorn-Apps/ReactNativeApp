/**
 * environment.ts
 * Defines environment variables for each "release channel" for the React Native app.
 * This enables us to configure values specific to running the app in development, staging, or production environments.
 */

import Constants from 'expo-constants';

export interface Environment {
  apiUrl: string;
  auth0ClientId: string;
  auth0Domain: string;
  enableAuth: boolean;
  message: string;
}

const ENV: { [key: string]: Environment } = {
  local: {
    apiUrl: 'http://b0aacb15.ngrok.io',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, local!'
  },
  dev: {
    apiUrl:
      'http://matterhornapiservice-env-dev.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, dev!'
  },
  staging: {
    apiUrl:
      'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, staging!'
  },
  prod: {
    apiUrl:
      'http://matterhornapiservice-env.eba-qjezc5kq.us-east-1.elasticbeanstalk.com',
    auth0ClientId: '0ngrMLtiiqOeY7ADbMSOq71tYb50LiUc',
    auth0Domain: 'https://matterhorn-prototype.auth0.com',
    enableAuth: true,
    message: 'Hello, prod!'
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel): Environment => {
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === 'dev') {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'prod') {
    return ENV.prod;
  }

  return ENV.dev;
};

export default getEnvVars;

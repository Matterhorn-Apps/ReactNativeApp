/* eslint-disable @typescript-eslint/camelcase */
import { AuthSession } from 'expo';

import getEnvVars from '../environment';

import { AuthSessionResult } from '../../type-definitions/AuthSession';

const { auth0ClientId, auth0Domain, enableAuth } = getEnvVars();

interface UserProfile {
  sub: string;
  name: string;
  nickname: string;
  picture: string;
}

export interface User {
  AccessToken: string;
  Id: string;
  Name: string;
  Nickname: string;
  Picture: string;
}

export default class Auth {
  public static async SignInAsync(): Promise<User> {
    if (!enableAuth) {
      // Use fake data when auth is disabled in dev/local environment
      return {
        AccessToken: 'FAKE_TOKEN',
        Id: 'FAKE_ID',
        Name: 'Tzahi Rodrig',
        Nickname: 'Big Tzahi',
        Picture: 'https://ca.slack-edge.com/TE3BF32ET-UEUM18UMD-35e6ebabedad-72'
      };
    }

    const accessToken = await this.AuthenticateAsync();
    const userProfileObject = await this.GetUserProfileAsync(accessToken);

    return {
      AccessToken: accessToken,
      Id: userProfileObject.sub,
      Name: userProfileObject.name,
      Nickname: userProfileObject.nickname,
      Picture: userProfileObject.picture
    };
  }

  /**
   * Authenticates with Auth0 and returns an access token
   */
  private static async AuthenticateAsync(): Promise<string> {
    const redirectUrl = AuthSession.getRedirectUrl();

    const authQueryParams: { [s: string]: string } = {
      response_type: 'token',
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      prompt: 'login',
      scope: 'openid profile',
      audience: 'matterhorn-api'
    };
    const authQueryParamString = Object.entries<string>(authQueryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    const authUrl = `${auth0Domain}/authorize?${authQueryParamString}`;
    const result: AuthSessionResult = await AuthSession.startAsync({ authUrl });
    return result.type === 'success' ? result.params.access_token : null;
  }

  private static async GetUserProfileAsync(accessToken: string): Promise<UserProfile> {
    const userProfileUrl = `${auth0Domain}/userinfo?access_token=${accessToken}`;
    const response = await fetch(userProfileUrl);
    return response.json();
  }
}

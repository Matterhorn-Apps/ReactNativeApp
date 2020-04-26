import React from 'react';
import { View } from 'react-native';
import {
  Card, CardItem, Body, Text, Thumbnail, Left
} from 'native-base';
import { User } from '../utils/auth/auth';

export interface UserScreenProps {
  user: User;
}

export default function UserScreen(props: UserScreenProps): JSX.Element {
  const { user } = props;

  if (!user) {
    return (
      <View>
        <Text>Not signed in.</Text>
      </View>
    );
  }

  return (
    <View>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: user.Picture }} />
            <Body>
              <Text>{user.Name}</Text>
              <Text note>{user.Nickname}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              {`Id: ${user.Id}`}
            </Text>
            <Text>
              {`Name: ${user.Name}`}
            </Text>
            <Text>
              {`Nickname: ${user.Nickname}`}
            </Text>
            <Text>
              {`Access Token: ${user.AccessToken}`}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
}

import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  Card, CardItem, Body, Text, Spinner, Button
} from 'native-base';
import { useQuery } from '@apollo/react-hooks';
import { User } from '../utils/auth/auth';
import { ME_QUERY } from '../utils/queries';

export interface UserScreenProps {
  user: User;
}

export default function UserScreen(props: UserScreenProps): JSX.Element {
  const { user } = props;

  const { data, loading, refetch } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (completedData: any) => {
      console.log(completedData);
    }
  });

  const onButtonPress = useCallback(() => {
    refetch();
  }, [refetch]);

  if (!user) {
    return (
      <View>
        <Text>Not signed in.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>Data failed to load.</Text>
        <Button onPress={onButtonPress}><Text>Try again</Text></Button>
      </View>
    );
  }

  return (
    <View>
      <Card>
        <CardItem>
          <Body>
            <Text>
              {`Id: ${data.me.id}`}
            </Text>
            <Text>
              {`Display Name: ${data.me.displayName}`}
            </Text>
            <Text>
              {`Height: ${data.me.height}`}
            </Text>
            <Text>
              {`Weight: ${data.me.weight}`}
            </Text>
            <Text>
              {`Sex: ${data.me.sex}`}
            </Text>
            <Text>
              {`Calorie Goal: ${data.me.calorieGoal}`}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
}

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PocButton from '../components/PocButton';
import { QueryCounterArgs, Counter } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function CounterScreen() {
  const GET_COUNTER = gql`
  query counter {
      counter(id: 1) {
        id
        value
      }
    }
  `;

  const INCREMENT_COUNTER = gql`
    mutation incrementCounter($id: ID!) {      
        incrementCounter(id: $id) {
          id
          value
        }      
    }
  `;

  const { loading, data } = useQuery<Counter, QueryCounterArgs>(GET_COUNTER);
  const [incrementCounter] = useMutation(INCREMENT_COUNTER,
    {
      update(cache, { data: { counterUpdate } }) {
        cache.writeQuery({
          query: GET_COUNTER,
          data: { counter: counterUpdate }
        });
      }
    });

  return (
    <View style={styles.container}>
      <Text>
        Counter:
        {' '}
        { data && data.value }
      </Text>
      <PocButton title="+1" onPress={() => { incrementCounter({ variables: { id: 1 } }); }} />
    </View>
  );
}

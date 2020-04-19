import {
  StyleSheet, View, Text, TextInput, ScrollView
} from 'react-native';
import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import PocButton from '../components/PocButton';
import PocPrompt from '../components/PocPrompt';

import getEnvVars from '../utils/environment';
import {
  QueryUserArgs, User, GetExercisesQueryVariables, GetExercisesQuery, AddExerciseMutation, AddExerciseMutationVariables, NewExerciseRecord
} from '../types';

import { GET_EXERCISE_DATA, ADD_EXERCISE_DATA } from '../queries/exercise';

const { message } = getEnvVars();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});


export default function MainScreen() {
  const userId = 1;
  const [exerciseLabel, setExerciseLabel] = useState('');
  const [exerciseCalories, setExerciseCalories] = useState('0');


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setUTCHours(0);
  tomorrow.setUTCMinutes(0);
  tomorrow.setUTCSeconds(0);
  tomorrow.setUTCMilliseconds(0);

  // Get the ISO string and massage it into the format expected by the server (remove T separator between date and
  // time, and remove fractional milliseconds and the timezone indicator)
  const tomorrowString = tomorrow.toISOString().replace('T', ' ').slice(0, -5);

  const { loading, data: exerciseList } = useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GET_EXERCISE_DATA, { variables: { endTime: tomorrowString, startTime: '0000-00-00 00:00:00' } });

  const [addExercise] = useMutation<AddExerciseMutation, AddExerciseMutationVariables>(ADD_EXERCISE_DATA, {
    variables: { input: { userId: '1', label: exerciseLabel, calories: parseInt(exerciseCalories, 10) } },
    update(cache, { data: newExerciseRecord }) {
      const { user } = cache.readQuery<GetExercisesQuery, GetExercisesQueryVariables>({ query: GET_EXERCISE_DATA, variables: { endTime: tomorrowString, startTime: '0000-00-00 00:00:00' } });
      user.exerciseRecords.push(newExerciseRecord.createExerciseRecord);
      cache.writeQuery<GetExercisesQuery, GetExercisesQueryVariables>({
        query: GET_EXERCISE_DATA,
        variables: { endTime: tomorrowString, startTime: '0000-00-00 00:00:00' },
        data: { user }
      });
    }
  });

  const submitExercise = () => {
    const caloriesInt = parseInt(exerciseCalories, 10);
    if (exerciseLabel !== '' && caloriesInt > 0) {
      addExercise();
    }

    setExerciseCalories('0');
    setExerciseLabel('');
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>{tomorrowString}</Text>
      <PocPrompt />

      <ScrollView>
        {exerciseList && exerciseList.user.exerciseRecords.map((exercise) => (
          <View key={exercise.timestamp}>
            <Text>{exercise.label}</Text>
            <Text>{exercise.calories}</Text>
            <Text>{exercise.timestamp}</Text>
          </View>
        ))}

        <View>
          <TextInput style={styles.input} onChangeText={(text) => setExerciseLabel(text)} value={exerciseLabel} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setExerciseCalories(text)}
            value={exerciseCalories}
          />
          <PocButton title="Submit new exercise" onPress={() => submitExercise()} />
        </View>
      </ScrollView>
    </View>
  );
}

import {
  StyleSheet, View, Text, TextInput, ScrollView
} from 'react-native';
import React, { useState } from 'react';
import {
  ExerciseRecord, usePostExerciseRecord, useGetExerciseRecords
} from '../api-client/api-client';
import PocButton from '../components/PocButton';
import PocPrompt from '../components/PocPrompt';

import getEnvVars from '../utils/environment';

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
  const [exerciseLabel, exerciseLabelUpdate] = useState('My exercise');
  const [exerciseCalories, exerciseCaloriesUpdate] = useState('100');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // const { data: exercises, refetch: refetchExercises } = useGetExerciseRecords({ userId, queryParams: { endDateTime: tomorrow.toISOString(), startDateTime: '0000-00-00 00:00:00' } });
  // const { mutate: postExercise } = usePostExerciseRecord({ userId });

  const submitExercise = async () => {
    const timestamp = new Date();

    const exercise: ExerciseRecord = {
      calories: parseInt(exerciseCalories, 10),
      label: exerciseLabel,
      timestamp: timestamp.toISOString()
    };

    await postExercise(exercise);
    exerciseLabelUpdate('My exercise');
    exerciseCaloriesUpdate('100');
    refetchExercises();
  };


  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <PocPrompt />

      <ScrollView>
        {/* {exercises && exercises.map((exercise) => (
          <View key={exercise.timestamp}>
            <Text>{exercise.label}</Text>
            <Text>{exercise.calories}</Text>
            <Text>{exercise.timestamp}</Text>
          </View>
        ))}

        <View>
          <TextInput style={styles.input} onChangeText={(text) => exerciseLabelUpdate(text)} value={exerciseLabel} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => exerciseCaloriesUpdate(text)}
            value={exerciseCalories}
          />
          <PocButton title="Submit new exercise" onPress={() => submitExercise()} />
        </View> */}
      </ScrollView>
    </View>
  );
}

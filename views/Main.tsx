import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { ExerciseRecord, usePostExerciseRecord, useGetCounter, useGetExerciseRecords } from "../api-client/api-client";
import PocButton from '../components/PocButton';

interface MainProps{
    message: string;
}

export default function Main(props: MainProps) {
    const userId = 1;
    const [exerciseLabel, exerciseLabelUpdate] = useState('My exercise');
    const [exerciseCalories, exerciseCaloriesUpdate] = useState('100');
    const submitExercise = async () => {
      const timestamp = new Date();

      const exercise: ExerciseRecord = 
      {
        calories: parseInt(exerciseCalories),
        label: exerciseLabel,
        timestamp: timestamp.toISOString()
      };
  
      await postExercise(exercise);
      exerciseLabelUpdate('My exercise');
      exerciseCaloriesUpdate('100');
      refetchExercises();
    }
  
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    const { data: counter, refetch: refetchCounter } = useGetCounter({});
    const { data: exercises, refetch: refetchExercises } = useGetExerciseRecords({ userId, queryParams: {endDateTime: tomorrow.toISOString(), startDateTime: "0000-00-00 00:00:00"} });
    const { mutate: postExercise } = usePostExerciseRecord({ userId });

    return (
        <View style={styles.container}>
        <Text>{props.message}</Text>
        <Text>Counter: {counter && counter.Value }</Text>
        <PocButton title='Click Me' onPress={() => refetchCounter()} />

        <ScrollView>
          {exercises && exercises.map(exercise => (
            <View key={exercise.timestamp}>
              <Text>{exercise.label}</Text>
              <Text>{exercise.calories}</Text>
              <Text>{exercise.timestamp}</Text>
            </View>
          ))}
          
            <View>
              <TextInput style={styles.input} onChangeText={text => exerciseLabelUpdate(text)} value={exerciseLabel}></TextInput>   
              <TextInput style={styles.input} onChangeText={text => exerciseCaloriesUpdate(text)} value={exerciseCalories}></TextInput>
              <PocButton title='Submit new exercise' onPress={() => submitExercise()}></PocButton>          
            </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1
    }
  });
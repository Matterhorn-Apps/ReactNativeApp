// TODO: Fix eslint problems or delete file
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, TouchableWithoutFeedback, Button, StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

// TODO: Impliment api request
const apiGetRequest = async (): Promise<number> => 1500;

// TODO: Impliment api request
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
const apiPutRequest = async (calorieGoal: number): Promise<void> => { };

export default function PocPrompt(): JSX.Element {
  // State
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState<number>(undefined);

  // Local Functions
  const toggleDisplayPrompt = (): void => {
    setDisplayPrompt(!displayPrompt);
  };

  const getGoal = async (): Promise<void> => {
    const goal = await apiGetRequest();
    setCalorieGoal(goal);
  };

  const changeGoal = async (): Promise<void> => {
    await apiPutRequest(calorieGoal);
    setDisplayPrompt(false);
  };

  // Fetch the initial calorie goal on load
  useEffect(() => {
    getGoal();
  }, []);

  // Render
  if (displayPrompt) {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={toggleDisplayPrompt}>
          <TextInput
            placeholder="Input new calorie goal"
            onChangeText={(text: string): void => setCalorieGoal(Number(text))}
            onSubmitEditing={(): Promise<void> => changeGoal()}
            keyboardType="numeric"
          />
        </TouchableWithoutFeedback>
        <Button onPress={changeGoal} title="Done" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleDisplayPrompt}>
        <Text>
          Calorie Goal:
          {calorieGoal || ''}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

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
const apiGetRequest = async () => 1500;

// TODO: Impliment api request
// eslint-disable-next-line no-unused-vars
const apiPutRequest = async (calorieGoal: number) => { };

export default function PocPrompt() {
  // State
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState<number>(undefined);

  // Local Functions
  const toggleDisplayPrompt = () => {
    setDisplayPrompt(!displayPrompt);
  };

  const getGoal = async () => {
    const goal = await apiGetRequest();
    setCalorieGoal(goal);
  };

  const changeGoal = async () => {
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
          <TextInput placeholder="Input new calorie goal" onChangeText={(text) => setCalorieGoal(Number(text))} onSubmitEditing={() => changeGoal()} keyboardType="numeric" />
        </TouchableWithoutFeedback>
        <Button onPress={() => changeGoal()} title="Done" />
      </View>
    );
  }
  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleDisplayPrompt}>
        <Text>
          {' '}
          Calorie Goal:
          {calorieGoal || ''}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

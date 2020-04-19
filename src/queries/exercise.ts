import { gql } from "apollo-boost";

export const GET_EXERCISE_DATA = gql`
  query getExercises($endTime: String!, $startTime: String!) {
    user(id: 1) {
      exerciseRecords(endTime: $endTime, startTime: $startTime) {
        label
        timestamp
        calories
      }
    }
  }
`;

export const ADD_EXERCISE_DATA = gql`
  mutation addExercise($input: NewExerciseRecord!) {
    createExerciseRecord(input: $input) {
      label
      timestamp
      calories
    }
  }
`;

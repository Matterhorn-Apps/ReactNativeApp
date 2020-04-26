/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const ME_QUERY = gql`
  {
    me {
      id
      displayName
      age
      height
      sex
      weight
      calorieGoal
      exerciseRecords {
        calories
        label
      }
      foodRecords {
        calories
        label
      }
    }
  }
`;

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  displayName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  sex?: Maybe<Sex>;
  weight?: Maybe<Scalars['Int']>;
  calorieGoal?: Maybe<Scalars['Int']>;
  exerciseRecords: Array<ExerciseRecord>;
  foodRecords: Array<FoodRecord>;
};

export type UserExerciseRecordsArgs = {
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
};

export type UserFoodRecordsArgs = {
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
};

export type CalorieGoal = {
  __typename?: 'CalorieGoal';
  calories: Scalars['Int'];
};

export type ExerciseRecord = {
  __typename?: 'ExerciseRecord';
  user: User;
  calories: Scalars['Int'];
  label: Scalars['String'];
  timestamp: Scalars['String'];
};

export type FoodRecord = {
  __typename?: 'FoodRecord';
  user: User;
  calories: Scalars['Int'];
  label: Scalars['String'];
  timestamp: Scalars['String'];
};

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type Query = {
  __typename?: 'Query';
  user: User;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type CalorieGoalInput = {
  userId: Scalars['ID'];
  calories: Scalars['Int'];
};

export type NewExerciseRecord = {
  userId: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  calories?: Maybe<Scalars['Int']>;
};

export type NewFoodRecord = {
  userId: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  calories?: Maybe<Scalars['Int']>;
};

export type NewUser = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createExerciseRecord: ExerciseRecord;
  createFoodRecord: FoodRecord;
  setCalorieGoal: CalorieGoal;
};

export type MutationCreateUserArgs = {
  input: NewUser;
};

export type MutationCreateExerciseRecordArgs = {
  input?: Maybe<NewExerciseRecord>;
};

export type MutationCreateFoodRecordArgs = {
  input?: Maybe<NewFoodRecord>;
};

export type MutationSetCalorieGoalArgs = {
  input: CalorieGoalInput;
};

export type GetExercisesQueryVariables = {
  endTime: Scalars['String'];
  startTime: Scalars['String'];
};

export type GetExercisesQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & {
    exerciseRecords: Array<
      { __typename?: 'ExerciseRecord' } & Pick<
        ExerciseRecord,
        'label' | 'timestamp' | 'calories'
      >
    >;
  };
};

export type AddExerciseMutationVariables = {
  input: NewExerciseRecord;
};

export type AddExerciseMutation = { __typename?: 'Mutation' } & {
  createExerciseRecord: { __typename?: 'ExerciseRecord' } & Pick<
    ExerciseRecord,
    'label' | 'timestamp' | 'calories'
  >;
};

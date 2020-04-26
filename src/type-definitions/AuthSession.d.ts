// AuthSessionResult is defined by Expo but not exported.
// Defining and exporting type here so that we can use it.
export type AuthSessionResult = {
  type: 'cancel' | 'dismiss' | 'locked';
} | {
  type: 'error' | 'success';
  errorCode: string | null;
  params: {
      [key: string]: string;
  };
  url: string;
};

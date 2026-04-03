import { FirebaseError } from 'firebase/app';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/requires-recent-login':
    'Please log out and log back in before updating your credentials.',
  'auth/network-request-failed':
    'Network error. Check your connection and try again.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
};

const FIRESTORE_ERROR_MESSAGES: Record<string, string> = {
  'permission-denied': 'You do not have permission to perform this action.',
  unavailable: 'Service is temporarily unavailable. Please try again.',
  'not-found': 'The requested data could not be found.',
  'already-exists': 'This record already exists.',
  'resource-exhausted': 'Too many requests. Please slow down.',
  unauthenticated: 'You must be logged in to perform this action.',
  'deadline-exceeded': 'The request timed out. Please try again.',
  internal: 'An internal server error occurred.',
  cancelled: 'The operation was cancelled.',
};

function getFirebaseErrorMessage(error: FirebaseError): string {
  const code = error.code;

  if (code.startsWith('auth/')) {
    return AUTH_ERROR_MESSAGES[code] ?? `Authentication error (${code}).`;
  }

  return FIRESTORE_ERROR_MESSAGES[code] ?? `Server error (${code}).`;
}

export function throwFirebaseError(err: unknown): never {
  if (err instanceof FirebaseError) {
    throw new Error(getFirebaseErrorMessage(err));
  }
  const message = err instanceof Error ? err.message : String(err);
  throw new Error(`Unexpected error: ${message}`);
}

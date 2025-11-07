function getErrorMessage(errorCode) {
  const messages = {
    // Email & Password Errors
    'auth/invalid-email': 'The email address is not valid. Please enter a valid email.',
    'auth/user-disabled': 'This user account has been disabled.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'The password is incorrect. Please try again.',
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/operation-not-allowed': 'This authentication method is not enabled. Contact support.',
    'auth/weak-password': 'The password is too weak. Please use at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',

    // Network Errors
    'auth/network-request-failed': 'Network error occurred. Check your internet connection.',

    // Credential Errors
    'auth/invalid-credential': 'The credential provided is invalid. Please try again.',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email but different sign-in method.',

    // Re-authentication Errors
    'auth/requires-recent-login': 'Please log in again to perform this action.',

    // Popup / Redirect Errors (Google, Facebook, etc.)
    'auth/popup-closed-by-user': 'The login popup was closed before completing.',
    'auth/cancelled-popup-request': 'The previous popup request was canceled before completing.',
    'auth/popup-blocked': 'The login popup was blocked by the browser. Allow popups to continue.',

    // Phone Auth Errors
    'auth/invalid-verification-code': 'The verification code is invalid. Please check and try again.',
    'auth/missing-verification-code': 'Please provide the verification code sent to your phone/email.',
    'auth/invalid-phone-number': 'The phone number entered is invalid. Use the correct format.',
    'auth/missing-phone-number': 'Please provide a phone number to continue.',

    // Default
    'default': 'An unexpected error occurred. Please try again.'
  };

  return messages[errorCode] || messages['default'];
}


export {getErrorMessage}
export const handleFirestoreError = (err: any, fallbackMessage: string) => {
  console.error("Firestore Error:", err);
  if (err.message.includes("permission-denied")) {
    return "You do not have permission to perform this action.";
  } else if (err.message.includes("network-request-failed")) {
    return "Network error. Please check your internet connection.";
  }
  return err.message || fallbackMessage;
};

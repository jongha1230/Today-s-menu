export async function callSupabaseAuth(
  authFunction,
  successMessage,
  failureMessage
) {
  try {
    const { data, error } = await authFunction();
    if (error) {
      throw new Error(error.message);
    }
    console.log(successMessage);
    return data;
  } catch (error) {
    const errorMessage = `${failureMessage}: ${error.message}`;
    console.error(errorMessage);
    throw error;
  }
}

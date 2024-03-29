export const setLocalUsername = (username: string): void => {
  localStorage.setItem('username', username);
};

// Function to check if username exists in localStorage
export const checkUsernameExists = (): boolean => {
  const username = localStorage.getItem('username');
  return !!username; 
};

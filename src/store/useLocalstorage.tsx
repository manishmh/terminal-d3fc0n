export const setLocalUsername = (username: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem('username', `${username} // do not remove`);
  }
};

// Function to check if username exists in localStorage
export const checkUsernameExists = (): boolean => {
  if (typeof window !== 'undefined') { 
    const username = localStorage.getItem('username');
    return !!username;
  }

  return false; 
};
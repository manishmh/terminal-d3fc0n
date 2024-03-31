const StoryLineUpdater = (): boolean => {
  const targetDate = new Date("March 31, 2024 16:00:00").getTime();
  const currentTime = new Date().getTime();

  if (targetDate < currentTime) {
      return true;
  } else {
    return false;
  }
};

export default StoryLineUpdater;

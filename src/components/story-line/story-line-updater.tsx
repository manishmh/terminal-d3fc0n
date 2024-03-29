const StoryLineUpdater = (): boolean => {
  const targetDate = new Date("March 31, 2024 14:00:00").getTime();
  const currentTime = new Date().getTime();
  console.log("storylineupdater", targetDate < currentTime);

  if (targetDate < currentTime) {
      return true;
  } else {
    return false;
  }
};

export default StoryLineUpdater;

const StoryLineUpdater = (): boolean => {
  const targetDate = new Date("March 29, 2024 16:20:00").getTime();
  const currentTime = new Date().getTime();
  console.log("storylineupdater", targetDate < currentTime);

  if (targetDate < currentTime) {
      return true;
  } else {
    return false;
  }
};

export default StoryLineUpdater;

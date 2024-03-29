
const StoryLineUpdater = (
): boolean => {
  const checkDateTime = () => {
    const targetDate = new Date("March 31, 2024 02:00:00").getTime();
    const currentTime = new Date().getTime();
    console.log("storylineupdater", targetDate < currentTime);

    if (targetDate < currentTime) {
      return true
    } 
  };

  checkDateTime();

  return false
};

export default StoryLineUpdater;

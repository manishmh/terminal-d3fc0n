import Banner from "./banner";

const WelcomeMessage = () => {
  return (
    <div>
      <div className="text-green-400">Logged in...</div>
      <Banner />
    </div>
  );
};

export default WelcomeMessage;

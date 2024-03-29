import useStore from "@/store/useStore";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

type LoginProps = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [usernameEntered, setUsernameEntered] = useState(true);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setPlayer, setJwtToken } = useStore();

  const handleUsernameEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username.trim() !== "") {
      setHistory((prev) => [...prev, `username: ${username}`]);
      setUsernameEntered(false);
      setPasswordEntered(true);
    }
  };

  const handlePasswordEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && password.trim() !== "") {
      setHistory((prev) => [
        ...prev,
        `password: ${"•".repeat(password.length)}`,
      ]);
      setUsernameEntered(false);
      setPasswordEntered(false);

      startTransition(async () => {
        try {
          const response = await fetchUserData(username.trim(), password.trim());
          const data = await response.json();

          if (response.status === 200) {
            const token = data.token;

            const playerData = {
              userName: data.userName,
              level: data.level,
              currentQuest: data.currentQuestion,
              score: data.score,
              token: token
            };
            setPlayer(playerData)
            setHistory((prev) => [...prev, "Login successful"]);

            setJwtToken(token)
            setIsLoggedIn(true);
          } else {
            setHistory((prev) => [
              ...prev,
              "Error: Incorrect username or password",
            ]);
            setUsernameEntered(true);
          }
        } catch (error) {
          console.error("Error during login:", error);
          setHistory((prev) => [...prev, "Error: Login failed"]);
          setUsernameEntered(true);
        } finally {
            setUsername("");
            setPassword("");
        }
      });
    }
  };

  const fetchUserData = async (username: string, password: string) => {
    try {
      const login_res = await fetch(
        "https://d3fcon-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      return login_res;
    } catch (error) {
      throw new Error("Failed to fetch user data: " + error);
    }
  };

  return (
    <div className="">
      <div className="text-red-500 text-lg">Login to start hacking...</div>
      <div className="">
        Check your registered email for your username and password
      </div>
      <div>
        {history.map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
      {isPending && <div className="text-green-500 text-lg">loading...</div>}
      {usernameEntered && (
        <div className="flex gap-1">
          <span>username: </span>
          <input
            autoFocus
            type="text"
            spellCheck="false"
            value={username}
            className="w-full bg-transparent border-none outline-none "
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameEnter}
          />
        </div>
      )}
      {passwordEntered && (
        <div className="flex gap-1">
          <span>password: </span>
          <input
            autoFocus
            spellCheck="false"
            type="password"
            className="w-full bg-transparent border-none outline-none "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePasswordEnter}
          />
        </div>
      )}
    </div>
  );
};

export default Login;

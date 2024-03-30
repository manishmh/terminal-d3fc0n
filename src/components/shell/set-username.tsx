import { useState, useTransition } from "react";
import useStore from "@/store/useStore";
import { setLocalUsername } from "@/store/useLocalstorage";

const SetUser = () => {
  const { toggleUsername } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [usernameEntered, setUsernameEntered] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [rollEntered, setRollEntered] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleRollEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && roll.trim() !== "") {
      setHistory((prev) => [...prev, `roll: ${roll}`]);

      setRollEntered(false)
      setUsernameEntered(true)
    }
  };

  const handleUsernameEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username.trim() !== "") {
      setHistory((prev) => [...prev, `username: ${username}`]);

      setUsernameEntered(false)
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
          const response = await fetchUserData(username.trim(), password.trim(), roll.trim());
          if (response.status === 200) {
            setHistory((prev) => [...prev, "username set successfully"]);
            setLocalUsername(username);
            toggleUsername();

          } else if (response.status === 404) {
            setHistory((prev) => [
              ...prev,
              "roll number not found",
            ]);
          }
          else {
            setHistory((prev) => [
              ...prev,
              "username already set",
            ]);
          }
        } catch (error) {
          console.error("Error during login:", error);
          setHistory((prev) => [...prev, "Error: Login failed"]);
        } finally {
            setRoll("")
            setUsername("");
            setPassword("");
            setRollEntered(true);
        }
      });
    }
  };

  const fetchUserData = async (username: string, password: string, roll: string) => {
    try {
      const login_res = await fetch(
        "https://d3fcon-backend.onrender.com/auth/setUsername",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, roll }),
        }
      );
      return login_res;
    } catch (error) {
      throw new Error("Failed to fetch user data: " + error);
    }
  };

  return (
    <div className="">
      <div className="text-red-500 text-lg">set username</div>
      <div>
        {history.map((entry, index) => (
          <div key={index}>{entry}</div>
        ))}
      </div>
      {isPending && <div className="text-green-500 text-lg">loading...</div>}
      {rollEntered && (
        <div className="flex gap-1">
          <span className="flex-shrink-0">Roll number: </span>
          <input
            autoFocus
            type="text"
            spellCheck="false"
            value={roll}
            className="w-full bg-transparent border-none outline-none "
            onChange={(e) => setRoll(e.target.value)}
            onKeyDown={handleRollEnter}
          />
        </div>
      )}
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

export default SetUser;

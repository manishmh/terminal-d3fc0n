import { Dispatch, SetStateAction, useState, useTransition } from "react";

type HandleFlagEntryProps = {
  setHistory: Dispatch<
    SetStateAction<{ command: string; response: string[] }[]>
  >;
  setShowInput: Dispatch<SetStateAction<boolean>>;
};

const HandleFlagEntry = ({
  setShowInput,
  setHistory,
}: HandleFlagEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const [flag, setFlag] = useState("");

  const handleFlagSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "13") {
      startTransition( async () => {
        try {
          const token = 'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yY1VyRUppMzJtYTdNT3pWN2tCNG5oNjNMTXUiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3MDgxNzc3MTEsImlhdCI6MTcwODE3NzY1MSwiaXNzIjoiaHR0cHM6Ly9saXZlLWRvZG8tMjMuY2xlcmsuYWNjb3VudHMuZGV2IiwibmJmIjoxNzA4MTc3NjQxLCJzaWQiOiJzZXNzXzJjVXNNNFJNNHljNTkzcjNNT2Q0Rjk3eVhXSCIsInN1YiI6InVzZXJfMmNVc0x6RjZKUHNZNjRrMlAwSDF1cUljR2NzIn0.LrUE1lZyn4QCu9B44770CLn61SjGvSXi1BhAfdEEBaRNeiXrIq6feZQ_k62v5sRCBChkoTLPxqDKRcCckH4Dx41YSkcTKOlpbUexgvjUpabrgaqRIcQ3YXcibXHIkxyRcLT9zl0ZFGgtJ8BRR1YChECx11gRxdaKeZpXc8OBPftxSPfHOLyl39IqumVTQHd4u0ODxQ62morn7RaKHDp5q_hrOHA0l-8tyHICJG9dFqkosMuASfWHxZUVN897uXWuf8-iQHAAV6McSRo1RFOZ5FExjy1GVYA0QfIxpE7AABKZr64QYQ_unpoRxIbVmjZhMDYYbMhxXRqrJhwBFyBOhQ'; 
          const response = await fetch("http://localhost:3001/submit/flag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ flag }),
          })
          console.log('response', response)
          const data = await response.json();
          console.log('data', data);

          if (response.status === 200) {
            setHistory((prevHistory) => [...prevHistory, { command: "", response: [data.message] }]);
          } else setHistory((prevHistory) => [...prevHistory, { command: "", response: [data.message] }]);

          setShowInput(true);
        } catch (error) {
          console.error(error)  
        }
      });
    }
  };

  return (
    <>
      {isPending && <div>checking flag...</div>}
      <div className="flex gap-1">
        <div>answer: </div>
        <input
          type="text"
          autoFocus
          spellCheck="false"
          value={flag}
          onKeyDown={handleFlagSubmit}
          onChange={(e) => setFlag(e.target.value)}
          className="w-full bg-transparent border-none outline-none"
        />
      </div>
    </>
  );
};

export default HandleFlagEntry;

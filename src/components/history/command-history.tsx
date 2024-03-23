type CommandHistoryProps = {
  history: { command: string; response: string[] };
};

const CommandHistory = ({ history }: CommandHistoryProps) => {
  // Split the response array into chunks of 4 words
  const chunks = history.response.reduce<string[][]>((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2); 
    
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; 
    }
    
    resultArray[chunkIndex].push(item); 
    
    return resultArray;
  }, []);

  return (
    <div className="font-sans space-y-[-5px] mb-1">
      <div className="font-medium text-lg flex bg-gray700 gap-[2px] items-center">
        <span className="text-[#19fc00]">anonymous@d3fc0n</span>
        <span>:</span>
        <span className="text-base">$</span>
        <span>~</span>
        <span>{history.command}</span>
      </div>
      <div className="flex max-w-4xl flex-wrap gap-12">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex flex-col">
            {chunk.map((word, index) => (
              <span key={index} className={`word${index}`}>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandHistory;

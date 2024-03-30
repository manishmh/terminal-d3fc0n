type CommandHistoryProps = {
  history: { command: string; response: string[] };
};

const CommandHistory = ({ history }: CommandHistoryProps) => {
  // Split the response array into chunks of 2 words
  const chunks = history.response.reduce<string[][]>((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2); 
    
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; 
    }
    
    resultArray[chunkIndex].push(item); 
    
    return resultArray;
  }, []);

  const renderHTML = (html: string) => ({ __html: html });

  return (
    <div className="space-y-[-5px] mb-1">
      <div className="font-medium text-lg flex bg-gray700 gap-[2px] items-center">
        <span className="text-[#19fc00]">anonymous@d3fc0n</span>
        <span>:</span>
        <span className="text-base">$</span>
        <span>~</span>
        <span className="ml-1">{history.command}</span>
      </div>
      <div className="flex max-w-4xl flex-wrap gap-x-12">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="flex flex-col">
            {chunk.map((word, index) => (
              <span key={index} className={`word${index}`} dangerouslySetInnerHTML={renderHTML(word)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandHistory;

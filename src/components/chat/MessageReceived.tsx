const imgTailIn = "/chat/tail-in.svg";

interface MessageReceivedProps {
  message: string;
  time?: string;
  hasLink?: boolean;
  linkText?: string;
}

export default function MessageReceived({ message, time = "9:41", hasLink, linkText }: MessageReceivedProps) {
  // Render message with support for \n newlines and optional inline link replacement
  const renderMessage = () => {
    if (!hasLink || !linkText) {
      return message.split('\n').map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ));
    }

    // Render message with the link highlighted in blue
    return message.split('\n').map((line, i, arr) => {
      const parts = line.split(linkText);
      return (
        <span key={i}>
          {parts.map((part, j) => (
            <span key={j}>
              {part}
              {j < parts.length - 1 && (
                <span className="text-[#007AFF] cursor-pointer">{linkText}</span>
              )}
            </span>
          ))}
          {i < arr.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="flex items-end justify-start w-full px-[8px]">
      {/* Outer wrapper — relative so tail + status atoms can be absolutely positioned */}
      <div className="relative flex items-end" style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.12))' }}>

        {/* Text bubble */}
        <div className="bg-white flex items-start overflow-clip px-[14px] py-[8px] relative rounded-[18px] shrink-0">
          <div className="flex items-start max-w-[250px] w-[250px]">
            <div
              className="flex-1 text-[15px] font-normal leading-[0] min-h-px min-w-px text-stone-800 tracking-[-0.4px]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              <p className="leading-[22px] mb-0">{renderMessage()}</p>
              {/* Extra line to reserve space for the status atom overlay */}
              <p className="leading-[22px] m-0">&nbsp;</p>
            </div>
          </div>
        </div>

        {/* Tail atom — mirrored to the left for incoming messages */}
        <div className="absolute bottom-[-0.21px] left-[-6.08px] w-[13.977px] h-[20.214px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex-none w-[13.977px] h-[20.214px]" style={{ transform: 'rotate(180deg) scaleY(-1)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute block max-w-none w-full h-full" src={imgTailIn} />
            </div>
          </div>
        </div>

        {/* Status atom (time only — grey for received) */}
        <div className="absolute bottom-[4px] right-[12px] flex gap-[3px] items-center justify-end w-[43px]">
          <p
            className="font-medium leading-normal shrink-0 text-[11px] text-[#8d8d8f] text-right whitespace-nowrap"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {time}
          </p>
        </div>

      </div>
    </div>
  );
}

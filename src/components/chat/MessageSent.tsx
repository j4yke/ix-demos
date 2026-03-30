const imgTailAtomOut = "http://localhost:3845/assets/00fad20ed0b8225f9dfeeaeac95522a064c55a63.svg";
const imgDoubleCheck = "http://localhost:3845/assets/19be400d4f51c88ea2d37dfce5b97d2a1f4c7b44.svg";

interface MessageSentProps {
  message: string;
  time?: string;
}

export default function MessageSent({ message, time = "9:41" }: MessageSentProps) {
  return (
    <div className="flex items-end justify-end w-full px-[8px]">
      {/* Outer wrapper — relative so tail + status atoms can be absolutely positioned */}
      <div className="relative flex items-end" style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.12))' }}>

        {/* Text bubble */}
        <div className="bg-[#e1fec6] flex items-start overflow-clip px-[14px] py-[8px] relative rounded-[18px] shrink-0">
          <div className="flex items-start max-w-[250px] w-[250px]">
            <div className="flex-1 text-[15px] font-normal leading-[0] min-h-px min-w-px text-stone-800" style={{ fontFamily: "'SF Pro', sans-serif" }}>
              <p className="leading-[22px] mb-0">{message}</p>
              {/* Extra line to reserve space for the status atom overlay */}
              <p className="leading-[22px] m-0">&nbsp;</p>
            </div>
          </div>
        </div>

        {/* Tail atom — absolutely positioned off the bottom-right of the bubble */}
        <div className="absolute bottom-[-0.21px] right-[-6.08px] w-[13.977px] h-[20.214px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute block max-w-none w-full h-full" src={imgTailAtomOut} />
        </div>

        {/* Status atom (time + double check) — absolutely positioned inside bubble bottom-right */}
        <div className="absolute bottom-[4px] right-[12px] flex gap-[3px] items-center justify-end w-[43px]">
          <p className="font-medium leading-normal shrink-0 text-[11px] text-[#3eaa3c] text-right whitespace-nowrap" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {time}
          </p>
          <div className="h-[7.909px] relative shrink-0 w-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="absolute block max-w-none w-full h-full" src={imgDoubleCheck} />
          </div>
        </div>

      </div>
    </div>
  );
}

import { motion } from "framer-motion";
const imgTailIn = "/chat/tail-in.svg";

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0, opacity: 0.4 },
    animate: { y: -3, opacity: 1 },
  };

  const dotTransition = (delay: number) => ({
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    delay: delay,
    ease: "easeInOut" as const,
  });

  return (
    <div className="flex items-end justify-start w-full px-[8px]">
      <div className="relative flex items-end" style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.12))' }}>
        
        {/* Bubble */}
        <div className="bg-white flex items-center justify-center h-[36px] w-[60px] relative rounded-[18px] shrink-0">
          <div className="flex gap-[4px]">
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={dotTransition(0)}
              className="w-[6px] h-[6px] rounded-full bg-[#8d8d8f]"
            />
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={dotTransition(0.15)}
              className="w-[6px] h-[6px] rounded-full bg-[#8d8d8f]"
            />
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={dotTransition(0.3)}
              className="w-[6px] h-[6px] rounded-full bg-[#8d8d8f]"
            />
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

      </div>
    </div>
  );
}


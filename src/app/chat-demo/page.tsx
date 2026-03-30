"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageSent from "@/components/chat/MessageSent";
import MessageReceived from "@/components/chat/MessageReceived";
import TypingIndicator from "@/components/chat/TypingIndicator";

const CONVERSATION = [
  { id: 1, type: "sent", message: "I want to send a newsletter about our new product launch to all subscribers." },
  { id: 2, type: "received", message: "Got it! A few quick details — what's the subject line, and who should it come from?" },
  { id: 3, type: "sent", message: `Subject: "Introducing Acme — your new workspace". Send it from hello@acme.com. Keep it clean and minimal, match our website style.` },
  { id: 4, type: "received", message: "On it. Creating the campaign and template now..." },
  { id: 5, type: "received", message: `Campaign is ready. Here's the summary:\nSubject "Introducing Acme — your new workspace"\nFrom: hello@acme.com\nTo: All subscribers (1,240 contacts)\nDesign: Clean minimal, matches acme.com\nPreview: autosend.com/campaigns/acme-launch/design`, hasLink: true, linkText: "autosend.com/campaigns/acme-launch/design" },
  { id: 6, type: "sent", message: "Looks great! Can you send a test to me first — jane@acme.com" },
  { id: 7, type: "received", message: "Check your inbox and let me know if everything looks good!" },
  { id: 8, type: "sent", message: "Looks perfect. Go ahead and send it to everyone. Turn off open tracking." },
  { id: 9, type: "received", message: "Campaign is going out to all 1,240 subscribers right now. You'll get a delivery report shortly." },
];

export default function ChatDemoPage() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleMessages < CONVERSATION.length) {
      const nextMessage = CONVERSATION[visibleMessages];
      const initialDelay = 1000;

      const timer = setTimeout(() => {
        if (nextMessage.type === "received") {
          setIsTyping(true);
          // Agent "typing" for 1 second
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((prev) => prev + 1);
          }, 1000);
        } else {
          // User "sends" immediately after natural delay
          setVisibleMessages((prev) => prev + 1);
        }
      }, initialDelay);

      return () => clearTimeout(timer);
    }
  }, [visibleMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleMessages, isTyping]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f4] font-sans">
      <div className="w-[1152px] h-[652px] px-[24px] py-[80px]">
        <div className="w-full h-full p-px bg-[#e7e5e4]">
          <div className="w-full h-full flex gap-px overflow-hidden bg-white">
            
            {/* Left Side */}
            <div className="bg-[#fafaf9] flex flex-[1_0_0] flex-col items-start justify-between p-[24px] relative">
              {/* Header / Logo */}
              <div className="relative shrink-0 w-[220px] h-[50px] -ml-2 -mt-2">
                <Image
                  src="/open-claw.png"
                  alt="OpenClaw Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Text Block */}
              <div className="flex flex-col gap-[24px] items-start relative shrink-0">
                <div className="flex flex-col justify-center relative shrink-0 text-[40px] text-[#292524] tracking-[-0.8px] w-[502.5px] font-[family-name:var(--font-geist-sans)]">
                  <p className="leading-[1.2] m-0">
                    Run entire email operations in a single message with OpenClaw
                  </p>
                </div>
                <div
                  className="flex flex-col justify-center relative shrink-0 text-[20px] text-[#79716b] w-[502.5px] whitespace-pre-wrap font-[family-name:var(--font-geist-sans)]"
                  style={{ fontFeatureSettings: "'cv03', 'cv02', 'cv04', 'cv06', 'cv07', 'cv08', 'cv10', 'cv09'" }}
                >
                  <p className="leading-[28px] mb-[8px] m-0">
                    Add the AutoSend Clawhub skill to your OpenClaw agent,
                    authenticate once, and you're done.
                  </p>
                  <p className="leading-[28px] m-0">
                    From that point, your agent handles everything on command. No
                    dashboard. No manual steps.
                    <br />
                    Just tell it what to send.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 bg-[#f5f5f4]">
                <Image
                  src="/blue-mountains.png"
                  alt="Blue Mountains"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* The Screen (Behind Bezel) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[64px] w-[380px] h-[640px] z-10 rounded-[36px] overflow-hidden bg-[#F6F6F6] flex flex-col justify-between shadow-[0px_341.589px_95.327px_0px_rgba(0,0,0,0),0px_218.458px_87.383px_0px_rgba(0,0,0,0.01),0px_123.131px_73.879px_0px_rgba(0,0,0,0.05),0px_54.813px_54.813px_0px_rgba(0,0,0,0.09),0px_13.505px_30.187px_0px_rgba(0,0,0,0.1)]">

                {/* Chat Header */}
                <div className="w-full shrink-0 flex justify-center px-2 pt-0 pb-2">
                  <Image
                    src="/chat-header.png"
                    alt="Chat Header"
                    width={348}
                    height={64}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>

                {/* Chat Messages Viewport */}
                <div 
                  ref={scrollRef}
                  className="flex-1 relative overflow-y-auto flex flex-col p-4 gap-4 pb-[240px] scrollbar-hide"
                >
                  <AnimatePresence mode="popLayout">
                    {CONVERSATION.slice(0, visibleMessages).map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20,
                          duration: 0.4 
                        }}
                        className="w-full"
                      >
                        {item.type === "sent" ? (
                          <MessageSent message={item.message} />
                        ) : (
                          <MessageReceived 
                            message={item.message} 
                            hasLink={item.hasLink} 
                            linkText={item.linkText} 
                          />
                        )}
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, scale: 0.8, y: 10, originX: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* iPhone Bezel */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[24px] w-[428px] h-[876px] z-20 pointer-events-none">
                <Image
                  src="/Device Bezel/iPhone 14.png"
                  alt="iPhone 14 Bezel"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



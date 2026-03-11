'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BotLauncherProps {
  onClick: () => void;
}

export function BotLauncher({ onClick }: BotLauncherProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onClick}
      className="group fixed bottom-5 right-4 z-50 flex cursor-pointer flex-col items-center gap-[8px] overflow-visible focus:outline-none sm:bottom-6 sm:right-6 sm:gap-[10px]"
      aria-label="Open chat assistant"
    >
      <div className="relative h-[96px] w-[80px] sm:h-[116px] sm:w-[96px]">
        <div className="bot-launcher-upper-float relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
          <Image
            src="/bot/bot_upper.png"
            alt="Shivoham assistant"
            width={1024}
            height={1536}
            sizes="(max-width: 640px) 80px, 96px"
            quality={100}
            className="bot-launcher-upper-image h-full w-full select-none object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className="relative h-[36px] w-[92px] shrink-0 sm:h-[42px] sm:w-[110px]">
        <span className="bot-launcher-contact-shadow pointer-events-none absolute left-1/2 top-[-8px] h-[8px] w-[52px] -translate-x-1/2 sm:top-[-9px] sm:h-[9px] sm:w-[62px]" />
        <Image
          src="/bot/bot_below.png"
          alt=""
          width={1024}
          height={1536}
          sizes="(max-width: 640px) 92px, 110px"
          quality={100}
          className="bot-launcher-base-image h-full w-full select-none object-cover object-[center_66%]"
          priority
        />
      </div>
    </motion.button>
  );
}

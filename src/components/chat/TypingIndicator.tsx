import { motion } from 'framer-motion'
import { typingIndicatorVariants } from '../../styles/animations'

export function TypingIndicator() {
  return (
    <motion.div
      className="flex justify-start px-[18px] mb-1"
      variants={typingIndicatorVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-white rounded-lg rounded-bl-none px-4 py-[10px] shadow-sm">
        <div className="flex gap-[5px]">
          <span className="typing-dot w-[7px] h-[7px] rounded-full bg-[#92a0a8] inline-block" />
          <span className="typing-dot w-[7px] h-[7px] rounded-full bg-[#92a0a8] inline-block" />
          <span className="typing-dot w-[7px] h-[7px] rounded-full bg-[#92a0a8] inline-block" />
        </div>
      </div>
    </motion.div>
  )
}

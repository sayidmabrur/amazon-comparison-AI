'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AnimatedMascot() {
    return (
        <aside className="hidden lg:block relative rounded-xl min-h-[300px] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full relative"
            >
                <Image
                    src="/assets/mascott3.png"
                    alt="Mascot"
                    fill
                    className="object-cover"
                />
            </motion.div>
        </aside>
    )
}

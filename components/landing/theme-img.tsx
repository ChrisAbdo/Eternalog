'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function ThemeImg() {
  const { theme } = useTheme();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.45,
          },
        },
      }}
    >
      {theme === 'dark' && (
        <motion.img
          src="https://pbs.twimg.com/media/Fw746qcWcAAonab?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 z-50 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        />
      )}

      {theme === 'light' && (
        <motion.img
          src="https://pbs.twimg.com/media/Fw7KZeGXoAMc-gM?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 rounded-md z-50 bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24 "
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        />
      )}

      {!theme && (
        <motion.img
          src="https://pbs.twimg.com/media/Fw7KZeGXoAMc-gM?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        />
      )}
    </motion.div>
  );
}

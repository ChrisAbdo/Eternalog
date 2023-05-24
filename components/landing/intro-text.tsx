"use client";

import React from "react";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
import { Button } from "../ui/button";

export default function IntroText() {
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
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.h1
        className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Balancer>Your Online Thought Manager</Balancer>
      </motion.h1>
      <motion.p
        className="mt-6 text-center md:text-xl"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Balancer>
          Welcome to Eternalog, a place to store your thoughts and ideas.
        </Balancer>
      </motion.p>
      <motion.div
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Link href="/eternalog" className="flex">
          <Button variant="default">
            <BookOpen className="w-5 h-5 mr-2" />
            Launch App
          </Button>
        </Link>

        <Link
          href="https://www.github.com/chrisabdo/eternalog"
          className="flex"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button variant="outline">
            <Star className="w-5 h-5 mr-2" />
            Star on Github
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { useTheme } from "next-themes";

export default function ThemeImg() {
  const { theme } = useTheme();
  return (
    <div>
      {theme === "dark" && (
        <img
          src="https://pbs.twimg.com/media/Fw746qcWcAAonab?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
        />
      )}

      {theme === "light" && (
        <img
          src="https://pbs.twimg.com/media/Fw7KZeGXoAMc-gM?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
        />
      )}

      {!theme && (
        <img
          src="https://pbs.twimg.com/media/Fw7KZeGXoAMc-gM?format=jpg&name=large"
          alt="App screenshot"
          width={2432}
          height={1442}
          className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
        />
      )}
    </div>
  );
}

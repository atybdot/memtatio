("use client");
import {
  Link,
  createFileRoute,
  retainSearchParams,
  useSearch,
} from "@tanstack/react-router";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { SendHorizonalIcon } from "lucide-react";
import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

import SelectAI from "@/components/select-ai";
import { buttonVariants } from "@/components/ui/button";
import { options } from "@/data/AIOptions.data";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { searchSchema } from "@/lib/schemas";


const App = () => {
  const [scope, animate] = useAnimate();
  const { ai } = useSearch({ from: "/" });

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);
  return (
    <div
      className="relative flex h-full w-full items-center justify-center text-b"
      ref={scope}
    >
      <div className="pointer-events-none absolute inset-0 z-50 h-full w-full bg-background opacity-50 [mask-image:radial-gradient(transparent,white)]" />
      <Floating sensitivity={-1.2} className="overflow-hidden">
        {options.map((ai) => (
          <FloatingElement
            key={nanoid()}
            depth={ai.meta.depth}
            className={ai.meta.classNames.float}
          >
            <img
              src={ai.url}
              alt={`${ai.meta.name}`}
              className={ai.meta.classNames.img}
            />
          </FloatingElement>
        ))}
      </Floating>
      <motion.div
        className="z-50 flex flex-col items-center space-y-4 text-balance text-center font-sans drop-shadow-2xl drop-shadow-zinc-800/20 dark:drop-shadow-zinc-200/20 "
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-xl text-center text-4xl md:text-6xl ">
          <span className="font-bold text-amber-500 capitalize italic">
            chat
          </span>{" "}
          with your favorite
          <span className="font-bold text-rose-500 italic "> youtuber</span>
        </div>

        <div className="flex w-10/12 flex-col items-start justify-between gap-2 rounded-xl bg-background p-2">
          <Link
            className="inline-flex w-full items-center justify-between gap-2"
            to={"/chat"}
            from="/"
            search={{ ai }}
          >
            <p className="flex-1 px-2 text-start text-md text-muted-foreground">
              say hello
            </p>
            <div className={cn(buttonVariants({ size: "icon" }), "rounded-lg")}>
              <SendHorizonalIcon />
            </div>
          </Link>
          <SelectAI navigatePath="/" from={"/"} preText="chat with" />
        </div>
      </motion.div>
    </div>
  );
};
export const Route = createFileRoute("/")({
  component: App,
  validateSearch: searchSchema,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

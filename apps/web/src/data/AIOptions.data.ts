import hcImg from "@/assets/images/hc.jpg";
import pgImg from "@/assets/images/pg.jpg";
import maImg from "@/assets/images/ma.jpg";
import cwhImg from "@/assets/images/cwh.jpg";
import abImg from "@/assets/images/ab.jpg";
import { cn } from "@/lib/utils";
import * as datasets from "@memtatio/datasets";
import { number } from "zod/v4";
export const options = [
  {
    url: hcImg,
    id: datasets.hitesh.username,
    meta: {
      name: datasets.hitesh.bio.name,
      depth: 1,
      classNames: {
        img: "hover:scale-105 transition-all duration-200 ease-linear h-30 md:h-70",
        float: cn("top-12 left-8", "md:top-20 md:left-[15%]"),
        colors: "text-foreground",
      },
    },
  },
  {
    url: pgImg,
    id: datasets.piyush.username,
    meta: {
      name: datasets.piyush.bio.name,
      depth: 2,
      classNames: {
        img: "hover:scale-105 transition-all duration-200 ease-linear h-30 md:h-70",
        float: cn("top-40 right-10", "md:right-[20%]"),
        colors: "text-amber-500",
      },
    },
  },
  {
    url: abImg,
    id: datasets.arpit.username,
    meta: {
      name: datasets.arpit.bio.name,
      depth: 1,
      classNames: {
        img: "hover:scale-105 transition-all duration-200 ease-linear h-30 md:h-65",
        float: "left-[15%] md:left-[10%] bottom-10 md:bottom-[-5%]",
      },
    },
  },
  {
    url: maImg,
    id: datasets.mannu.username,
    meta: {
      name: datasets.mannu.bio.name,
      depth: 3,
      classNames: {
        img: "hover:scale-105 transition-all duration-200 ease-linear h-25 md:h-60",
        float: "bottom-20 right-10 md:bottom-[-5%] md:right-[10%]",
        colors: "text-cyan-500",
      },
    },
  },
  {
    url: cwhImg,
    id: datasets.harry.username,
    meta: {
      name: datasets.harry.bio.name,
      depth: 4,
      classNames: {
        img: "hover:scale-105 transition-all duration-200 ease-linear h-20 md:h-45",
        float: "bottom-[80%] left-[60%] md:bottom-[5%] md:left-[42%]",
        colors: "text-foreground",
      },
    },
  },
]

export type TOption = typeof options[keyof typeof number] 
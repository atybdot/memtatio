import type { LinkComponentProps } from "@tanstack/react-router";

import {
  BugIcon,
  HouseIcon,
  LucideDatabaseZap,
  LucideHandshake,
  LucideInfo,
  MessagesSquare,
  UserRoundMinusIcon,
  UsersIcon,
} from "lucide-react";
import type { ElementType } from "react";

export interface NavLinks extends LinkComponentProps {
  title: string;
  Icon?: ElementType;
  notReady?: boolean;
}
export const socialsLinks = {
  github: "https://github.com/atybdot",
  x: "https://x.com/atybdot",
  mail: "mailto:atybdot@proton.me",
  project: "https://github.com/atybdot/memtatio",
  issues: {
    base: "https://github.com/atybdot/memtatio/issues/new",
    issue:
      "https://github.com/atybdot/memtatio/issues/new?template=report-bug.yml",
    youtuber:
      "https://github.com/atybdot/memtatio/issues/new?template=request-youtuber.yml",
  },
};

export const navLinks: NavLinks[] = [
  { title: "home", to: "/", Icon: HouseIcon },
  { title: "chat", to: "/chat", Icon: MessagesSquare },

  { title: "available youtubers", to: "/models", Icon: UsersIcon },
  {
    title: "data-sets ",
    to: "/data-sets",
    Icon: LucideDatabaseZap,
    notReady: true,
  },
  {
    title: "request youtuber",
    href: socialsLinks.issues.youtuber,
    Icon: UsersIcon,
    target: "_blank",
  },
  {
    title: "report bug",
    href: socialsLinks.issues.issue,
    Icon: BugIcon,
    target: "_blank",
  },
  {
    title: "ask for removal",
    href: socialsLinks.issues.youtuber,
    Icon: UserRoundMinusIcon,
    target: "_blank",
  },
  // { title: "acknowledgments", to: "/acknowledgments", Icon: LucideHandshake },
  {
    title: "Terms & Conditions",
    to: "/terms-and-conditions",
    Icon: LucideInfo,
  },
];

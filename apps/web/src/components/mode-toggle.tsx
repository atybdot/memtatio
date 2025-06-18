import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" ? true : false;

  return (
    <div className="">
      <Button
        variant={"ghost"}
        className=""
        onClick={() => (isDark ? setTheme("light") : setTheme("dark"))}
        size={"icon"}
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
    </div>
  );
}

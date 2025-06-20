import { cn } from "@/lib/utils";
import React from "react";

function Logo({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-full size-16 inline-flex items-center justify-center font-black text-zinc-100 bg-blue-500 ",
        className
      )}
      {...props}
    >
      M
    </div>
  );
}

export default Logo;

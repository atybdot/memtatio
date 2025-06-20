import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { options } from "@/data/AIOptions.data";

import {
  useNavigate,
  useSearch,
  type ValidateFromPath,
} from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { nanoid } from "nanoid";

export default function SelectAI({
  from,
  navigatePath,
  showImage = false,
  preText,
  classNames,
}: {
  from: any;
  navigatePath: ValidateFromPath;
  showImage?: boolean;
  preText?: string;
  classNames?: {
    button?: string;
    image?: string;
  };
}) {
  const search = useSearch({ from });
  const navigate = useNavigate({ from: navigatePath });

  const curr = options.find((v) => v.id === search.ai);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "h-fit w-fit items-end rounded-md py-1 text-muted-foreground/50 text-xs shadow-none hover:text-muted-foreground/50 md:text-sm data-[state=open]:[&_#icon]:rotate-180 ",
            showImage ? "ms-1" : "ps-2",
            classNames?.button
          )}
          aria-label="Open ai-selection menu"
        >
          {showImage && (
            <img
              src={curr?.url}
              className={cn(
                "size-5 rounded-md object-cover md:size-6",
                classNames?.image
              )}
            />
          )}
          <p>
            {preText ? preText : "talking with"}{" "}
            <span className="text-muted-foreground">{curr?.meta.name}</span>
          </p>
          <ChevronUp
            className="-ms-1 size-4 origin-center rotate-90 transition-all duration-300 md:size-4.5"
            id="icon"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="my-2 max-w-64" align="end">
        {options.map((ai) => (
          <DropdownMenuItem
            key={nanoid()}
            onClick={() =>
              navigate({
                search: { ai: ai.id },
                replace: true,
              })
            }
            className="font-sans text-sm capitalize tracking-tight "
          >
            <img
              src={ai.url}
              className="size-8 rounded-full object-cover"
              alt={ai.meta.name}
            />
            <span>{ai.meta.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

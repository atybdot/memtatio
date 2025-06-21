import {
  createFileRoute,
  retainSearchParams,
  useSearch,
} from "@tanstack/react-router";
import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import {
  Check,
  Copy,
  InfoIcon,
  Loader2,
  SendHorizonalIcon,
  StopCircleIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import SelectAI from "@/components/select-ai";
import Logo from "@/components/ui/logo";
import { TextLoop } from "@/components/ui/text-loop";
import { TextShimmer } from "@/components/ui/text-shimmer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type TOption, options } from "@/data/AIOptions.data";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { searchSchema } from "@/lib/schemas";

import {  useLocalStorage } from "usehooks-ts";
import { env } from "@/env";

export const Route = createFileRoute("/chat/")({
  component: RouteComponent,
  validateSearch: searchSchema,
  search: {
    middlewares: [retainSearchParams(true)],
  },
});

function RouteComponent() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useSearch({ from: "/chat/" });

  const curr = options.find((i) => i.id === search?.ai);
  const [currentAI, setCurrentAI] = useState<
    {
      messageId: string;
      payload: {
        url: TOption["url"];
        name: TOption["meta"]["name"];
      };
    }[]
  >();
  const [ratelimit, setLimit] = useLocalStorage<number>("rate-limit", 200);
  const [isCopied, setIsCopied] = useState(false);
  const { input, messages, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: env.VITE_API_URL + "/chat",
      streamProtocol: "data",
      sendExtraMessageFields: true,
      onError(error) {
        toast.error(error?.message, { position: "top-center" });
      },
      onResponse(response) {
        const id = response.headers.get("x-memtatio-ai") ?? "";
        console.log(id);

        window.localStorage.setItem("memtatio-model", id);
        const limit = response.headers.get("ratelimit-remaining")!;
        setLimit(Number.parseInt(limit, 10));
      },
      onFinish(message) {
        const getCurrentModel = window.localStorage.getItem(
          "memtatio-model"
        ) as TOption["url"];
        const getUrl = options.find((i) => i.id === getCurrentModel)?.url ?? "";
        const name =
          options.find((i) => i.id === getCurrentModel)?.meta.name ?? "";
        if (Array.isArray(currentAI)) {
          setCurrentAI([
            ...currentAI,
            { payload: { url: getUrl, name }, messageId: message.id },
          ]);
        } else {
          setCurrentAI([
            { payload: { url: getUrl, name }, messageId: message.id },
          ]);
        }
      },
    });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleUserSubmit = (e: React.FormEvent) =>
    handleSubmit(e, {
      body: {
        memtatio: curr?.id,
      },
    });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true)
    setTimeout(()=>setIsCopied((p)=>!p),1000)
  };

  return (
    <section className=" font-b">
      <div className="flex h-full flex-col">
        <section
          className="h-100 md:h-130 overflow-y-scroll scrollbar-thin"
          ref={containerRef}
        >
          {/* Messages Container */}
          <div className="flex-1">
            <div className="mx-auto max-w-4xl space-y-6 p-4">
              {/* INITIAL PAGE */}
              {messages.length === 0 && status !== "streaming" && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Logo className="text-4xl" />
                  </div>
                  <h2 className="mb-2 font-semibold text-xl">
                    Welcome to Memtatio
                  </h2>

                  <div className="whitespace-pre-wrap text-muted-foreground text-sm transition-all duration-100">
                    <div className="m-auto flex w-fit flex-col items-center justify-center gap-1 text-base md:text-base">
                      <p className=" w-full ">ask anything & get responses</p>
                      <span className="-ms-1 inline-flex w-full justify-start gap-1">
                        <span> like</span>{" "}
                        <TextLoop className="overflow-y-clip text-center text-foreground ">
                          {options.map((ai) => (
                            <span key={nanoid()}>{ai.meta.name} .</span>
                          ))}
                        </TextLoop>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MAIN MESSAGES CONTAINER */}
              {messages.map((message) => {
                const patload = currentAI?.find(
                  (r) => r.messageId === message.id
                )?.payload;
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "items-center justify-end gap-2"
                        : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar className="size-7">
                        <AvatarImage
                          className="object-cover"
                          src={patload?.url ?? curr?.url}
                          alt={"message from ${curr?.id}"}
                        />
                        <AvatarFallback>{curr?.id[0]}</AvatarFallback>
                      </Avatar>
                    )}

                    <div className={"max-w-[80%]"}>
                      {message.role === "assistant" ? (
                        <p className="ps-4 text-muted-foreground">
                          {patload?.name ?? curr?.meta.name}
                        </p>
                      ) : null}
                      <section
                        className={`h-fit space-y-4 rounded border-0 px-4 ${
                          message.role === "user"
                            ? "bg-zinc-300 dark:bg-zinc-700"
                            : " dark:bg-zinc-900 "
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content.trim()}
                        </div>
                        {message.role === "assistant" && (
                          <div className="grid place-content-end border-t p-1.5">
                            <Button
                              variant="ghost"
                              disabled={isCopied}
                              onClick={() => copyToClipboard(message.content)}
                              className="h-6 p-2 py-4 text-sm"
                            >
                              {isCopied ? <Check/> :<Copy className="size-3.5" />}
                              {isCopied ? "copied" : "Copy"}
                            </Button>
                          </div>
                        )}
                      </section>
                    </div>

                    {message.role === "user" && (
                      <Logo className="size-8 text-base lowercase" />
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />

              {/* SHOW SHIMMER TEXT */}
              {status === "submitted" && (
                <div className={`flex max-w-[80%]`}>
                  <Avatar className="size-7">
                    <AvatarImage
                      src={curr?.url}
                      alt={"message from ${curr?.id}"}
                    />
                    <AvatarFallback>{curr?.id[0]}</AvatarFallback>
                  </Avatar>

                  <div className="h-fit animate-pulse whitespace-pre-wrap rounded border-0 px-4 text-base leading-relaxed dark:bg-zinc-900">
                    {curr?.meta.name ? <p>{curr?.meta.name}</p> : null}
                    <TextShimmer>Generating Response...</TextShimmer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* USER FOOTER */}
        <section className="justify-center-safe m-auto mb-12 flex w-screen max-w-3xl flex-col items-center gap-2 px-4 md:px-0">
          {/* INPUT HEADER */}
          <div className="flex w-full flex-col-reverse items-start justify-between gap-y-2 md:flex-row-reverse">
            {/* REMAINING LIMIT BOX */}
            <div className="justify-center-safe inline-flex items-center gap-1 rounded-sm bg-amber-500/10 px-3 py-1 text-amber-600 text-xs shadow md:gap-2 md:text-sm ">
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="size-5" />
                </TooltipTrigger>
                <TooltipContent className="rounded-sm font-sans tracking-wide">
                  This is your daily limit, it will be reset after 24 hours
                </TooltipContent>
              </Tooltip>
              <span className=" mb-0.5 capitalize">
                {" "}
                you only have {ratelimit} messages left
              </span>
            </div>
            {/* SELECTION */}
            <SelectAI showImage from="/chat/" navigatePath="/chat" />
          </div>

          {/* USER INPUT */}
          <form
            ref={formRef}
            onSubmit={handleUserSubmit}
            className={cn(
              "inline-flex w-full items-start justify-between gap-2 bg-background p-2 px-2 ps-3 shadow-md dark:bg-zinc-800",
              "rounded-lg "
            )}
          >
            <Textarea
              required
              ref={textareaRef}
              value={input}
              rows={1}
              disabled={status === "submitted" || status === "streaming"}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={cn(
                "my-auto max-h-32 min-h-2 flex-1 resize-none items-center justify-center scroll-auto text-wrap border-0 bg-transparent p-0 px-2 text-start text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
              placeholder="send message"
            />
            {(status === "submitted" || status === "streaming") && (
              <Button
                onClick={() => stop()}
                size={"icon"}
                variant={"destructive"}
                className={cn("rounded-full bg-rose-600 dark:bg-rose-500")}
              >
                <StopCircleIcon className="size-5 stroke-1.5 " />
              </Button>
            )}

            <Button
              size={"icon"}
              className={cn("rounded-lg")}
              type="submit"
              disabled={
                !input.trim() ||
                status === "submitted" ||
                status === "streaming"
              }
            >
              {status === "submitted" || status === "streaming" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <SendHorizonalIcon />
              )}
            </Button>
          </form>
        </section>
      </div>
    </section>
  );
}

import { Card, CardDescription } from "@/components/ui/card";
import { options } from "@/data/AIOptions.data";
import { datasets } from "@memtatio/datasets";
import { Link, createFileRoute } from "@tanstack/react-router";

import { nanoid } from "nanoid";

export const Route = createFileRoute("/models/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="justify-center-safe m-auto mb-12 flex h-full flex-col items-center space-y-6 md:space-y-12 font-sans lowercase">
      <h1 className="text-4xl md:text-5xl">
        Available{" "}
        <span className="font-medium text-rose-600 italic">youtubers</span>{" "}
      </h1>
      <div className="grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {options.map((ai) => {
          const info = datasets.find((user) => user.username === ai.id);
          return (
            <Card className="w-full min-w-fit gap-0 p-3 " key={nanoid()}>
              <div className="group overflow-hidden rounded-md ">
                <img
                  src={ai.url}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover object-top transition-all duration-200 group-hover:scale-105"
                />
              </div>
              <Link to="/chat" search={{ ai: ai.id }} className="mt-2 text-lg">
                {ai.meta.name}
              </Link>
              <CardDescription>
                <a
                  href={`https://youtube.com/${ai.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ai.id}
                </a>
              </CardDescription>
              <p className="mt-2 cursor-default text-pretty text-sm leading-relaxed">
                {info?.bio.short.replaceAll("`", "").split(".")[0]}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

import { navLinks, socialsLinks } from "@/data/links.data";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import { nanoid } from "nanoid";
import {  useEffect, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Logo from "./ui/logo";
export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useLocation();
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      setOpen(!open);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);
  return (
    <header className="bg-gradient-to-b from-card/50 to-transparent font-sans">
      <nav className="flex flex-row justify-between p-3 py-3 md:px-12 md:py-4">
        <div className="space-x-3 px-2 capitalize">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2"
          >
            <Logo className="size-8 text-xl" />
            <span className="text-2xl">Memtatio</span>
          </Link>
        </div>
        <div className="inline-flex contain-content">
          <ModeToggle />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen((e) => !e)}
                variant={"ghost"}
                size={"icon"}
              >
                <MenuIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="block space-y-4 pb-2 font-sans text-muted-foreground">
              <DialogHeader className="mb-4 text-start ">
                <DialogTitle className="text-3xl">Navigation</DialogTitle>
                <DialogDescription>useful links</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-y-2 divide-y md:gap-y-4">
                {navLinks.map((link) => {
                  if (link.to === router.pathname) {
                    return;
                  }

                  const IconComponent = link.Icon;

                  return (
                    <Link
                      onClick={() => setOpen(false)}
                      to={link?.to ? link.to : link.href}
                      key={nanoid()}
                      target={link?.target}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "relative justify-start rounded-none bg-transparent ps-0 font-normal text-muted-foreground text-sm tracking-wide transition-all duration-50 focus-within:bg-transparent focus-within:text-foreground hover:text-foreground md:text-base dark:hover:bg-transparent",
                        "capitalize",
                        link?.notReady ? "no-underline" : ""
                      )}
                    >
                      {IconComponent && <IconComponent />}
                      <span>{link.title}</span>
                      {link?.notReady === true ? (
                        <Badge
                          variant={"outline"}
                          className="rounded-full border-amber-500/20 bg-amber-500/10 px-2 lowercase tracking-wide "
                        >
                          upcoming
                        </Badge>
                      ) : null}
                      <span className=" absolute inset-0" />
                    </Link>
                  );
                })}
                {/* <div className="flex justify-between gap-2">
                  <Link
                  onClick={()=>setOpen(false)}
                    to="/register"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "flex-1"
                    )}
                  >
                    Login
                  </Link>
                  <Link
                  onClick={()=>setOpen(false)}
                    to="/register"
                    className={cn(buttonVariants({ size: "lg" }), "flex-1")}
                  >
                    Signup
                  </Link>
                </div> */}
              </div>
              <DialogFooter className=" mb-2! flex-row items-center ">
                <p className="flex-1 text-sm ">
                  created by{" "}
                  <a
                    className={cn(
                      buttonVariants({ size: "sm", variant: "link" }),
                      "ps-0"
                    )}
                    target="_blank"
                    href={socialsLinks.github}
                    rel="noreferrer"
                  >
                    @atybdot.
                  </a>
                </p>

                <a
                  href={socialsLinks.project}
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-6 "
                  )}
                  rel="noreferrer"
                >
                  <FaGithub className="me-2" />
                </a>
                <a
                  href={socialsLinks.x}
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-6"
                  )}
                  rel="noreferrer"
                >
                  <FaXTwitter />
                </a>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}

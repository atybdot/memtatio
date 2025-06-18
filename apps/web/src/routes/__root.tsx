import Header from "@/components/Header";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="light" storageKey="memtatio-theme">
        <section className="relative grid h-svh grid-rows-[auto_1fr]">
          <Header />
          <GridPattern
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "-z-99 fixed top-0 left-0 inset-x-0 inset-y-[-40%] h-[200%] max-h-full skew-y-12"
            )}
          />
          <Outlet />
        </section>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
});

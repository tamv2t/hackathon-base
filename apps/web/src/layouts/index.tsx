"use client";
import { addFilter } from "@repo/hooks";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { formatNumber } from "../utils/formatNumberPlugin";
import Header from "./components/Header";
interface IMyLayout {
  children: React.ReactElement;
}

export default function Layout({ children }: IMyLayout) {
  addFilter("format_number", "plugin-format-number", formatNumber);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative px-4 max-w-screen-2xl bg-background min-h-screen">
        <main>
          <Header />
          {children}
        </main>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}

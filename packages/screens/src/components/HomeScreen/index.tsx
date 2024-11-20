"use client";

import { Separator } from "@repo/ui/components/ui/separator";
import Hero from "./Hero";
import Installed from "./Installed";

const HomeScreen = () => {
  return (
    <section className="flex flex-col gap-y-8 ">
      <Hero />
      <Separator />
      <Installed />
    </section>
  );
};

export default HomeScreen;

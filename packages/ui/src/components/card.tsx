import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";

export function Card({
  title,
  href,
}: {
  title: string;
  href: string;
}): JSX.Element {
  return (
    <a
      className="ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors hover:ui-border-neutral-700 hover:ui-bg-neutral-800/30"
      href={`${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className="ui-mb-3 ui-text-2xl ui-font-semibold">
        {title}{" "}
        <span className="ui-inline-block ui-transition-transform group-hover:ui-translate-x-1 motion-reduce:ui-transform-none">
          -&gt;
        </span>
      </h2>

      <Button variant={"default"}>123</Button>
      <p className="size-10 bg-black">12</p>
    </a>
  );
}

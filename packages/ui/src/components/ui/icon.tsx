"use client";
import { ICONS } from "@repo/constants";
import React from "react";

interface IIcon extends React.HTMLAttributes<HTMLSpanElement> {
  name: (typeof ICONS)[number];
}

export type IconType = (typeof ICONS)[number];

export const Icon: React.FC<IIcon> = ({ name, className, ...rest }) => {
  const classes = `
    icon-${name}
    ${className ?? ""}
  `;
  return <span className={classes} {...rest}></span>;
};

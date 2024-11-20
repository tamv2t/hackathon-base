"use client";
import { Icon } from "@repo/ui/components/ui/icon";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="h-[64px] flex justify-between items-center ">
      <Link href={"/"}>
        <Image
          alt="C98 Logo"
          width={128}
          height={128}
          src="icons/c98-long-logo.svg"
        />
      </Link>
      <div className="flex items-center ml-auto gap-x-4">
        <button onClick={onChangeTheme}>
          <Icon
            className="text-xl"
            name={theme === "light" ? "app_lamp_on" : "app_lamp_off"}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;

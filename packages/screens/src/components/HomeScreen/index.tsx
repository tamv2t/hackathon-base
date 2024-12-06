"use client";

import { Separator } from "@repo/ui";
import Link from "next/link";
import Hero from "./Hero";
import { PluginArea } from "../plugin-area";
// Recursive function to build a nested structure representation
// const buildNestedStructure = (element: HTMLElement): any => {
//   const node = {
//     tag: element.tagName.toLowerCase(),
//     id: element.id || null,
//     className: element.className || null,
//     text: element.textContent?.trim() || null,
//     children: [],
//     element,
//   };
//   // Recursively process all child elements
//   Array.from(element.children).forEach((child) => {
//     node.children.push(buildNestedStructure(child as HTMLElement));
//   });

//   return node;
// };
// Recursive function to assign unique IDs to elements
// const assignIds = (node: any, parentId: string = "") => {
//   const { element, children } = node;

//   // Build a nested structure from the DOM
//   const currentId = parentId ? `${parentId}_${children.length}` : "pluginTest";
//   element.id = `#${currentId}`;
//   console.log({
//     element,
//     length: children.length,
//     currentId,
//   });

//   // Assign unique IDs to all elements in the nested structure
//   children.forEach((childNode: any, index: number) => {
//     assignIds(childNode, `${currentId}_${index + 1}`);
//   });
// };
const HomeScreen = () => {
  // const containerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (containerRef.current) {
  //     const nestedStructure = buildNestedStructure(containerRef.current);
  //     console.log("Nested Structure:", nestedStructure);
  //     assignIds(nestedStructure);
  //   }
  // }, []);

  return (
    <section className="flex flex-col gap-y-8 ">
      <Hero />
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Installed</h2>
        <Link
          href={"/explore"}
          className="text-textLink hover:underline hover:decoration-2"
        >
          Explore All Snaps
        </Link>
      </div>
      <PluginArea />
      {/* <div ref={containerRef}>
        <ul>
          <li>
            <span>123 abc</span>
          </li>
          <li>23</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <div>TEST check </div>
      </div> */}
    </section>
  );
};

export default HomeScreen;

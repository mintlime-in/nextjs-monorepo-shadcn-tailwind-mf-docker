"use client"

import { ComponentExample } from "@repo/ui/components/component-example";
import { ColorModeIcon, ColorModeDropdown } from "@repo/ui/hooks/use-colour";

export default function Home() {

  return (
    <div>
      <ColorModeIcon />
      <ColorModeDropdown />
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="text-3xl font-bold underline">
          Web App
        </h1>
        <a href="/docs">Go to Docs...</a>
      </div>
      <ComponentExample />
    </div>
  );
}

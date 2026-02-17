import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center gap-2">
      <h1 className="text-3xl font-bold underline">
        Docs App
      </h1>
      <a href="/">Go to Web...</a>
    </div>
  );
}

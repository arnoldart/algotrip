import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import { PopularityCityList } from "./_components/PopularityCityList";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularityCityList />
    </div>
  );
}

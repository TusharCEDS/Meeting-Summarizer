import Image from "next/image";
import Hero from "@/components/Hero";
import TranscriptForm from "@/components/TranscriptForm";
export default function Home() {
  return (
    <div>
      <Hero />
      <TranscriptForm />
    </div>
  );
}

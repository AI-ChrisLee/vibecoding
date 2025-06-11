import Image from "next/image";

export default function SignupHeader() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center gap-3">
        <Image src="/assets/Profile.png" alt="Logo" width={36} height={36} className="rounded-full border border-gray-200" />
        <span className="font-black text-1xl text-foreground">Vibecoding Masterclass by Chris</span>
      </div>
    </div>
  );
} 
import Image from "next/image";
import { site } from "@/data/site";

export default function Logo() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <a href="#top" aria-label={`${site.name} — back to top`} className="group inline-flex items-center gap-3 leading-none">
      <Image src="/images/logo-mark.png" alt="" width={200} height={216} priority className="h-10 w-auto transition-transform duration-700 ease-soft group-hover:-translate-y-0.5" />
      <span className="flex flex-col">
        <span className="font-serif text-[1.65rem] tracking-tight">{first}</span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.42em] opacity-80">{rest.join(" ")}</span>
      </span>
    </a>
  );
}

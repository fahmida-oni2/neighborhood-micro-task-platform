import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  title: string;
  href?: string;
};

export default function Brand({ title, href = "/client/dashboard" }: BrandProps) {
  return (
    <Link href={href} className="flex items-center gap-2 h-16">
    

      {/* Text: tiny optical nudge */}
      <span className="text-lg font-bold leading-none relative top-[1px]">
        {title}
      </span>
    </Link>
  );
}

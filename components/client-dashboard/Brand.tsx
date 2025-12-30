import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  title: string;
  href?: string;
};

export default function Brand({ title, href = "/client/dashboard" }: BrandProps) {
  return (
    <Link href={href} className="flex items-center gap-2 h-16">
      {/* Icon container: make it a flex box so image centers optically */}
      <span className="h-8 w-8 flex items-center justify-center flex-shrink-0">
        <span className="relative h-7 w-7">
          <Image
            src="/logo1121.png"
            alt="NeighborGig logo"
            fill
            className="object-contain"
          />
        </span>
      </span>

      {/* Text: tiny optical nudge */}
      <span className="text-lg font-bold leading-none relative top-[1px]">
        {title}
      </span>
    </Link>
  );
}

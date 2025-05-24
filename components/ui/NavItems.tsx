"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Assistants", href: "/assistants" },
  { label: "Journey", href: "/my-journey" },
];

const NavItems = () => {
  // usePathname Hook
  const pathname = usePathname();
  return (
    // Immediate return mapping
    <nav className="flex items-center gap-6">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(pathname === href && "text-primary font-semibold")}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;

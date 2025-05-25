import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./ui/NavItems";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mx-auto w-full px-14 py-4 bg-white max-sm:px-4">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="border border-black rounded-3xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;

import Image from "next/image";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-[#2c2c2c] text-white rounded-3xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
      <div className="bg-[#fccc41] rounded-3xl px-3 py-1.5 text-black">
        Start learning your way.
      </div>
      <h2 className="text-3xl font-bold">
        Build and Personalized Learning Assistant
      </h2>
      <p>
        Pick a name, subject, voice & personality - and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <button className="bg-black text-white rounded-2xl cursor-pointer px-4 py-2 flex items-center gap-2">
        <Image src="icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/assistants/new">
          <p>Build a New Assistant</p>
        </Link>
      </button>
    </section>
  );
};

export default CallToAction;

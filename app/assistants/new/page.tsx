import AssistantForm from "@/components/AssistantForm";
import { newAssistantPermissions } from "@/lib/actions/assistant.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewAssistant = async () => {
  // if !login when creating an assistant, login first
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const canCreateAssistant = await newAssistantPermissions();

  return (
    // if login, return:
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateAssistant ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Build an Assistant</h1>
          <AssistantForm />
        </article>
      ) : (
        <article className="items-center justify-center flex flex-col gap-4 w-full min-2xl:w-1/2 pt-20 text-center">
          <Image
            src="/images/limit.svg"
            alt="Assistant Limit Reached"
            width={360}
            height={230}
          />
          <div className="bg-[#fccc41] rounded-3xl px-3 py-1.5 text-black">
            Upgrade your plan.
          </div>
          <h1 className="font-bold text-2xl">You've Reached Your Limit</h1>
          <p>
            You've reached your assistant limit. Upgrade to create more
            assistants and premium features
          </p>
          <Link
            href="/subscription"
            className="bg-black text-white rounded-2xl cursor-pointer px-4 py-2 flex items-center gap-2 w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewAssistant;

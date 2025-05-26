import AssistantForm from "@/components/AssistantForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewAssistant = async () => {
  // if !login when creating an assistant, login first
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    // if login, return:
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="w-full gap-4 flex flex-col">
        <h1>Build an Assistant</h1>
        <AssistantForm />
      </article>
    </main>
  );
};

export default NewAssistant;

import AssistantComponent from "@/components/AssistantComponent";
import { getAssistant } from "@/lib/actions/assistant.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface AssistantSessionPageProps {
  params: Promise<{ id: string }>;
}

const AssistantSession = async ({ params }: AssistantSessionPageProps) => {
  const { id } = await params;
  const assistant = await getAssistant(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = assistant;

  if (!user) redirect("/sign-in");
  if (!name) redirect("/assistants");
  console.log(name);

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-4">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt="subject"
              width={35}
              height={35}
            />
          </div>
          {/* small devices */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="font-bold text-2xl">{name}</p>
              <div className="bg-black text-white rounded-3xl text-sm px-2 py-1 capitalize max-md:hidden">
                {subject}
              </div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <AssistantComponent
        {...assistant}
        assistantId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default AssistantSession;

import AssistantCard from "@/components/AssistantCard";
import CallToAction from "@/components/CallToAction";
import AssistantsList from "@/components/ui/AssistantsList";
import {
  getAllAssistants,
  getRecentSessions,
} from "@/lib/actions/assistant.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const assistants = await getAllAssistants({ limit: 3 });
  const recentSessionsAssistants = await getRecentSessions(5);

  return (
    <main>
      <h1>Popular Assistants</h1>
      {/* home section class */}
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        {assistants.map((assistant) => (
          <AssistantCard
            key={assistant.id}
            {...assistant}
            color={getSubjectColor(assistant.subject)}
          />
        ))}
      </section>
      {/* home section class */}
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <AssistantsList
          title="Recently completed sessions"
          assistants={recentSessionsAssistants}
          classNames="w-2/3 max-lg:w-full"
        />
        <CallToAction />
      </section>
    </main>
  );
};

export default Page;

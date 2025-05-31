import AssistantCard from "@/components/AssistantCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllAssistants } from "@/lib/actions/assistant.actions";
import { getSubjectColor } from "@/lib/utils";

// search logic
const AssistantLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const assistants = await getAllAssistants({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Assistant Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {assistants.map((assistant) => (
          <AssistantCard
            key={assistant.id}
            {...assistant}
            color={getSubjectColor(assistant.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default AssistantLibrary;

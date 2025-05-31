import AssistantCard from "@/components/AssistantCard";
import CallToAction from "@/components/CallToAction";
import AssistantsList from "@/components/ui/AssistantsList";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Assistants</h1>
      {/* home section class */}
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <AssistantCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
        <AssistantCard
          id="456"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="math"
          duration={30}
          color="#CA262E"
        />
        <AssistantCard
          id="789"
          name="Verba the Vocabulary Explorer"
          topic="English Literature"
          subject="english"
          duration={30}
          color="#71C2D8"
        />
      </section>
      {/* home section class */}
      <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
        <AssistantsList
          title="Recently completed sessions"
          assistants={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CallToAction />
      </section>
    </main>
  );
};

export default Page;

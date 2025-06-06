import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AssistantsListProps {
  title: string;
  assistants?: Assistant[];
  classNames?: string;
}

const AssistantsList = ({
  title,
  assistants,
  classNames,
}: AssistantsListProps) => {
  return (
    <article
      className={cn(
        "rounded-3xl border border-black px-7 pt-7 pb-10 max-lg:w-full bg-white",
        classNames
      )}
    >
      <h2 className="font-bold text-3xl">Recent Sessions</h2>
      <div className="overflow-x-auto md:overflow-visible">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3 min-w-[300px] md:min-w-0">
                Lessons
              </TableHead>
              <TableHead className="text-lg min-w-[100px]">Subject</TableHead>
              <TableHead className="text-lg text-right min-w-[120px]">
                Duration
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* mapping the assistants (destructuring the map so it can not repeat assistants like assistant.id or something) */}
            {assistants?.map(({ id, subject, name, topic, duration }) => (
              <TableRow key={id}>
                <TableCell className="min-w-[300px] md:min-w-0">
                  <Link href={`/assistants/${id}`}>
                    {/* mobile design */}
                    <div className="flex items-center gap-2">
                      <div
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                      >
                        {/* passing different icons for each one of the subjects */}
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                          className="max-md:hidden"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-2xl max-md:text-lg whitespace-nowrap">
                          {name}
                        </p>
                        <p className="text-lg max-md:text-sm text-gray-600">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="min-w-[100px]">
                  <div className="bg-black text-white rounded-2xl text-sm px-2 py-1 capitalize w-fit whitespace-nowrap">
                    {subject}
                  </div>
                </TableCell>
                <TableCell className="min-w-[120px]">
                  <div className="flex items-center gap-2 w-full justify-end">
                    <p className="text-xl max-md:text-lg whitespace-nowrap">
                      {duration} <span className="max-md:hidden">minutes</span>
                    </p>
                    <Image
                      src="/icons/clock.svg"
                      alt="minutes"
                      width={14}
                      height={14}
                      className="md:hidden"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
};

export default AssistantsList;

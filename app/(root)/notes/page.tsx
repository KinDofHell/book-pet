import {auth} from "@clerk/nextjs";
import NoteForm from "@/components/shared/forms/NoteForm";
import NoteCard from "@/components/shared/NoteCard";

const Page = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const isUserAuth = sessionClaims !== null;

  return <>
    <section className="w-full flex-center flex-col desktop:mt-6">
      {isUserAuth && <NoteForm mode="CREATE" creatorId={userId} />}
      <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
        <NoteCard title="Перша долина" content="Перша долина це цікаве місце"/>
      </div>
    </section>
  </>;
};
export default Page;

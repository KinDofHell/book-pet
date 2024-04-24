import { auth } from "@clerk/nextjs";
import NoteForm from "@/components/shared/forms/NoteForm";
import NoteCard from "@/components/shared/NoteCard";
import { CategoryTitles } from "@/constants";
import BreadcrumbDynamic from "@/components/shared/Breadcrumb";
import { getAllNotes } from "@/lib/actions/note.actions";
import { INote } from "@/lib/database/models/note.model";

const Page = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const isUserAuth = sessionClaims !== null;

  const notes = await getAllNotes(userId);

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        {isUserAuth && <NoteForm mode="CREATE" creatorId={userId} />}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {notes?.map((note: INote) => (
            <NoteCard title={note.title} content={note.text} key={note._id} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;

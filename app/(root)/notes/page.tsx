import { auth } from "@clerk/nextjs";
import NoteForm from "@/components/shared/forms/NoteForm";
import NoteCard from "@/components/shared/NoteCard";
import { getAllNotes } from "@/lib/actions/note.actions";
import { INote } from "@/lib/database/models/note.model";
import { getAllGlossaryItems } from "@/lib/actions/glossaryItem.actions";

const Page = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const isUserAuth = sessionClaims !== null;

  const notes = await getAllNotes(userId);

  const glossaryItems = await getAllGlossaryItems("all", false);

  return (
    <>
      <section className="w-full flex-center flex-col desktop:mt-6">
        {isUserAuth && (
          <NoteForm
            glossaryItems={glossaryItems}
            mode="CREATE"
            creatorId={userId}
          />
        )}
        <div className="flex justify-center flex-wrap gap-8 w-full desktop:mt-6">
          {notes?.map((note: INote) => (
            <NoteCard
              id={note._id}
              title={note.title}
              content={note.text}
              key={note._id}
              userId={userId}
              relatedGlossaryItem={note.relatedGlossaryItemId}
              glossaryItems={glossaryItems}
            />
          ))}
        </div>
      </section>
    </>
  );
};
export default Page;

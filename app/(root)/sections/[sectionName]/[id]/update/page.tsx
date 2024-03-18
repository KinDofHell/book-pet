import GlossaryItemForm from "@/components/shared/forms/GlossaryItemForm";
import { auth } from "@clerk/nextjs";
import { getGlossaryItemById } from "@/lib/actions/glossaryItem.actions";

const CreateEvent = async ({
  params: { sectionName, id },
}: {
  params: { sectionName: string; id: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;
  const glossaryItem = await getGlossaryItemById(id);

  return (
    <>
      <section className="py-5">
        <h3 className="text-center text-3xl desktop:text-4xl dark:text-white">
          Редагувати запис
        </h3>
      </section>
      <div className="my-8">
        <GlossaryItemForm
          type="UPDATE"
          isAdmin={isUserAdmin}
          glossaryItem={glossaryItem}
          categoryType={sectionName}
          glossaryItemId={id}
        />
      </div>
    </>
  );
};
export default CreateEvent;

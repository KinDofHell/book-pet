import GlossaryItemForm from "@/components/shared/forms/GlossaryItemForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = ({
  params: { sectionName, id },
}: {
  params: { sectionName: string; id: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

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
          categoryType={sectionName}
        />
      </div>
    </>
  );
};
export default CreateEvent;

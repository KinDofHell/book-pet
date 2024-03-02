import GlossaryItemForm from "@/components/shared/forms/GlossaryItemForm";
import { auth } from "@clerk/nextjs";

const CreateEvent = ({
  params: { sectionName },
}: {
  params: { sectionName: string };
}) => {
  const { sessionClaims } = auth();

  const isUserAdmin = sessionClaims?.isUserAdmin as boolean;

  return (
    <>
      <section className="py-5">
        <h3 className="text-center text-3xl desktop:text-4xl dark:text-white">
          Додати запис
        </h3>
      </section>
      <div className="my-8">
        <GlossaryItemForm
          type="CREATE"
          isAdmin={isUserAdmin}
          categoryName={sectionName}
        />
      </div>
    </>
  );
};
export default CreateEvent;

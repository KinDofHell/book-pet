import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import SelectGlossaryItemWithSearch from "@/components/shared/forms/SelectGlossaryItemWithSearch";
import {startTransition} from "react";


type NoteCardProps = {
    title: string;
    content: string;
    linkToRelatedGlossaryItem?: string;
}

const NoteCard = ({title, content, linkToRelatedGlossaryItem}: NoteCardProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={`w-full max-w-[425px] py-3 uppercase tracking-wide text-white rounded-2xl bg-light-primary shadow-default mb-6 dark:bg-dark-secondary-gradient hover:text-white hover:bg-light-gradient dark:hover:bg-dark-gradient dark:text-white`}
            >
                {title}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dark:text-black">
                        Закрити
                    </AlertDialogCancel>
                    {/*<AlertDialogAction onClick={() => startTransition(handleAddNote)}>*/}
                    {/*    {mode === "CREATE" ? "Додати нотатку" : "Зберегти зміни"}*/}
                    {/*</AlertDialogAction>*/}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default NoteCard;

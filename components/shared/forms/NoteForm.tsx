"use client";

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
import { Input } from "@/components/ui/input";
import { startTransition, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {NoteFormProps} from "@/types";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import SelectGlossaryItemWithSearch from "@/components/shared/forms/SelectGlossaryItemWithSearch";

const NoteForm = ({ mode, noteData, creatorId }: NoteFormProps) => {
    const pathname = usePathname();

    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newGlossaryItemRelated, setGlossaryItemRelated] = useState("");

    useEffect(() => {
        if (mode === "UPDATE" && noteData) {
            setNewNoteTitle(noteData.title);
            setNewNoteContent(noteData.content);
        }
    }, [mode, noteData]);

    const handleAddNote = () => {
        if (mode === "CREATE") {
            // createCategory({
            //     categoryName: newCategoryName.trim(),
            //     type: newCategoryType.trim(),
            //     path: pathname,
            // });
        } else if (noteData) {
            // updateCategory({
            //     isAdmin,
            //     categoryId: categoryData.id,
            //     categoryName: newCategoryName.trim(),
            //     categoryType: newCategoryType.trim(),
            //     path: pathname,
            // });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className={`w-full max-w-[425px] py-3 uppercase tracking-wide text-black ${mode === "CREATE" ? "bg-white shadow-default mb-6 dark:bg-dark-primary hover:text-white hover:bg-light-gradient dark:hover:bg-dark-secondary-gradient" : ""} dark:text-white`}
            >
                {mode === "CREATE" ? (
                    "Додати нотатку"
                ) : (
                    <Image
                        src="/assets/icons/edit.svg"
                        alt="edit icon"
                        width={18}
                        height={18}
                    />
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-dark-primary dark:text-white dark:border-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {mode === "CREATE" ? "Нова нотатка" : "Зберегти нотатку"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input
                            type="text"
                            placeholder="Заголовок"
                            className="input-field mt-3"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                        ></Input>
                        <Textarea placeholder="Текст нотатки" className="input-field mt-3" value={newNoteContent}
                                  onChange={(e) => setNewNoteContent(e.target.value)}/>
                        <SelectGlossaryItemWithSearch glossaryItems={[{value: "hello"}]} value={newGlossaryItemRelated} setOuterValue={setGlossaryItemRelated}/>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="dark:text-black">
                        Відмінити
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => startTransition(handleAddNote)}>
                        {mode === "CREATE" ? "Додати нотатку" : "Зберегти зміни"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default NoteForm;

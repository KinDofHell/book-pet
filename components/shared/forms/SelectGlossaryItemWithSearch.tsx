"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { IGlossaryItem } from "@/lib/database/models/glossaryItem.model";

type SelectGlossaryItemWithSearchProps = {
  glossaryItems: IGlossaryItem[];
  value?: string;
  setOuterValue: Dispatch<SetStateAction<string>>;
};

const SelectGlossaryItemWithSearch = ({
  glossaryItems,
  value,
  setOuterValue,
}: SelectGlossaryItemWithSearchProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between mt-3"
        >
          {value
            ? glossaryItems?.find((item: IGlossaryItem) => item._id === value)
                ?.title
            : "..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search glossary item..." />
          <CommandList>
            <CommandEmpty>Жодного запису не знайдено</CommandEmpty>
            <CommandGroup>
              {glossaryItems.map((glossaryItem) => (
                <CommandItem
                  key={glossaryItem._id}
                  value={glossaryItem._id}
                  onSelect={(currentValue) => {
                    setOuterValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === glossaryItem._id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {glossaryItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectGlossaryItemWithSearch;

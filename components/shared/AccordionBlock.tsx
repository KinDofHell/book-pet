import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionBlockProps } from "@/types";

const AccordionBlock = ({ title, textContent }: AccordionBlockProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="description"
        className="bg-light-primary px-2 text-white dark:bg-dark-secondary-gradient"
      >
        <AccordionTrigger className="tablet:text-2xl dark:text-white">
          {title}
        </AccordionTrigger>
        <AccordionContent className="tablet:text-xl dark:text-white">
          {textContent}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default AccordionBlock;

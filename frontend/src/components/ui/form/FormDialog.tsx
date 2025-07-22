import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import type { FormDialogProps } from "../types";
import FormContent from "./FormContent";

function FormDialog({
  className,
  title,
  description,
  secondaryButton,
  handleSubmit,
  name,
  showSeparator,
  fields,
  bottomText,
  buttons,
  open,
  setOpen,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn(className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FormContent
          name={name}
          handleSubmit={handleSubmit}
          secondaryButton={secondaryButton}
          showSeparator={showSeparator}
          fields={fields}
          bottomText={bottomText}
          buttons={buttons}
        />
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;

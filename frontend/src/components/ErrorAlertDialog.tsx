import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export interface Error {
  title?: string;
  description: string;
  action?: () => void;
  actionText: string;
}

export interface DialogProps {
  error: Error | null;
  setError: any;
}

function ErrorAlertDialog({ error, setError }: DialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setOpen(true);
    } else {
      return;
    }
  }, [error]);

  if (!error) return;

  const handleClose = () => {
    if (error.action) error.action();
    setOpen(false);
    setError(null);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-destructive ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {error.title || "An error has occured"}
          </AlertDialogTitle>
          <AlertDialogDescription>{error.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>
            {error.actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorAlertDialog;

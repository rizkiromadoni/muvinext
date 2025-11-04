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
} from "@/components/ui/alert-dialog";
import { useDeleteDialog } from "./delete-dialog-context";
import { toast } from "sonner";
import React from "react";

export function DeleteDialog( {onSuccess}: { onSuccess?: () => void }) {
  const { open, closeDialog, selectedId } = useDeleteDialog();
   const [isPending, setIsPending] = React.useState(false);

  const handleConfirm = async () => {
    if (!selectedId) return;

    setIsPending(true);
    toast.info("Deleting...");

    try {
      const res = await fetch(`/api/blogs/${selectedId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      toast.success("Blog deleted successfully!");
      onSuccess?.();
      closeDialog();
    } catch (error) {
      toast.error((error as Error).message);
    }

   setIsPending(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={(o) => !o && closeDialog()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

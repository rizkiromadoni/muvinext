"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DeleteDialogContextProps {
  open: boolean;
  selectedId: number | null;
  openDialog: (id: number) => void;
  closeDialog: () => void;
}

const DeleteDialogContext = createContext<DeleteDialogContextProps | null>(null);

export function DeleteDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openDialog = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <DeleteDialogContext.Provider
      value={{ open, selectedId, openDialog, closeDialog }}
    >
      {children}
    </DeleteDialogContext.Provider>
  );
}

export function useDeleteDialog() {
  const ctx = useContext(DeleteDialogContext);
  if (!ctx) throw new Error("useDeleteDialog must be used within DeleteDialogProvider");
  return ctx;
}

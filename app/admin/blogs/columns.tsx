"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Blog = {
   id: number
   title: string
   slug: string
   user: {
      id: number
      username: string
   },
   createdAt: string
   updatedAt: string
}

export const columns: ColumnDef<Blog>[] = [
   {
      accessorKey: 'id',
      header: 'ID',
   },
   {
      accessorKey: 'title',
      header: 'Title',
   },
   {
      accessorKey: 'slug',
      header: 'Slug',
   },
   {
      accessorKey: 'user.username',
      header: 'User',
   },
   {
      accessorKey: 'createdAt',
      header: 'Created At',
   },
   {
      accessorKey: 'updatedAt',
      header: 'Updated At',
   },
];
"use client"

import React, { useRef, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EditBlogFormProps {
  defaultValues?: {
    title?: string;
    content?: string;
    imageUrl?: string;
    categories?: string;
  },
  id: string;
}

const EditBlogForm: React.FC<EditBlogFormProps> = ({ defaultValues, id }) => {
  const [data, setData] = useState<any>({
    title: defaultValues?.title || "",
    content: defaultValues?.content || "",
    imageUrl: defaultValues?.imageUrl || "",
    categories: defaultValues?.categories || ""
  })
  const [loading, setloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast.info("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filepath", "blogs");

    const res = await fetch("/api/image-upload", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const resData = await res.json();
      setData({ ...data, imageUrl: resData.url });
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Image upload failed.");
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.title.length === 0 || data.content.length === 0) {
      toast.error("Title and content are required.");
      return;
    }

    setloading(true);
    toast.info("Updating blog...");
    
    const categories = data.categories.split(",").map((cat: string) => cat.trim()).filter((cat: string) => cat.length > 0);
    const res = await fetch("/api/blogs/"+id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        categories: categories
      })
    })

    if (!res.ok) {
      const resData = await res.json();
      toast.error(resData.message || "Blog update failed.");
      setloading(false);
      return;
    }

    setloading(false);
    toast.success("Blog updated successfully!");
    window.location.href = "/admin/blogs";
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
          <CardDescription>
            Edit a current blog by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-6 w-full">
                <div className="w-full grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" className="h-36 lg:h-46" value={data.content} onChange={(e) => setData({ ...data, content: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="image">Image URL</Label>
                  <div className='flex gap-2'>
                    <Input id="image" value={data.imageUrl || ""} onChange={(e) => setData({ ...data, imageUrl: e.target.value })} />
                    <Input type='file' className='hidden' accept='image/*' ref={fileInputRef} onChange={handleFileChange} />
                    <Button variant="outline" type='button' onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="categories">Categories</Label>
                  <Textarea id="categories" className="h-36 lg:h-46" value={data.categories} onChange={(e) => setData({ ...data, categories: e.target.value })} placeholder='Separate by comma (Action,Drama,Thriller)' />
                </div>
              </div>
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              </div> */}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditBlogForm
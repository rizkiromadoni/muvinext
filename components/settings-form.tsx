"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface SettingsFormProps {
  options: {
    name: string;
    value: string;
  }[]
}

const SettingsForm: React.FC<SettingsFormProps> = ({ options }) => {
  const [data, setData] = useState<any>({
    siteTitle: options.find((item) => item.name === "site-title")?.value || "",
    siteDescription: options.find((item) => item.name === "site-description")?.value || "",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
    siteName: options.find((item) => item.name === "site-name")?.value || "",
    siteLocale: options.find((item) => item.name === "site-locale")?.value || "",
    siteTemplate: options.find((item) => item.name === "site-template")?.value || "",
    footerScript: options.find((item) => item.name === "footer-script")?.value || ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/settings", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify([
            {
               name: "footer-script",
               value: data.footerScript
            },
            {
               name: "site-title",
               value: data.siteTitle
            },
            {
               name: "site-description",
               value: data.siteDescription
            },
            {
               name: "site-name",
               value: data.siteName
            },
            {
               name: "site-locale",
               value: data.siteLocale
            },
            {
               name: "site-template",
               value: data.siteTemplate
            }
         ]),
      })

      if (!res.ok) {
         const data = await res.json();
         throw new Error(data.message);
      }

      toast.success("Settings updated");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your website settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteTitle">Website Title</Label>
                  <Input id="siteTitle" className="w-full" value={data.siteTitle} onChange={(e) => setData({ ...data, siteTitle: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteDescription">Website Description</Label>
                  <Input id="siteDescription" className="w-full" value={data.siteDescription} onChange={(e) => setData({ ...data, siteDescription: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteName">Website Name</Label>
                  <Input id="siteName" className="w-full" value={data.siteName} onChange={(e) => setData({ ...data, siteName: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteUrl">Website URL</Label>
                  <Input id="siteUrl" className="w-full" value={data.siteUrl} onChange={(e) => setData({ ...data, siteUrl: e.target.value })} disabled />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteTemplate">Website Title Template</Label>
                  <Input id="siteTemplate" className="w-full" value={data.siteTemplate} onChange={(e) => setData({ ...data, siteTemplate: e.target.value })} />
                </div>
                <div className="w-full grid gap-3">
                  <Label htmlFor="siteLocale">Website Locale</Label>
                  <Input id="siteLocale" className="w-full" value={data.siteLocale} onChange={(e) => setData({ ...data, siteLocale: e.target.value })} />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <div className="w-full grid gap-3">
                  <Label htmlFor="footScript">Footer Script</Label>
                  <Textarea id="footScript" className="h-36 lg:h-46" value={data.footerScript} onChange={(e) => setData({ ...data, footerScript: e.target.value })} />
                </div>
              </div>
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
  );
};

export default SettingsForm;

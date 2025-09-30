"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const SettingsForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [footScript, setFootScript] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   const fetchData = async () => {
      try {
         const res = await fetch("/api/settings");
         const data = await res.json();

         const footerScript = data.find((item: any) => item.name === "footer-script")?.value
         if (footerScript) setFootScript(footerScript)
      } catch (error) {
         toast.error((error as Error).message);
      }
   }

   fetchData();
  }, [])

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
               value: footScript
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="w-full grid gap-3">
                  <Label htmlFor="footScript">Footer Script</Label>
                  <Textarea id="footScript" className="h-36 lg:h-46" value={footScript} onChange={(e) => setFootScript(e.target.value)} />
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

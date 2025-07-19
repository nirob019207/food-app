"use client";
import type React from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Nav */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden  fixed left-4 top-4 z-50">
          <Button className="bg-white  border" size="icon">
            <Menu className="h-6 w-6 text-black bg-white" />
            {/* <span className="sr-only">Toggle navigation menu</span> */}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Nav */}
      <div className="hidden lg:block fixed inset-y-0 bg-white text-black left-0 w-64  bg-card">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 h-screen overflow-y-hidden">
        <Header />
        <main className="p-4 border rounded-tl-xl h-full  overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}

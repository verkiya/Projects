import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Navigation } from "@/components/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (user) {
    const email = user.primaryEmailAddress?.emailAddress;
    const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    if (!email || (allowedEmails.length > 0 && !allowedEmails.includes(email))) {
      redirect("/");
    }
  }

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-background pt-24">
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden p-6 md:p-12">
          {children}
        </main>
      </div>
    </>
  );
}

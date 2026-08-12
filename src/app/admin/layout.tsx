import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // If they are logged in, check their email
  if (user) {
    const email = user.primaryEmailAddress?.emailAddress;
    const allowedEmails = process.env.ADMIN_EMAILS?.split(",") || [];

    // If their email isn't in the allowed list, redirect them away
    if (!email || (allowedEmails.length > 0 && !allowedEmails.includes(email))) {
      redirect("/");
    }
  }

  // If they pass the checks, render the admin page
  return <>{children}</>;
}

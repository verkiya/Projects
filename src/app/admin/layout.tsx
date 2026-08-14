import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { LayoutDashboard, Library, RefreshCcw, HeartPulse } from "lucide-react";

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

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Videos", href: "/admin/videos", icon: Library },
    { name: "Curation", href: "/admin/curation", icon: RefreshCcw },
    { name: "Health", href: "/admin/health", icon: HeartPulse },
  ];

  return (
    <>
      <Navigation />
      <div className="flex min-h-screen bg-background pt-24">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 bg-surface/30 p-6 hidden md:block">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden p-6 md:p-12">
          {children}
        </main>
      </div>
    </>
  );
}

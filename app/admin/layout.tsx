import AdminAutoLogout from "@/components/admin/components/AdminAutoLogout";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import {
  authOptions,
} from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session =
    await getServerSession(
      authOptions
    );

  // no session
  if (!session) {

    redirect("/login");
  }

  // only admin allowed
  if (
    (session.user as any)?.role !==
    "admin"
  ) {

    redirect("/");
  }

  return (
    <>
      <AdminAutoLogout />

      {children}
    </>
  );
}
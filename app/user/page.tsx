import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/admin/components/logout-button";
import { redirect } from "next/navigation";

export default async function UserDashboard() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const email = session?.user?.email ?? "User";

  return (
    <div className="min-h-screen bg-white dark:bg-black p-10 flex justify-between items-center">
      <h1 className="text-3xl font-bold dark:text-white text-gray-900">
        Welcome, {email}
      </h1>

      <LogoutButton  />
    </div>
  );
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth.js";
import { fetchBlogUserId } from "../action/blog.js";
import ClientComponent from "../components/pages/dashboard/AllDashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          You must be logged in to view this page.
        </h1>
        <p className="mt-2">
          Please{" "}
          <a href="/api/auth/signin" className="text-blue-500 underline">
            log in
          </a>{" "}
          to access the dashboard.
        </p>
      </div>
    );
  }

  const blogs = await fetchBlogUserId(session.user._id);

  // Ensure blogs is parsed to a JavaScript array
  const parsedBlogs = JSON.parse(blogs);
  console.log(parsedBlogs);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ClientComponent initialBlogs={parsedBlogs} />
    </div>
  );
}

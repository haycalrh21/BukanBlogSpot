import { fetchBlogUserId } from "@/app/action/blog.js";
import ClientComponent from "../../components/pages/dashboard/AllDashboard.jsx";

export default async function DashboardPage({ params }) {
  const { username } = params;
  const data = await fetchBlogUserId(username);
  const parsedBlogs = JSON.parse(data);
  console.log(parsedBlogs);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{username}'s Dashboard</h1>
      <ClientComponent initialBlogs={parsedBlogs} />
    </div>
  );
}

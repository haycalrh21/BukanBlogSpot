// ini server komponent

import BlogComponents from "../components/pages/blog/AllBlog";
import { fetchBlogs } from "@/app/action/blog";

export default async function BlogView() {
  const response = await fetchBlogs();
  const blogs = JSON.parse(response);

  return (
    <div>
      <BlogComponents blogs={blogs} />
    </div>
  );
}

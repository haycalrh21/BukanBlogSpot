import { Hero } from "./components/Hero";
import BlogView from "./components/BlogView"; // Pastikan ini adalah default import

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Hero />
      <BlogView />
    </div>
  );
}

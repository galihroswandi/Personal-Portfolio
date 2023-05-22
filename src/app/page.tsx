import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <h1>Dashboard</h1>
      <Link href="/">Back</Link>
    </div>
  );
}

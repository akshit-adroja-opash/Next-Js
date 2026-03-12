import Link from "next/link";

export default function AdminPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Admin</h1>
      <p>Welcome to the admin section of your site.</p>
      <p>
        <Link href="/admin/about">Go to Admin About</Link>
      </p>
    </main>
  );
}

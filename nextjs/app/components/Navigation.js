import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className=" header flex gap-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/service">Service</Link></li>
          <li><Link href="/clientcomp">Client</Link></li>
          <li><Link href="/serverComp">Service</Link></li>
        </ul>
      </nav>
    </header>
  );
}
import Link from "next/link";

export default function Test() {
  return (
    <div>
      <p>The questions go here</p>
      <Link href={'/results'}>see results</Link>
    </div>
  );
}

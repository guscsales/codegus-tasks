"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";

export default function MainNav() {
  const router = useRouter();

  return (
    <>
      <Link
        href="/"
        className="text-sm hover:underline"
        onMouseEnter={() => {
          router.prefetch("/");
        }}
      >
        Dashboard
      </Link>
      <Link
        href="/tasks"
        className="text-sm hover:underline"
        onMouseEnter={() => {
          router.prefetch("/tasks");
        }}
      >
        Tarefas
      </Link>
    </>
  );
}

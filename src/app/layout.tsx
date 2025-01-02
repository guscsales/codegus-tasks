import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "./globals.css";
import TasksNewFormSheet from "@/app/_components/tasks-new-form-sheet";
import {Button} from "@/components/ui/button";
import MainNav from "@/app/_components/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codegus Tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <div className="w-[37.5rem] mx-auto py-4">
          <header className="flex justify-between items-center">
            <h1 className="text-lg font-bold">Codegus Tasks</h1>
            <nav className="flex gap-3 items-center">
              <MainNav />

              <TasksNewFormSheet trigger={<Button>Criar</Button>} />
            </nav>
          </header>
          <main className="mt-4">{children}</main>
        </div>
      </body>
    </html>
  );
}

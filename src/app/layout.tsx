import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "react-hook-form + Server Actions - by nehalist.io",
  description: "A tutorial on how to use react-hook-form with server actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="container mx-auto mt-10">
          <header className="text-center">
            <h1 className="mt-10 font-bold tracking-tight text-gray-900 text-3xl">
              react-hook-form + Server Actions
            </h1>
          </header>
          <main className="my-2">
            <div className="shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 w-1/2 mx-auto bg-white">
              {children}
            </div>
          </main>
          <footer className="text-center text-sm text-gray-600">
            <a
              href="https://nehalist.io/react-hook-form-with-nextjs-server-actions/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Tutorial
            </a>{" "}
            - by{" "}
            <a
              href="https://nehalist.io"
              className="text-blue-600 font-semibold hover:underline"
            >
              nehalist.io
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}

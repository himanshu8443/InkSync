import "./globals.css";
import { Inter } from "next/font/google";
import { Itim } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const itim = Itim({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "InkSync",
  description: "A collaborative whiteboard for everyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={itim.className}>{children}</body>
    </html>
  );
}

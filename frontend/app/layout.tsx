import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BloggerrHeader from "@/components/article/BloggerrHeader";


const jetbrainsMono = JetBrains_Mono({
  variable:"--font-jetbrains-mono",
  subsets:["latin"]
})

export const metadata: Metadata = {
  title: "Bloggerr",
  description: "Write the things inside you."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono} antialiased`}
        >
        <BloggerrHeader/>
      {children}
      </body>
      
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/universal/Navbar";
import Footer from "@/components/universal/Footer";
import ChatBot from "@/components/universal/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bytelytics",
  description: "Analyze and optimize your social media engagement effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 antialiased`}>
        <ChatBot />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
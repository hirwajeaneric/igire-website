import SideBar from "./components/Sidebar";
import "@/globals.css";
import { imb } from "@/utils/fonts";

export const metadata = {
  title: "IRO Inventory management",
  description: "IRO Inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${imb} flex h-screen overflow-hidden`} // Flex container for sidebar and content
      >
      
        <SideBar />

        <main className="flex-grow overflow-auto bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}

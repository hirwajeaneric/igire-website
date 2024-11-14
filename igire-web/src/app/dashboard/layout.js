import "./globals.css";
import { imb } from "./utils/fonts";

export const metadata = {
  title: "Inventory Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${imb}`}
      >
        {/* <SideBar /> */}
         {children}
      </body>
    </html>
  );
}

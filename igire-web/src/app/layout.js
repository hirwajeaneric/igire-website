import "./globals.css";
import { imb } from "./utils/fonts";

export const metadata = {
  title: "IRO",
  description: "igire rwanda organisation website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${imb}`}
      >
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import Menu from "./menu/Menu";

export const metadata = {
  title: "Sidebar Layout Example",
  description: "A Next.js layout with a sidebar and content area.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Menu />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}

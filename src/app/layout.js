import "./globals.css";

export const metadata = {
  title: "Khalid Alhadi AI chat boot",
  description: "My Own chat boot ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#212121] overflow-hidden">
        {children}
      </body>
    </html>
  );
}

import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Kate's Garden",
  description: "A quiet place for scripture, the kitchen and our school days.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before first paint so the page arrives already dressed for the hour.
const timeOfDay = `(function(){try{var h=new Date().getHours();document.documentElement.dataset.time=h<5?'night':h<11?'dawn':h<17?'day':h<21?'dusk':'night';}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: timeOfDay }} />
      </head>
      <body>
        <div className="app">
          <Nav />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}

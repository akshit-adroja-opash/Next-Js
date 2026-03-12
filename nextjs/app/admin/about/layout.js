
import "../../globals.css";
import Navigation from "../../components/Navigation";

import {Roboto} from "next/font/google"
import {Work_Sans} from "next/font/google"

const roboto = Roboto({
  subsets :["latin"],
  variable: "--font-roboto"
})
const WorkSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans"
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${roboto.variable} ${WorkSans.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

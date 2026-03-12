import "./globals.css";
import Navigation from "./components/Navigation";
import {Roboto} from "next/font/google"
import {Work_Sans} from "next/font/google"

const roboto = Roboto({
  subsets :["latin"]
})
const WorkSans = Work_Sans({
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={WorkSans.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
} 
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "sonner";
// import Header from "@/components/header";
// import { dark } from "@clerk/themes";
// import { ThemeProvider } from "@/components/theme-provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Doctors Appointment App",
//   description: "Connect with doctors anytime, anywhere",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//       }}
//     >
//       <html lang="en" suppressHydrationWarning>
//         <head>
//           <link rel="icon" href="/logo.png" sizes="any" />
//         </head>
//         <body className={`${inter.className}`}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <Header />
//             <main className="min-h-screen">{children}</main>
//             <Toaster richColors />

//             <footer className="bg-muted/50 py-12">
//               <div className="container mx-auto px-4 text-center text-gray-200">
//                 <p>Made with 💗 Daniel</p>
//               </div>
//             </footer>
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react"; // ✅ lucide icons

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doctors Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10 mt-8">
              <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
                {/* Brand / About */}
                <div className="space-y-3">
                  <img
                    src="logoimg.png"
                    alt="Doctors App Logo"
                    className="w-22 h-22 mx-auto md:mx-0"
                  />
                  <h2 className="text-xl font-semibold text-white">MediConnect</h2>
                  <p className="text-sm leading-relaxed">
                    Connecting patients with trusted doctors anytime, anywhere.  
                    Your health, our priority. 💙
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="hover:text-white transition">Home</a></li>
                    <li><a href="/appointments" className="hover:text-white transition">Book Appointment</a></li>
                    <li><a href="/doctors" className="hover:text-white transition">Find a Doctor</a></li>
                    <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                  </ul>
                </div>

                {/* Contact & Socials */}
                <div className="space-y-3 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
                  <p>Email: support@mediconnect.com</p>
                  <p>Phone: +1 (234) 567-890</p>
                  <div className="flex justify-center md:justify-start space-x-4 mt-3">
                    <a href="#" aria-label="Twitter" className="hover:text-white transition">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="Facebook" className="hover:text-white transition">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-white transition">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} MediConnect. All rights reserved.</p>
                <p className="mt-1">Made with 💗 by Micheal</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

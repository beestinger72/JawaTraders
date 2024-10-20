"use client";
//JF Globals
import React from "react";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme/ThemeContext"; 
import "./styles/globals.scss";
import 'carbon-components/css/carbon-components.min.css'; 


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider> 
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

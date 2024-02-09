import React from "react";
import classNames from "clsx";
import { Nunito_Sans, Caveat } from "next/font/google";
import { ThemeProvider, initialTheme } from "../_hooks/useTheme";
import "./normalize.min.css";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-nunito-sans"
});

const caveat = Caveat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-caveat"
});

type RootLayoutProps = {
  children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({
  children
}) => {
  return (
    <ThemeProvider>
      <html
        lang="en"
        className={`${caveat.variable} ${nunitoSans.variable}`}
      >
        <body className={initialTheme}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
};

export default RootLayout;

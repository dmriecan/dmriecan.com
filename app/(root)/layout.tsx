import React from "react";
import { ThemeProvider, initialTheme } from "../_hooks/useTheme";
import "./normalize.min.css";
import "./globals.css";

type RootLayoutProps = {
  children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({
  children
}) => {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={initialTheme}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
};

export default RootLayout;

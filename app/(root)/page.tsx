"use client"
import React from "react";
import { useTheme, Theme } from "../_hooks/useTheme";

const TestPage: React.FC = () => {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <button onClick={() => setTheme(Theme.dark)}>Dark</button>
      <button onClick={() => setTheme(Theme.light)}>Light</button>
      <button onClick={() => setTheme(Theme.system)}>System</button>
    </>
  );
};

export default TestPage;

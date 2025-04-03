"use client";

import { useEffect, useState } from "react";
import "@/i18n"; // Import the i18n configuration

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by only rendering content after mounting
  useEffect(() => {
    setMounted(true);
    // Remove any extension-added classes during hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body
      className="antialiased"
      suppressHydrationWarning
    >
      {mounted ? children : null}
    </body>
  );
}

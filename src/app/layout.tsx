import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";
import "@/styles/design-system.css";
import "@/styles/features/documents.css";
import "@/styles/responsive.css";

export const metadata: Metadata = {
  title: "Projeto Sem Nome",
  description: "Frontend escalavel com Next.js, React e realtime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

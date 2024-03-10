import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/lib/Providers";


//https://github.com/adrianhajdin/ai_saas_app/blob/main/types/index.d.ts

const IBM_plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: {
    template: '%s | AI Saas',
    default: 'AI Saas',
  },
  icons: {
    icon: "https://www.svgrepo.com/show/327539/sparkles.svg"
  },
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Providers>
          <body className={cn("font-IBMPlex antialiased", IBM_plex.variable)}>
            {children}
          </body>
        </Providers>
      </ThemeProvider>
    </html>
  );
}

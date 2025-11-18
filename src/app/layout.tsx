import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import UserProvider from "@/context/user-context";
import { decrypt, verifySession } from "@/services/statelessSession";
import ProductsProvider from "@/context/products-context";

export const metadata: Metadata = {
  title: "Seller Central",
  description: "Manage your PawsomeMart products and services.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await verifySession()).cookie;
  const session = await decrypt(cookie);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <UserProvider
          session={
            session ? session : { uid: "", expiresAt: new Date(), token: "" }
          }
        >
          <ProductsProvider>
            {children}
            <Toaster />
          </ProductsProvider>
        </UserProvider>
      </body>
    </html>
  );
}

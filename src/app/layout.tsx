import { CurrentSelectedContextProvider } from "@/utils/context/CurrentSelectedContext";
import { LockedNamesContextProvider } from "@/utils/context/LockedNamedContext";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="h-fit w-fit bg-black">
        {
          <CurrentSelectedContextProvider>
            <LockedNamesContextProvider>{children}</LockedNamesContextProvider>
          </CurrentSelectedContextProvider>
        }
      </body>
    </html>
  );
}

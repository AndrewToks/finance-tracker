'use client'
import "./globals.css";
import Nav from '@/components/Navigation'
import FinanceContextProvider from '@/lib/store/finance-context'
// a
export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        // className={poppins.className}
      >
        <FinanceContextProvider>
        <Nav />
        {children}
        </FinanceContextProvider>
    
      </body>
    </html>
  );
}

'use client'
import "./globals.css";
import Nav from '@/components/Navigation'
import FinanceContextProvider from '@/lib/store/finance-context'
// import {Poppins} from '@next/font/google'
// const poppins = Poppins({
//   subsets:['latin'],
//   weight:['400','700']
// })

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

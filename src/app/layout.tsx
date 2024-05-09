import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import StoreProvider from './StoreProvider.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import QueryProviders from '../lib/QueryProvider.tsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Moitda',
  description: 'Moitda : 쉽고 간편하고 빠른 모임 관리 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link
          rel="icon"
          href="https://i.ibb.co/dgzmhY2/Moitda-Logo.png"
          sizes="any"
        />
        <Header />
        <QueryProviders>
          <StoreProvider>{children}</StoreProvider>
        </QueryProviders>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HandyLaw',
  description: 'Generate professional demand letters with strategic content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/aoz8yor.css" />
      </head>
      <body>{children}</body>
    </html>
  );
} 
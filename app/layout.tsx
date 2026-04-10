// app/layout.tsx
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'UGANDA LEGAL AI - Your Legal Awareness Assistant',
  description: 'AI-powered legal information system grounded in Ugandan Constitution and legal framework',
  keywords: 'Uganda, Legal, AI, Constitution, Law, Rights, Legal Advice',
  authors: [{ name: 'Uganda Legal AI' }],
  openGraph: {
    title: 'UGANDA LEGAL AI ASSISTANT',
    description: 'Get accurate legal information about Ugandan law',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1C1C1C',
              color: '#FAF7F0',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#FFCD00',
                secondary: '#1C1C1C',
              },
            },
            error: {
              iconTheme: {
                primary: '#C8102E',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

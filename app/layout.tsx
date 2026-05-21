import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'EduFlow AI - MTs Al-Bashriyah',
  description: 'Smart Classroom Assistant berbasis AI',
  manifest: '/manifest.json', // Untuk PWA
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${poppins.className} bg-[#0F172A] min-h-screen selection:bg-purple-500 selection:text-white`}>
        {children}
      </body>
    </html>
  )
}

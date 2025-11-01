import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
import SEO from '../SEO/SEO'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Header />
      <main className="flex-1 container py-8">{children}</main>
      <Footer />
    </div>
  )
}

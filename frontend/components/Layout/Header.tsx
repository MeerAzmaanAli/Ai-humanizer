import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">AI Humanizer</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  )
}

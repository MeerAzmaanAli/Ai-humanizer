export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} AI Humanizer & Text Scorer
      </div>
    </footer>
  )
}

import { GetStaticPaths, GetStaticProps } from 'next'
import SEO from '../../components/SEO/SEO'
import AdBanner from '../../components/UI/AdBanner'

export default function BlogPost({ title, content }: { title: string; content: string }) {
  return (
    <>
      <SEO title={`${title} — Blog`} />
      <article className="prose dark:prose-invert max-w-none card p-6">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <AdBanner />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [{ params: { slug: 'example-post' } }], fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  // Simple static example
  const content = `<p>This is an example blog post for SEO. Replace with CMS or markdown later.</p>`
  return { props: { title: slug.replace(/-/g, ' '), content } }
}

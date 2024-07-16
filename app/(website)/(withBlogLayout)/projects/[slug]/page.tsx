export default function Page({ params } : { params: { slug: string } }) {
    const { slug } = params;
    return <h1 className="text-4xl">{slug} page</h1>
}
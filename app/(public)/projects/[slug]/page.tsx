export default function Page({ params } : { params: { slug: string } }) {
    const { slug } = params;
    return <h1>{slug} page</h1>
}
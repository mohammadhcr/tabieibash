import { hamsedaDB } from "../data";

export async function GET(_request: Request, {params}: {params: Promise<{slug: string}>}) {

    const { slug } = await params;
    const podcast = hamsedaDB.find(podcast => podcast.slug === slug)

    return Response.json(podcast);
}
import { hamsedaDB } from "./data";

export async function GET() {
    return Response.json(hamsedaDB);
}
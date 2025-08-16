import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {placeName} = await req.json();

    const BASE_URL = 'https://maps.googleapis.com/v1/places:searchText';
    const config = {
      headers: {
        'content-type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY || '',
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
      }
    }

    const result = await fetch(BASE_URL, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        textQuery: placeName
      })
    })

    const data = await result.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

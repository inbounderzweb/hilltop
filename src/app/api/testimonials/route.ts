import { NextResponse } from "next/server";

const PLACE_ID = "ChIJyX2gBcoVrjsR6AEENkVZUgM";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: "Google API Key missing. Please add GOOGLE_PLACES_API_KEY to your environment variables." 
      }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,user_ratings_total,rating&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json({ success: false, error: data.error_message || "Failed to fetch from Google" }, { status: 500 });
    }

    // Format the reviews to match our frontend structure
    const testimonials = data.result.reviews.map((rev: any, index: number) => ({
      id: `gmb-${index}`,
      name: rev.author_name,
      text: rev.text,
      stars: rev.rating,
      avatar: rev.profile_photo_url,
      time: rev.relative_time_description,
      source: "Google"
    }));

    return NextResponse.json({
      success: true,
      testimonials,
      overallRating: data.result.rating,
      totalReviews: data.result.user_ratings_total
    });

  } catch (error: any) {
    console.error("GMB Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

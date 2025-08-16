// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API,
// });

// const PROMPT = `
// You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
// Only ask questions about the following details in order, and wait for the user's answer before asking the next:

// Starting location (source)

// Destination city or country

// Group size (Solo, Couple, Family, Friends)

// Budget (Low, Medium, High)

// Trip duration (number of days)

// Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)

// Special requirements or preferences (if any)

// Do not ask multiple questions at once, and never ask irrelevant questions.
// If any answer is missing or unclear, politely ask the user to clarify before proceeding.
// Always maintain a conversational, interactive style while asking questions.

// Along with response also send which ui component to display for generative UI for example budget/groupSize/TripDuration/Final, where Final means AI generating complete final output
// Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
// {
// resp: 'Text Resp',
// ui: 'budget/groupSize/TripDuration/Final'
// }
// `

// const FINAL_PROMPT = `Generate a compact travel plan JSON. Use short descriptions, abbreviate addresses, use realistic IDR prices.

// {
//   "trip_plan": {
//     "destination": "string",
//     "duration": "string",
//     "origin": "string", 
//     "budget": "string",
//     "group_size": "string",
//     "hotels": [
//       {
//         "hotel_name": "string",
//         "hotel_address": "short address",
//         "price_per_night": "IDR amount",
//         "hotel_image_url": "https://via.placeholder.com/300x200",
//         "geo_coordinates": {"latitude": 0, "longitude": 0},
//         "rating": 0,
//         "description": "max 50 words"
//       }
//     ],
//     "itinerary": [
//       {
//         "day": 0,
//         "day_plan": "brief plan max 30 words",
//         "activities": [
//           {
//             "place_name": "string",
//             "place_details": "max 40 words",
//             "place_image_url": "https://via.placeholder.com/300x200",
//             "geo_coordinates": {"latitude": 0, "longitude": 0},
//             "place_address": "short address",
//             "ticket_pricing": "IDR amount or Free",
//             "time_travel_each_location": "X hours",
//             "best_time_to_visit": "time range"
//           }
//         ]
//       }
//     ]
//   }
// }

// Limit: 2 hotels max, 2-3 activities per day, keep all text concise.`

// export async function POST(req:NextRequest) {
//   try {
//     const {messages, isFinal} = await req.json();

//     const completion = await openai.chat.completions.create({
//       model: 'google/gemini-2.5-flash',
//       response_format: {type: "json_object"},
//       messages: [
//         {
//           role: 'system',
//           content: isFinal ? FINAL_PROMPT : PROMPT,
//         },
//         ...messages
//       ],
//       max_tokens: 500, // Optimized tokens
//     });
    
//     const message = completion.choices[0].message;
//     return NextResponse.json(JSON.parse(message.content ?? ""));

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({error}, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { Ollama } from 'ollama';
import { searchImages } from '@/utils/duckduckgoSearch';
import { auth, currentUser } from "@clerk/nextjs/server";
import { aj } from "../arcjet/route";

const ollama = new Ollama({ 
  host: 'http://localhost:11434' 
});

const PROMPT = `You are a Trip Planner. You need to collect trip information step by step.

Based on the conversation history, ask the NEXT appropriate question:

1. If no starting location → ask for starting location (ui: "source")
2. If have starting location but no destination → ask for destination (ui: "destination")  
3. If have destination but no group size → ask for group size (ui: "groupSize")
4. If have group size but no budget → ask for budget (ui: "budget")
5. If have budget but no duration → ask for trip duration (ui: "TripDuration")
6. If have duration but no interests → ask for travel interests (ui: "interests")
7. If have ALL info → set ui: "Final"

ANALYZE the conversation history first, then ask the NEXT missing question.

Response format:
{
  "resp": "Your question here",
  "ui": "appropriate_component"
}

IMPORTANT: Read the conversation carefully to know what has been answered already.`;

const FINAL_PROMPT = `Create a travel plan JSON using the collected information.

OUTPUT ONLY THIS EXACT STRUCTURE:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string", 
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "IDR amount",
        "hotel_image_url": "PLACEHOLDER_HOTEL_IMAGE",
        "geo_coordinates": {"latitude": 0, "longitude": 0},
        "rating": 0,
        "description": "short description"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "day_plan": "brief plan",
        "activities": [
          {
            "place_name": "string",
            "place_details": "description",
            "place_image_url": "PLACEHOLDER_PLACE_IMAGE",
            "geo_coordinates": {"latitude": 0, "longitude": 0},
            "place_address": "address",
            "ticket_pricing": "IDR amount or Free",
            "time_travel_each_location": "X hours",
            "best_time_to_visit": "time"
          }
        ]
      }
    ]
  }
}

Limit: 2 hotels, 2-3 activities per day.`;

// Function to fetch real images for hotels and places
async function enrichWithRealImages(tripPlan: any) {
  try {
    // Get hotel images
    if (tripPlan.hotels) {
      for (const hotel of tripPlan.hotels) {
        if (hotel.hotel_image_url === "PLACEHOLDER_HOTEL_IMAGE") {
          const imageQuery = `${hotel.hotel_name} ${tripPlan.destination} hotel`;
          const imageUrl = await searchImages(imageQuery);
          hotel.hotel_image_url = imageUrl;
          console.log(`Found hotel image for ${hotel.hotel_name}: ${imageUrl}`);
        }
      }
    }

    // Get place images
    if (tripPlan.itinerary) {
      for (const day of tripPlan.itinerary) {
        if (day.activities) {
          for (const activity of day.activities) {
            if (activity.place_image_url === "PLACEHOLDER_PLACE_IMAGE") {
              const imageQuery = `${activity.place_name} ${tripPlan.destination}`;
              const imageUrl = await searchImages(imageQuery);
              activity.place_image_url = imageUrl;
              console.log(`Found place image for ${activity.place_name}: ${imageUrl}`);
            }
          }
        }
      }
    }

    return tripPlan;
  } catch (error) {
    console.error('Error enriching with images:', error);
    return tripPlan;
  }
}

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const {has} = await auth()
  const user = await currentUser();
  const hasPremiumAccess = has({plan: 'monthly'})
  const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress || "", requested: isFinal ? 5 : 0});

  console.log(decision)

  const isRateLimited = decision.conclusion === 'DENY' || 
    (decision.reason && decision.reason.type === 'RATE_LIMIT' && (decision.reason as any).remaining === 0);
  
  if(isRateLimited && !hasPremiumAccess) {
    return NextResponse.json({
      resp: "No Free Credit Remaining",
      ui: 'limit'
    })
  }

  try {

    console.log('Conversation history:', messages);

    const conversation = [
      {
        role: 'system',
        content: isFinal ? FINAL_PROMPT : PROMPT,
      },
      ...messages
    ];

    const response = await ollama.chat({
      model: 'qwen2.5:7b',
      messages: conversation,
      stream: false,
      format: 'json',
      options: {
        temperature: 0.3,
        top_k: 40,
        top_p: 0.9,
        repeat_penalty: 1.1,
        num_ctx: 4096,
        num_predict: isFinal ? 1500 : 150,
      }
    });

    const content = response.message?.content || '';
    console.log('Ollama response:', content);

    try {
      const jsonResponse = JSON.parse(content);
      
      // For final response, enrich with real images
      if (isFinal && jsonResponse.trip_plan) {
        console.log('Enriching trip plan with real images...');
        const enrichedTripPlan = await enrichWithRealImages(jsonResponse.trip_plan);
        return NextResponse.json({ trip_plan: enrichedTripPlan });
      }
      
      // Validate response structure for regular chat
      if (!isFinal) {
        if (!jsonResponse.resp || !jsonResponse.ui) {
          console.log('Invalid structure, providing fallback...');
          return NextResponse.json({
            resp: "Let me help you plan your trip. What is your starting location?",
            ui: "source"
          });
        }
      }
      
      return NextResponse.json(jsonResponse);
      
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      
      if (!isFinal) {
        return NextResponse.json({
          resp: "Let me help you plan your trip. What is your starting location?",
          ui: "source"
        });
      } else {
        return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Ollama API Error:', error);
    return NextResponse.json({ error: 'Failed to connect to Ollama' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API,
});

const PROMPT = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:

Starting location (source)

Destination city or country

Group size (Solo, Couple, Family, Friends)

Budget (Low, Medium, High)

Trip duration (number of days)

Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)

Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with response also send which ui component to display for generative UI for example budget/groupSize/TripDuration/Final, where Final means AI generating complete final output
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:
{
resp: 'Text Resp',
ui: 'budget/groupSize/TripDuration/Final'
}
`

export async function POST(req:NextRequest) {
  try {
    const messages = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        ...messages
      ],
      max_tokens: 500,
    });
    console.log(completion.choices[0].message);

    const message = completion.choices[0].message;
    const content = message?.content ?? '';

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const fixedJson = jsonMatch[0]
          .replace(/(\w+)\s*:/g, '"$1":'); // resp -> "resp":
        
        const parsed = JSON.parse(fixedJson);
        return NextResponse.json(parsed);
      } catch (parseError) {
        console.log('JSON parsing failed, trying text format...');
      }
    }

    const match = content.match(/ui:\s*'([^']+)'/);
    let ui = null;
    if (match) {
      ui = match[1];
    }

    const resp = content.replace(/\{\s*ui:\s*'[^']+'\s*\}/, '').trim();
    
    return NextResponse.json({
      resp: resp,
      ui: ui
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
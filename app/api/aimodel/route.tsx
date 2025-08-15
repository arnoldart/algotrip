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
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        ...messages
      ],
      max_tokens: 300,
    });
    console.log(completion.choices[0].message);

    const message = completion.choices[0].message;

    // The model is instructed to return strict JSON, but sometimes it returns plain text
    // or wraps JSON in code fences. Try to recover JSON robustly, otherwise return
    // a fallback object containing the raw text and an 'unknown' ui tag.
    const raw = message.content ?? '';

    const tryParse = (text: string) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return null;
      }
    };

    // Remove common code-fence wrappers (```json ... ``` or ``` ... ```)
    let cleaned = raw.replace(/```\s*json\s*/i, '').replace(/```/g, '').trim();

    // First try parsing cleaned content directly
    let parsed = tryParse(cleaned);

    // If that fails, try to extract the first {...} block and parse it
    if (!parsed) {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = tryParse(match[0]);
      }
    }

    // Final fallback: return the raw text as the 'resp' and ui as 'unknown'
    if (!parsed) {
      console.warn('AI response was not valid JSON, returning fallback object. Raw:', raw);
      return NextResponse.json({ resp: raw, ui: 'unknown' });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error}, { status: 500 });
  }
}
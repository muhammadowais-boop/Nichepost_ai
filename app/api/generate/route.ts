import { NextRequest, NextResponse } from "next/server";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PLATFORM_GUIDANCE: Record<string, string> = {
  Instagram: "Visual-first captions (150–220 chars of punchy copy before 'more'), storytelling hooks, emoji-friendly, ends with a soft CTA. 8–12 niche hashtags.",
  LinkedIn: "Professional insight or personal story (200–300 words), structured with line breaks, thought leadership angle, ends with a question to drive comments. 3–5 industry hashtags.",
  Twitter: "Punchy, under 280 characters. Conversational, opinionated, or a hot take. 2–4 hashtags maximum.",
  Facebook: "Conversational and community-focused (100–250 words), mix of storytelling and value, encourages shares and comments, emoji-friendly, ends with an engaging question. 3–6 relevant hashtags.",
};

const TONE_GUIDANCE: Record<string, string> = {
  Professional: "Authoritative, data-driven, polished. Avoid slang.",
  Casual: "Friendly, first-person, like texting a friend. Light use of contractions and relatable language.",
  Humorous: "Witty, self-aware, uses wordplay or light sarcasm. Still on-brand but makes readers smile.",
};

export async function POST(req: NextRequest) {
  const { niche, platform, tone } = await req.json();

  if (!niche || !platform || !tone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const systemPrompt = `You are an expert social media content strategist. Generate a 7-day content calendar as valid JSON.

Platform guidelines for ${platform}: ${PLATFORM_GUIDANCE[platform]}
Tone: ${TONE_GUIDANCE[tone]}

Each post must be unique in angle — vary between: tips, storytelling, engagement questions, motivational, behind-the-scenes, myth-busting, and calls-to-action.

Return ONLY a JSON object in this exact shape, with no markdown fences or extra text:
{
  "posts": [
    {
      "day": "Monday",
      "copy": "...",
      "hashtags": ["#tag1", "#tag2"]
    }
  ]
}`;

  const userPrompt = `Create a 7-day ${platform} content calendar for the niche: "${niche}".
Tone: ${tone}.
Cover all 7 days: ${DAYS.join(", ")}.`;

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-3",
        max_tokens: 4096,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt   },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Grok API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    // Strip any accidental markdown fences
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.posts) || parsed.posts.length !== 7) {
      throw new Error("Unexpected response shape from Grok");
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    console.error("Generate error:", err);
    const message = err instanceof Error ? err.message : "Content generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

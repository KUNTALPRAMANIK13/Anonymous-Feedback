import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure this route is always dynamic and never cached by Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type RequestBody = {
  count?: number;
  exclude?: string[];
  topic?: string;
  tone?: string;
  language?: string; // e.g., 'en'
};

// Simple curated fallback pool to guarantee variety when AI repeats
const FALLBACK_POOL: string[] = [
  "What's a small habit that improved your day-to-day life?",
  "If you could master any musical instrument overnight, which would it be and why?",
  "What's a movie you can watch over and over without getting bored?",
  "What's a food combo you love that others find odd?",
  "If time and money weren't an issue, what project would you start tomorrow?",
  "What's a book that genuinely changed how you think?",
  "What's a simple pleasure you look forward to each week?",
  "What's something you learned recently that surprised you?",
  "If you could instantly speak another language, which would you choose and why?",
  "What's a skill you think everyone should learn at least once?",
  "What's a childhood snack you secretly still crave?",
  "What's your favorite way to unwind after a long day?",
  "Which fictional world would you live in for a week?",
  "What's a goal you're excited about this year?",
  "What's a song lyric that sticks with you?",
  "What's an unpopular opinion you stand by (lighthearted)?",
  "If you could relive one day just for the joy of it, which day would you pick?",
  "What's your go-to conversation starter?",
  "What's a random fact you think more people should know?",
  "What's a small act of kindness you won't forget?",
  "If you had to teach a 10‑minute class on anything, what would it be?",
  "What's your current comfort show or podcast?",
  "What's a trend you secretly miss?",
  "What's a place that surprised you—in a good way?",
  "What's a life tip you wish more people knew?",
  "What's your favorite way to get creative?",
  "What's the best advice you've actually used?",
  "What hobby would you pick up if you had an extra hour every day?",
  "What's a tiny change that had a big impact?",
  "What's something you wish more people asked you about?",
];

function normalizeQuestion(q: string): string {
  // Trim, remove surrounding quotes, compress spaces
  let s = (q || "").replace(/^[-•\d.)\s]+/, "").trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1);
  }
  // Ensure single spaces
  s = s.replace(/\s+/g, " ").trim();
  // Remove trailing separators
  s = s.replace(/[|]+$/g, "").trim();
  return s;
}

function uniqCaseInsensitive(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const it of items) {
    const key = it.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }
  return out;
}

function filterExcluded(items: string[], exclude: string[]): string[] {
  if (!exclude?.length) return items;
  const ex = new Set(exclude.map((e) => e.toLowerCase().trim()));
  return items.filter((s) => !ex.has(s.toLowerCase().trim()));
}

function randomInt() {
  return Math.floor(Math.random() * 1_000_000_000);
}

export async function POST(req: Request) {
  try {
    console.log("Suggest messages API called");

    // Check if API key is available
    if (!process.env['GOOGLE_GENERATIVE_AI_API_KEY']) {
      console.error("Missing GOOGLE_GENERATIVE_AI_API_KEY");
      return NextResponse.json(
        {
          success: false,
          message:
            "Google AI API key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    console.log("Initializing Google Generative AI...");
    const genAI = new GoogleGenerativeAI(
      process.env['GOOGLE_GENERATIVE_AI_API_KEY']
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Parse request body (optional)
    let body: RequestBody = {};
    try {
      body = (await req.json()) as RequestBody;
    } catch {
      // no body provided
    }
    const count = Math.max(1, Math.min(10, body.count ?? 3));
    const exclude = Array.isArray(body.exclude) ? body.exclude : [];
    const topic = body.topic?.toString().trim();
    const tone = body.tone?.toString().trim();
    const language = body.language?.toString().trim();

    const seed = randomInt();
    const prompt = `You are generating fresh, diverse, open-ended questions for a friendly anonymous social messaging app.

Requirements:
- Return exactly ${count} questions.
- MUST be formatted as a SINGLE line string using '||' as the ONLY separator. No numbering, no dashes, no quotes.
- Keep them inclusive, non-sensitive, and suitable for a wide audience.
- Vary topics (e.g., hobbies, memories, creativity, travel, daily life, light introspection). Aim for diversity across the set.
- Avoid repeating questions from the Exclude list, and avoid closely paraphrasing them.
${topic ? `- Prefer a subtle theme around: ${topic}.\n` : ""}${tone ? `- Suggested tone: ${tone}.\n` : ""
      }${language ? `- Language: ${language}.\n` : ""}
Exclude (do not use or closely paraphrase): ${exclude.length ? exclude.join(" | ") : "(none)"
      }

Randomization key: ${seed}

Example format (do NOT copy these, just follow the format): What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?`;

    console.log("Generating content with Gemini...");
    const generationConfig = {
      temperature: 1.1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 256,
    } as const;
    const makeCall = async (p: string) => {
      const res = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: p }] }],
        generationConfig,
      });
      return res.response?.text?.() ?? "";
    };

    let text = await makeCall(prompt);

    console.log("Generated text:", text);

    // Parse suggestions (prefer '||', but fall back to line/bullet splits)
    let suggestions = (
      text.includes("||") ? text.split("||") : text.split(/\r?\n|•|\d+\.|- /)
    )
      .map(normalizeQuestion)
      .filter(Boolean);

    suggestions = uniqCaseInsensitive(suggestions);
    suggestions = filterExcluded(suggestions, exclude);

    // If not enough, try one more variation call with a different seed
    if (suggestions.length < count) {
      const seed2 = randomInt();
      const prompt2 = prompt.replace(
        /Randomization key: \d+/,
        `Randomization key: ${seed2}`
      );
      const text2 = await makeCall(prompt2);
      const extra = (
        text2.includes("||")
          ? text2.split("||")
          : text2.split(/\r?\n|•|\d+\.|- /)
      )
        .map(normalizeQuestion)
        .filter(Boolean);
      suggestions = uniqCaseInsensitive([...suggestions, ...extra]);
      suggestions = filterExcluded(suggestions, exclude);
    }

    // Fill from fallback pool if still short
    if (suggestions.length < count) {
      const remaining = FALLBACK_POOL.filter(
        (q) =>
          !exclude.includes(q) &&
          !suggestions.map((s) => s.toLowerCase()).includes(q.toLowerCase())
      );
      // Shuffle fallback a little
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = remaining[i]!;
        remaining[i] = remaining[j]!;
        remaining[j] = temp;
      }
      suggestions = [
        ...suggestions,
        ...remaining.slice(0, count - suggestions.length),
      ];
    }

    // Final trim to requested count
    suggestions = suggestions.slice(0, count);

    console.log("Processed suggestions:", suggestions);

    if (suggestions.length === 0) {
      throw new Error("No suggestions generated from AI response");
    }

    return NextResponse.json(
      { success: true, suggestions },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error("Error in suggest-messages API:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message ?? "Failed to generate suggestions",
        error:
          process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

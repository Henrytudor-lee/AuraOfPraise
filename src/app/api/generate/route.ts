import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type StyleType = "ancient" | "romantic" | "devotion" | "article" | "minimal";

// Rate limiting: store IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 requests
const RATE_LIMIT_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: Date } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record or expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_PERIOD });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetTime: new Date(now + RATE_LIMIT_PERIOD) };
  }

  // If under limit, increment
  if (record.count < RATE_LIMIT) {
    record.count++;
    return { allowed: true, remaining: RATE_LIMIT - record.count, resetTime: new Date(record.resetTime) };
  }

  // Rate limit exceeded
  return { allowed: false, remaining: 0, resetTime: new Date(record.resetTime) };
}

const stylePrompts: Record<StyleType, string> = {
  ancient: `You are a master poet specializing in classical Chinese Tang and Song dynasty poetry. First, analyze the image carefully:
- If there is a person in the image: praise the person, focusing on their most attractive features. If the person is female, emphasize her facial beauty, hairstyle, elegant demeanor, clothing, and overall feminine charm. If male, focus on his distinctive features and masculine charm.
- If there is no person: praise the scenic beauty, atmosphere, composition, and aesthetic elements of the image.
Write elegant, concise verses (4-7 lines) in classical Chinese poetry style. Use imagery inspired by mountains, moonlight, flowers, mist. Be poetic and profound. Respond ONLY with the poem, nothing else.`,
  romantic: `You are a Victorian-era romantic poet. First, analyze the image carefully:
- If there is a person in the image: praise the person with heartfelt admiration, focusing on their most captivating qualities. If female, emphasize her facial elegance, graceful hairstyle, refined clothing, and feminine allure that touches the heart. If male, focus on his distinctive charm and presence.
- If there is no person: praise the romantic atmosphere, scenic beauty, and emotional resonance of the image.
Write flowing, elegant prose in the style of romantic poets like Keats or Shelley. Create a single paragraph of heartfelt praise (2-4 sentences). Be passionate yet refined. Respond ONLY with the paragraph, nothing else.`,
  devotion: `You are a devoted admirer who expresses unconditional love and admiration. First, analyze the image carefully:
- If there is a person in the image: direct your passionate praise toward them. If female, celebrate her beauty, radiant smile, beautiful features, lovely hairstyle, charming outfit, and everything that makes her enchanting. If male, celebrate his unique attractiveness and appeal.
- If there is no person: express your admiration for the beautiful scenery or scene.
Write a playful, hyperbolic, deeply affectionate expression of devotion (2-3 sentences). Be dramatic, sweet, and slightly over-the-top in a charming way. Respond ONLY with the expression, nothing else.`,
  article: `You are an editorial writer for a prestigious lifestyle magazine. First, analyze the image carefully:
- If there is a person in the image: provide a detailed narrative exploration focusing on the person. If female, examine her facial features, hairstyle, clothing style, accessories, and overall feminine elegance. Capture her essence and the emotion she conveys. If male, focus on his distinctive features, demeanor, and personal style.
- If there is no person: examine the scenic beauty, composition, lighting, color palette, and emotional atmosphere of the image.
Write a detailed, narrative exploration (3-4 paragraphs) that examines every beautiful detail. Be insightful and eloquent. Respond ONLY with the narrative, nothing else.`,
  minimal: `You are a modern minimalist copywriter. First, analyze the image briefly:
- If there is a person in the image: identify their most striking feature. If female, it could be her radiant beauty, elegant style, or captivating presence. If male, his distinctive charm or presence.
- If there is no person: focus on the most impactful visual element or atmosphere.
Write a short, punchy, impactful statement (1-2 sentences max). Think modern advertising meets haiku - powerful but brief. Respond ONLY with the statement, nothing else.`,
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    // Add rate limit headers
    const headers = new Headers();
    headers.set("X-RateLimit-Limit", RATE_LIMIT.toString());
    headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString());
    headers.set("X-RateLimit-Reset", rateLimitResult.resetTime.toISOString());

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `您今天的生成次数已用完。每天可生成 ${RATE_LIMIT} 次。明天 ${rateLimitResult.resetTime.toLocaleTimeString()} 重置。`,
          resetTime: rateLimitResult.resetTime.toISOString(),
        },
        { status: 429, headers }
      );
    }

    const body = await request.json();
    const { image, style } = body as { image: string; style: StyleType };

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing image or style" },
        { status: 400, headers }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      // Return a fallback praise if no API key is configured
      const fallbackPraises: Record<StyleType, string> = {
        ancient: "月华如练，清辉满地。此影此景，动人心弦。",
        romantic:
          "There is a light you carry that doesn't just illuminate the room—it ignites the spirit of everyone within it. Like golden hour captured in a single smile.",
        devotion:
          "You are absolutely breathtaking! Every angle, every moment, every single detail about you is perfection itself! I'm completely enchanted!",
        article:
          "The interplay of light and shadow in this composition creates a dance of visual poetry. The subject's essence shines through with an authenticity that speaks directly to the soul, reminding us why certain moments deserve to be frozen in time.",
        minimal: "Pure radiance. Timeless beauty.",
      };

      return NextResponse.json({ praise: fallbackPraises[style] }, { headers });
    }

    const prompt = stylePrompts[style];

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // Build the messages for Qwen
    const messages: any[] = [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ];

    // Call Qwen API via OpenAI compatible interface
    const response = await openai.chat.completions.create({
      model: "qwen-vl-plus", // Vision model that supports image input
      messages: messages,
      max_tokens: 500,
    });

    const praise = response.choices[0]?.message?.content;

    if (!praise) {
      console.error("Qwen response:", JSON.stringify(response, null, 2));
      return NextResponse.json(
        { error: "No praise generated" },
        { status: 500, headers }
      );
    }

    return NextResponse.json({ praise: praise.trim(), remaining: rateLimitResult.remaining }, { headers });
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate praise", details: message },
      { status: 500 }
    );
  }
}

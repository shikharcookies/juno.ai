import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();

    console.log('➡️ Prompt:', prompt);
    console.log('➡️ Model:', model);
    console.log('➡️ API Key:', process.env.OPENROUTER_API_KEY?.slice(0, 8) + '...');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ OpenRouter Error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices?.[0]?.message?.content });
  } catch (err: any) {
    console.error('❌ Route Error:', err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

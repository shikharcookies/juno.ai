export async function getOpenRouterResponse({
  prompt,
  model = 'openai/gpt-3.5-turbo',
}: {
  prompt: string;
  model?: string;
}) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter Error: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response';
}

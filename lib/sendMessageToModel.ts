// lib/sendMessageToModel.ts

export async function sendMessageToModel(prompt: string, model: string) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model, // e.g., "openai/gpt-4o"
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

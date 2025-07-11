// /lib/chat.ts or /utils/openrouter.ts

export async function sendMessageToOpenRouter({
  prompt,
  model = "openai/gpt-3.5-turbo",
}: {
  prompt: string;
  model?: string;
}) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("OpenRouter error: " + error);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response";
}

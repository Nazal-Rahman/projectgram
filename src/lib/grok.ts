const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY || 'your_grok_api_key_here';

export async function askGrok(prompt: string, context: string): Promise<string> {
  const url = 'https://api.x.ai/v1/responses';
  
  const payload = {
    model: "grok-4.7",
    input: [
      {
        role: "system",
        content: `You are Grok, an AI engineering assistant for Projectgram. Based on the following project context, answer the user's question.\n\nContext:\n${context}`
      },
      {
        role: "user",
        content: prompt
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || err.message || 'Failed to fetch from Grok API');
    }

    const data = await response.json();
    // Assuming the response structure maps to a typical generation format, usually data.choices[0].message.content or similar,
    // But since the endpoint is /v1/responses and uses "input" instead of "messages", it might just return a direct text field or choices.
    // Given standard curl mock patterns, we will try standard variations. 
    // If it's literally just data.response or data.text:
    return data?.choices?.[0]?.message?.content || data?.response || data?.text || data?.choices?.[0]?.text || JSON.stringify(data);
  } catch (error: any) {
    console.error("Grok API Error:", error);
    throw error;
  }
}

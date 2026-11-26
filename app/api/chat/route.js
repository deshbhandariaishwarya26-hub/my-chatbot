
export async function POST(request) {
  try {
    const { message } = await request.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          max_completion_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Groq API error" },
        { status: response.status }
      );
    }

    return Response.json({
      reply: data.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    // ここを gpt-3.5-turbo から gpt-4o に変更
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

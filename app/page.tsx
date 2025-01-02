'use client'

import { useState } from 'react'
import DynamicForm from '../components/DynamicForm'
import PromptInput from '../components/PromptInput'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [finalPrompt, setFinalPrompt] = useState('')

  const handleSubmit = async () => {
    const combinedPrompt = Object.entries(formData).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      prompt
    )
    setFinalPrompt(combinedPrompt)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: combinedPrompt }),
    })

    if (res.ok) {
      const data = await res.json()
      setResponse(data.response)
    } else {
      setResponse('エラーが発生しました。もう一度お試しください。')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">プロンプトエンジニアリングアプリ</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>動的フォーム</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicForm onFormDataChange={setFormData} />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>プロンプト入力</CardTitle>
        </CardHeader>
        <CardContent>
          <PromptInput onPromptChange={setPrompt} />
          <p className="text-sm text-muted-foreground mt-2">
            ※ 改行を含む長文でもOK
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleSubmit} className="mb-4">送信</Button>

      {/* 送信した最終的なプロンプトを表示 (改行を反映して表示する) */}
      {finalPrompt && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>実際に送信したプロンプト</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{finalPrompt}</pre>
          </CardContent>
        </Card>
      )}

      {/* 応答表示 (同様に改行反映したい場合はwhitespace-pre-wrap推奨) */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle>応答</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{response}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

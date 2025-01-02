import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface PromptInputProps {
  onPromptChange: (prompt: string) => void
}

export default function PromptInput({ onPromptChange }: PromptInputProps) {
  return (
    <div>
      <Label htmlFor="prompt">プロンプト</Label>
      <Textarea
        id="prompt"
        placeholder="プロンプトを入力してください。フィールド名を {fieldName} の形式で挿入できます。"
        onChange={(e) => onPromptChange(e.target.value)}
        className="h-32"
      />
    </div>
  )
}


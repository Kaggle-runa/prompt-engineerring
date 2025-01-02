import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DynamicFormProps {
  onFormDataChange: (data: Record<string, string>) => void
}

export default function DynamicForm({ onFormDataChange }: DynamicFormProps) {
  const [fields, setFields] = useState<string[]>([])
  const [formData, setFormData] = useState<Record<string, string>>({})

  const addField = () => {
    setFields([...fields, ''])
  }

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields]
    newFields[index] = value
    setFields(newFields)
  }

  const handleValueChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    onFormDataChange(newFormData)
  }

  const removeField = useCallback((index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    const newFormData = { ...formData };
    delete newFormData[fields[index]];
    setFormData(newFormData);
    onFormDataChange(newFormData);
  }, [fields, formData, onFormDataChange]);

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <Label htmlFor={`field-${index}`}>フィールド名</Label>
          <div className="flex items-center mb-2">
            <Input
              id={`field-${index}`}
              value={field}
              onChange={(e) => handleFieldChange(index, e.target.value)}
              className="flex-grow mr-2"
            />
            <Button variant="destructive" onClick={() => removeField(index)}>削除</Button>
          </div>
          <Label htmlFor={`value-${index}`}>値</Label>
          <Input
            id={`value-${index}`}
            onChange={(e) => handleValueChange(field, e.target.value)}
          />
        </div>
      ))}
      <Button onClick={addField}>フィールドを追加</Button>
    </div>
  )
}


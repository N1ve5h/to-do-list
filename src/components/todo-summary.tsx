import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TodoSummaryProps {
  total: number
  completed: number
}

export function TodoSummary({ total, completed }: TodoSummaryProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>To do Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{percentage}%</div>
        <p className="text-xs text-muted-foreground">
          {completed} of {total} tasks completed
        </p>
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
import { useState } from 'react'
import { Trash2, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

interface TodoItemProps {
    id: string
    text: string
    completed: boolean
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
    const [isHovered, setIsHovered] = useState(false)
  
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center space-x-2 p-4 rounded-lg ${
          completed ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
        } shadow-sm hover:shadow-md transition-shadow duration-200`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Checkbox
          id={id}
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="border-2"
        />
        <div className="flex-grow">
          <label
            htmlFor={id}
            className={`text-lg ${completed ? 'line-through decoration-2 text-gray-500' : ''}`}
          >
            {text}
          </label>
        </div>
        {completed && (
          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }
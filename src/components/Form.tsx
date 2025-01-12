import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form as FormElement } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  Todo: z.string().min(3, {
    message: "To do must be at least 3 characters.",
  })
  .max(20, {message: "To do must be at no more than 20 characters."}),
  isDeadline: z.boolean().default(false).optional()
})

export default function Form({onAdd}) {
  const formData = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Todo: "",
      isDeadline: false
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    onAdd({ text: values.Todo, completed: false, deadline: values.isDeadline })
    formData.reset()
  }

  return (
    <FormElement {...formData}>
      <form onSubmit={formData.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-4 rounded-md p-4'>
        <FormField
          control={formData.control}
          name="Todo"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormLabel>To do</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formData.control}
          name="isDeadline"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="leading-none">
                <FormLabel>
                  Set a deadline
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormElement>
  )
}
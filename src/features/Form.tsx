import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form as FormElement } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  Todo: z.string().min(3, {
    message: "To do must be at least 3 characters.",
  })
  .max(20, {message: "To do must be at no more than 20 characters."}),
  isDeadline: z.boolean()
})
 
export default function Form({add}) {
  const formData = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Todo: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    add({ text: values.Todo, completed: false })
    formData.resetField("Todo")
  }

  return (
    <FormElement {...formData}>
      <form onSubmit={formData.handleSubmit(onSubmit)} className='w-11/12 flex flex-col justify-around items-start gap-4'>
        <FormField
          control={formData.control}
          name="Todo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>To do</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter your task
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formData.control}
          name="isDeadline"
          render={({ field }) => (
            <FormItem className="w-1/3 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
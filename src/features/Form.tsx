import { Button } from "@/components/ui/button"
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
      <form onSubmit={formData.handleSubmit(onSubmit)} className='flex flex-row justify-around items-center'>
        <FormField
          control={formData.control}
          name="Todo"
          render={({ field }) => (
            <FormItem className="w-2/3">
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
        <Button type="submit">Submit</Button>
      </form>
    </FormElement>
  )
}
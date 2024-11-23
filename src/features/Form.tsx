import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

interface FormInputs {
    Text: string
}

const formSchema = z.object({
    todo: z.string().min(2).max(50)
})

export default function Form({add}) {
    const { register, handleSubmit } = useForm<FormInputs>()

    const onSubmitFunction: SubmitHandler<FormInputs> = (data) => {        
        add({ text: data.Text, completed: false })
      }

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} className='flex gap-10 justify-center'>
            <Input {...register("Text")} className='w-2/3 md:w-1/4 rounded-md border-solid border-2 border-black p-1' type="text" placeholder="Add a new todo" required/>
            <Button type='submit'>Submit</Button>
        </form>
    )
}
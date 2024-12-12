'use client'
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField, Form, FormItem, FormControl, Input, FormMessage, Button, Separator } from '@repo/ui'
import { createPowersSchema, CreatePowersSchemaType } from './schema'
import { powerData } from './powerData'
import { toast } from 'sonner'

const FormMultisig = () => {
  const form = useForm<CreatePowersSchemaType>({
    resolver: zodResolver(createPowersSchema()),
    defaultValues: {
      powers: powerData,
    },
  })
  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'powers',
  })
  function onSubmit(values: CreatePowersSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast.success('Submit successed!')
  }
  const addPower = () => {
    const currentValues = form.getValues('powers')

    // Check if all current fields are valid
    const isValid = currentValues.every((item) => item.addressOwner.trim() !== '' && item.vote.trim() !== '')

    if (isValid) {
      append({ addressOwner: '', vote: '' })
    } else {
      form.trigger() // Trigger validation to highlight errors
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-textTitle text-2xl">Owners and Vote Power</h2>
      <div className="flex justify-between text-sm">
        <p>Wallet Address or OneID(ERC20)</p>
        <p>Vote Power</p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          {fields.map((field, index) => (
            <div className="flex gap-x-2" key={field.id}>
              {/* Address Owner Field */}
              <FormField
                control={form.control}
                name={`powers.${index}.addressOwner`}
                render={({ field }) => (
                  <FormItem className="flex-1 bg-backgroundInput py-2 rounded-lg">
                    <FormControl>
                      <Input placeholder="Enter your wallet address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Vote Field */}
              <FormField
                control={form.control}
                name={`powers.${index}.vote`}
                render={({ field }) => (
                  <FormItem className="w-20 bg-backgroundInput rounded-lg">
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="flex justify-between">
            <Button type="button" onClick={addPower}>
              Add
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormMultisig

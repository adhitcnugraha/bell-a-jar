// implement the application logic
'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

export const createAssistant = async (formData: CreateAssistant) => {
    // define the userId
    const {userId: author} = await auth()
    // import supabase.ts func
    const supabase = createSupabaseClient()
    // insert a new record into a Supabase
    const {data, error} = await supabase.from('assistants').insert( {...formData, author} ).select()
    // conditional error
    if ( error || !data) throw new Error(error?.message || "Failed to create an assistant")
    // return the data
    return data[0]
}
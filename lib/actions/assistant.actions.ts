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

// fetching all assistants & pagination
export const getAllAssistants = async ({limit = 10, page = 1, subject, topic}: GetAllAssistants) => {
     // import supabase.ts func
    const supabase = createSupabaseClient()
     // make the query
    let query = supabase.from('assistants').select()
    // query conditional statement
    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    // pagination logic
    query = query.range(( page - 1 ) * limit, page * limit - 1)
    // fetch the database
    const {data: assistants, error} = await query
    // conditional error
    if (error) throw new Error(error.message)
    // return the value
    return assistants;
}

// fetching one assistant
export const getAssistant = async (id: string) => {
    const supabase = createSupabaseClient()

    const {data, error} = await supabase
    .from('assistants')
    .select()
    .eq('id', id)

    if (error) return console.log(error)
    return data[0]
}
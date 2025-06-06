// implement the application logic
'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"
import { revalidatePath } from "next/cache"

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

export const addToSessionHistory = async (assistantId: string) => {
    const {userId} = await auth()
    const supabase = createSupabaseClient()
    const {data, error} = await supabase
    .from('session_history')
    .insert({assistant_id: assistantId, user_id: userId})

    if (error) throw new Error(error.message)
    return data
}

export const getRecentSessions = async (limit: 10) => {
    const supabase = createSupabaseClient()
    
    // search assistants with specific id and return everything
    const {data, error} = await supabase
    .from('session_history')
    .select(`assistants:assistant_id (*)`)
    .order('created_at', {ascending: false})
    .limit(limit)

    if (error) {
    console.error('Error fetching recent sessions:', error.message);
    return []; 
  }
    return data.map(({assistants}) => assistants)
}

export const getUserSessions = async (userId: string, limit: 10) => {
    const supabase = createSupabaseClient()
    
    // search assistants with specific id and return everything
    const {data, error} = await supabase.from('session_history')
    .select(`assistants:assistant_id (*)`)
    .eq('user_id', userId)
    .order('created_at', {ascending: false})
    .limit(limit)

    if (error) {
        console.error('Error fetching user sessions:', error.message);
        return []; 
  }
  
  return data.map(({ assistants }) => assistants) 
}

export const getUserAssistants = async (userId: string) => {
    const supabase = createSupabaseClient()
    
    const {data, error} = await supabase.from('assistants')
    .select()
    .eq('author', userId)
    .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user assistants:', error.message);
        return []; // Return empty array instead of Error object
  }
  
  return data;
}

export const newAssistantPermissions = async () => {
    const {userId, has} = await auth()
    const supabase = createSupabaseClient()

    let limit = 3

    if (has({plan: 'gold'})) {
        return true
    } else if (has({plan: '3_assistant_limit'})) {
        limit = 3
    } else if (has({plan: '10_assistant_limit'})) {
        limit = 10
    }
    const {data, error} = await supabase.from('assistants').select('id', {count: 'exact'}).eq('author', userId)
    if (error) throw new Error(error.message)

    const assistantCount = data?.length

    if (assistantCount >= limit) {
        return false
    } else {
        return true
    }
}

export const addBookmark = async (assistantId: string, path: string) => {
    const {userId} = await auth()
    if (!userId) return {success: false, error : 'User not authenticated'}
    const supabase = createSupabaseClient()
    const {data, error} = await supabase.from("bookmarks")
    .insert({
        assistant_id: assistantId,
        user_id: userId,
    })
    .select()
        if (error) {
        if (error.code === '23505') { // Unique constraint violation
            console.log('Bookmark already exists')
            return { success: true, message: 'Already bookmarked' }
        }
        console.error('Error adding bookmark', error.message)
        throw new Error(error.message)
    }
    revalidatePath(path)
    return data
}

export const removeBookmark = async (assistantId: string, path: string) => {
    const {userId} = await auth()
    if (!userId) return {success: false, error: 'User not authenticated'}

    const supabase = createSupabaseClient()
    const {data, error} = await supabase
    .from("bookmarks")
    .delete()
    .eq("assistant_id", assistantId)
    .eq('user_id', userId)
    .select()

    if (error) {
        console.error('Error removing bookmark:', error.message)
        throw new Error(error.message)
    }

    if (!data || data.length === 0) {
        console.log('No bookmark found to delete')
        return {success: false, error: "Bookmark not found"}
    }

    revalidatePath(path)
    return {sucess: true, data}
}

export const getBookmarkedAssistants = async (userId: string) => {
    console.log('Getting bookmarks for user:', userId)
    
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .select(`assistants:assistant_id (*)`) 
        .eq("user_id", userId);
    if (error) {
        throw new Error(error.message);
    }

    return data.map(({ assistants }) => assistants);
}

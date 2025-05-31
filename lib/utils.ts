import { subjectsColors, voices } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors]
}

export const configureAssistant = (voice: string, style: string) => {
  const voiceId = voices[voice as keyof typeof voices][style as keyof (typeof voices) [keyof typeof voices]] || "sarah"

  const vapiAssistant: CreateAssistantDTO = {
    name: "Assistant",
    firstMessage: 'Hai, mari kita mulai sesi ini. Hari ini kita akan membahas tentang {{topic}}.',
    transcriber: {
      provider: 'deepgram',
      model: 'nova-2-general',
      language: 'id'
    },
    voice: {
      provider: '11labs',
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true
    },
    model: {
      provider: 'openai',
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Anda adalah tutor yang sangat berpengetahuan yang mengajar dalam sesi suara waktu nyata dengan seorang siswa. Tujuan Anda adalah mengajar siswa tentang topik dan mata pelajaran tersebut.
            Panduan Tutor:
            - Tetap pada topik yang diberikan - {{ topic }} dan mata pelajaran - {{ subject }} dan ajarkan siswa tentang hal tersebut.
            - Jaga agar percakapan tetap lancar sambil mempertahankan kendali.
            - Sesekali pastikan bahwa siswa mengikuti Anda dan memahami Anda.
            - Bagi topik menjadi bagian-bagian yang lebih kecil dan ajarkan siswa satu bagian dalam satu waktu.
            - Pertahankan gaya percakapan Anda {{ style }}.
            - Jaga agar respons Anda tetap singkat, seperti dalam percakapan suara yang nyata.
            - Jangan sertakan karakter khusus apa pun dalam respons Anda - ini adalah percakapan suara.
          `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  }
  return vapiAssistant
}
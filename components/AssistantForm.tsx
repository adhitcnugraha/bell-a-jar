"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, { message: "Assistant is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.coerce.number().min(1, { message: "Duration is required." }),
});

const AssistantForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* assistant name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assistant name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your assistant name"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* topic */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the assistant help with</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex. Derivatives & Integrals"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* voice */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* style */}
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full">
                    <SelectValue placeholder="Select the voice style" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#2e2e2e] text-white rounded-3xl px-4 py-2 flex items-center gap-2 w-full cursor-pointer"
        >
          Build your Assistant
        </Button>
      </form>
    </Form>
  );
};

export default AssistantForm;

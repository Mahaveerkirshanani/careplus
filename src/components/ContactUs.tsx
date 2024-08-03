"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactUs = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission logic here
    router.push('/thank-you'); // Redirect to a thank you page after submission
  }

  return (
    <div id="contact-us" className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white flex items-center justify-center py-12 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
        {/* Left Side: Contact Details */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-800 flex flex-col items-center justify-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-6 text-white">Get in Touch</h2>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-start">
              <FaMapMarkerAlt className="text-4xl text-yellow-500 mr-4" />
              <div className="flex  flex-col items-start justify-center">
                <h3 className="text-xl font-bold text-gray-200">Our Location</h3>
                <p className="text-gray-300">Mithi @ Tharparkar Sindh</p>
              </div>
            </div>
            <div className="flex items-center justify-start">
              <FaPhone className="text-4xl text-green-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold text-gray-200">Phone Number</h3>
                <p className="text-gray-300">+92 342 3915669 </p>
              </div>
            </div>
            <div className="flex  items-start justify-center">
              <FaEnvelope className="text-4xl text-blue-500 mr-4" />
              <div className="flex  flex-col items-start justify-center">
                <h3 className="text-xl font-bold text-gray-200">Email Address</h3>
                <p className="text-gray-300">kumarmahaveer486@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-100 flex flex-col items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-800">Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="bg-white border-gray-300 text-gray-800 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-800">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          className="bg-white border-gray-300 text-gray-800 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-800">Message</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Your message"
                          {...field}
                          className="bg-white border-gray-300 text-gray-800 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-transform duration-300 ease-in-out text-white">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

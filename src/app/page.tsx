"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { RegisterSchema, RegisterSchemaType } from "@/lib/validate";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/appwrite.api";
import Image from "next/image";


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsLoading(true);
    console.log(values);
    try {
      const user = await createUser(values);
      if (user) router.push(`/patients/${user.$id}/home`);
      console.log(values);
    } catch (error) {
      console.error("Failed to register user:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Form Container */}
      <div className="relative flex flex-col w-full lg:w-1/2 items-center justify-center max-md:h-screen bg-gray-800 p-8 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <Image src='/icons/logoipsum-297 (1).svg' alt="Logo" className=" w-[150px] mb-4"  width={1000} height={1000}/>
          <h2 className="text-3xl font-bold text-center tracking-wider mb-6">Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-4 text-gray-400" />
                        <Input placeholder="Username" {...field} className="pl-10 bg-gray-700 border-gray-600 text-white rounded-md h-12" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter phone number"
                        {...field}
                        defaultCountry="PK"
                        international
                        className="bg-gray-700 border-gray-600 text-white rounded-md h-12 px-4"
                      />
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
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                        <Input placeholder="Email" {...field} className="pl-10 bg-gray-700 border-gray-600 text-white rounded-md h-12" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-gray-400" />
                        <Input type="password" placeholder="Password" {...field} className="pl-10 bg-gray-700 border-gray-600 text-white rounded-md h-12" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? ' Loading ...' : ' Get started'}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6 justify-between flex items-center lg:text-sm text-xs">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">Login
              </Link>
            </p>
            <Link href="/admin" className="text-blue-500 hover:underline">Admin
            </Link>
          </div>
          <p className="text-center mt-6 text-gray-500 lg:text-sm text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Mahaveer Kumar. All rights reserved.
          </p>
        </div>
      </div>
      {/* Side Image */}
      <div className="hidden lg:flex w-1/2 h-screen fixed right-0 ">
        <Image
          src="/onboarding-img.png" // Replace with the actual path to the image
          alt="Doctor"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;

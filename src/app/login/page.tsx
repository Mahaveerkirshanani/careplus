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
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/appwrite.api";
import Image from "next/image";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: LoginSchemaType) => {
    setIsLoading(true);
    try {
      const user = await loginUser(values);
      if (user) router.push(`/patients/${user.$id}/home`);
    } catch (error) {
      console.error("Failed to login user:", error);
      form.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
      form.setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Form Container */}
      <div className="relative flex flex-col w-full lg:w-1/2 items-center justify-center max-md:h-screen bg-gray-800 p-8 overflow-y-auto">
        <div className="max-w-md w-full mx-auto max-sm:mt-12">
          <Image
            src="/icons/logoipsum-297 (1).svg"
            alt="Logo"
            className="w-[150px] mb-4"
            width={1000}
            height={1000}
          />
          <h2 className="text-3xl font-bold text-center tracking-wider mb-6">
            Login
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                        <Input
                          placeholder="Email"
                          {...field}
                          className="pl-10 bg-gray-700 border-gray-600 text-white rounded-md h-12"
                        />
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
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="pl-10 bg-gray-700 border-gray-600 text-white rounded-md h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6 justify-between flex items-center lg:text-sm text-xs">
            <p>
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
          <p className="text-center mt-6 text-gray-500 lg:text-sm text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Mahaveer Kumar. All rights
            reserved.
          </p>
        </div>
      </div>
      {/* Side Image */}
      <div className="hidden lg:flex w-1/2 h-screen fixed right-0 ">
        <Image
          src="/onboarding-img.png"
          alt="Doctor"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;

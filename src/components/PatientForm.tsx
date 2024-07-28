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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../interface";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaNotesMedical } from "react-icons/fa";

interface PatientRegistrationFormProps {
  user: User;
}
import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
  medicalHistory: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
});



const PatientRegistrationForm = ({ user }: PatientRegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      medicalHistory: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      // const user = await createUser(values);
      // if (user) router.push(`/patients/${user.$id}/home`);
      console.log(values);
    } catch (error) {
      console.error("Failed to register user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-gray-700 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-300">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Username"
                          {...field}
                          className="pl-10 bg-gray-600 border-gray-500 text-white rounded-md h-12"
                        />
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
                    <FormLabel className="text-lg text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter phone number"
                        {...field}
                        defaultCountry="PK"
                        international
                        className="bg-gray-600 border-gray-500 text-white rounded-md h-12 px-4"
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
                    <FormLabel className="text-lg text-gray-300">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          placeholder="Email"
                          {...field}
                          className="pl-10 bg-gray-600 border-gray-500 text-white rounded-md h-12"
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
                    <FormLabel className="text-lg text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="pl-10 bg-gray-600 border-gray-500 text-white rounded-md h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-300">Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => {
                          setSelectedDate(date);
                          field.onChange(date?.toISOString().split('T')[0] || "");
                        }}
                        className="bg-gray-600 border-gray-500 text-white rounded-md h-12 p-3 w-full"
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-300">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={gender}
                        onChange={(value: string) => {
                          setGender(value);
                          field.onChange(value);
                        }}
                        className="flex space-x-4"
                      >
                        <label className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="radio"
                            value="male"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                            className="form-radio text-teal-500"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="radio"
                            value="female"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                            className="form-radio text-teal-500"
                          />
                          <span>Female</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="radio"
                            value="other"
                            checked={gender === "other"}
                            onChange={() => setGender("other")}
                            className="form-radio text-teal-500"
                          />
                          <span>Other</span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Medical History */}
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Medical History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg text-gray-300">Medical History</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Medical History"
                        className="bg-gray-600 border-gray-500 text-white rounded-md h-32 p-4 w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Loading ...' : 'Submit Appointment'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientRegistrationForm;

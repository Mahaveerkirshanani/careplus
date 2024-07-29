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
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaUserGraduate,
} from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import {
  Doctors,
  GenderOptions,
  RegisterSchema,
  RegisterSchemaType,
} from "@/lib/validate";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/appwrite.api";
import Image from "next/image";
import { User } from "../../interface";
import { PiUserFocusBold } from "react-icons/pi";
import DatePicker from "react-datepicker";
import { BiSolidUserAccount } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CalendarDays } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const PatientRegistrationForm = (user: User) => {
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
    // try {
    //   const user = await createUser(values);
    //   if (user) router.push(`/patients/${user.$id}/home`);
    //   console.log(values);
    // } catch (error) {
    //   console.error("Failed to register user:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#000000e5] text-white overflow-hidden">
      {/* Form Container */}
      <div className="relative flex flex-col w-full items-center justify-center  overflow-y-auto">
        <div className="w-full  px-2 md:px-4">
          <Image
            src="/icons/logoipsum-297 (1).svg"
            alt="Logo"
            className=" w-[150px] mb-4"
            width={1000}
            height={1000}
          />

          <h2 className="md:text-3xl text-2xl font-semibold text-center md:tracking-widest mb-2">
            Patient Register Form
          </h2>
          <p className="text-center text-xs text-gray-400 tracking-wider ">
            Welcome, Please fill this form to get appiontment
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6  py-4 "
            >
              <h2 className="text-xl font-semibold tracking-wider text-blue-300">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="Username"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder=" +92 123456789"
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
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
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
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm capitalize">
                        Date of Birth
                      </FormLabel>

                      <div className="flex rounded-md bg-gray-600 border-gray-400 h-12 items-center gap-3">
                        <CalendarDays height={24} width={24} className="ml-2" />
                        <FormControl>
                          <DatePicker
                            dateFormat={"dd/MM/yyyy"}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            className="h-12 bg-transparent outline-none "
                            placeholderText="DD/MM/YYYY"
                          />
                        </FormControl>
                      </div>

                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex md:gap-6  gap-2 "
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          {GenderOptions.map((option) => (
                            <div
                              key={option}
                              className="flex items-center justify-center bg-gray-600 px-4 py-3 gap-3 capitalize rounded-md"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <Label
                                htmlFor={option}
                                className="cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaHome className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="Address"
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
                  name="cnicNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">CNIC Number </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <PiUserFocusBold
                            size={24}
                            className="absolute left-3 top-3 text-gray-400"
                          />
                          <Input
                            placeholder="44303-1234568-9"
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
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Occupation</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaUserGraduate className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="Softwere Engineer , Accountant "
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
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Emergency Contact Name{" "}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <BiSolidUserAccount className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="Guardian's name"
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
                  name="emergencyContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Emergency Contact Number
                      </FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder=" +92 123456788"
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
              </div>

              <h2 className="text-xl font-semibold tracking-wider text-blue-300">
                Medical Information
              </h2>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                <FormField
                  control={form.control}
                  name="primaryPhysician"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Primary Physician
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Doctor " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Doctors.map((doctor) => (
                            <SelectItem key={doctor.name} value={doctor.name}>
                              <div className="flex items-center md:gap-3 gap-2 cursor-pointer ">
                                <Image
                                  src={doctor.image}
                                  width={1000}
                                  height={1000}
                                  className="w-8 h-8 rounded-full  border border-r-gray-600"
                                  alt="doctor-image"
                                />
                                <p>{doctor.name} </p>
                                <p className="text-gray-400 text-xs">
                                  - {doctor.title}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                     <FormLabel className="text-sm flex items-center gap-2">
                        Allergies <p className="text-sm text-gray-400">(if any)</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className=" bg-gray-700 border-gray-600 text-white rounded-md "
                          placeholder="Peanuts, Pencillin , Amoxil "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentMedication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center gap-2">
                        Current Medication <p className="text-sm text-gray-400">(if any)</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className=" bg-gray-700 border-gray-600 text-white rounded-md "
                          placeholder="Nexium 20 mg , Paracitamol 500mg  , Brufin 250mg "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="familyMedicationHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center gap-2">
                        Family Medical History <p className="text-sm text-gray-400">(if any)</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className=" bg-gray-700 border-gray-600 text-white rounded-md "
                          placeholder="Mother had fever , Father had skin disease "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pastMedicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center gap-2">
                        Past Medical History <p className="text-sm text-gray-400">(if any)</p>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className=" bg-gray-700 border-gray-600 text-white rounded-md  "
                          placeholder="High fever with cough , Blood vomiting "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? " Loading ..." : " Get started"}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-6 justify-between flex items-center lg:text-sm text-xs">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
            <Link href="/admin" className="text-blue-500 hover:underline">
              Admin
            </Link>
          </div>
          <p className="text-center mt-6 text-gray-500 lg:text-sm text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Mahaveer Kumar. All rights
            reserved.
          </p>
        </div>
      </div>
      {/* Side Image */}
    </div>
  );
};

export default PatientRegistrationForm;

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

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { Doctors, getAppointmentSchema, Status } from "@/lib/validate";
import { useRouter } from "next/navigation";
import { createAppointment, createUser } from "@/lib/appwrite.api";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface InewAppiontmentProp {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}

const NewAppointment = ({ userId, patientId, type }: InewAppiontmentProp) => {
  const [isLoading, setIsLoading] = useState(false);

  let btnLabel;
  switch (type) {
    case "cancel":
      btnLabel = "Cancel Appointment";
      break;
    case "create":
      btnLabel = "Create Appointment";
      break;
    case "schedule":
      btnLabel = "Schedule Appointment";
      break;

    default:
      break;
  }

  const AppoitmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppoitmentFormValidation>>({
    resolver: zodResolver(AppoitmentFormValidation),
    defaultValues: {
      schedule: new Date(),
      primaryPhysician: "",
      cancellationReason: "",
      note: "",
      reason: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof AppoitmentFormValidation>) => {
    setIsLoading(true);


    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;

      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset(),
            router.push(
              `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
            );
        }
      }

      console.log(values);
    } catch (error) {
      console.error("Failed to register user:", error);
    } finally {
      setIsLoading(false);
    }
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
            New Appoitment
          </h2>
          <p className="text-center text-xs text-gray-400 tracking-wider ">
            Welcome, Request an appointment in 10 seconds
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6  py-4 "
            >
              {type !== "cancel" && (
                <>
                  <FormField
                    control={form.control}
                    name="primaryPhysician"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Doctor</FormLabel>
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
                    name="schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm capitalize">
                          Expected Appointment Date
                        </FormLabel>

                        <div className="flex rounded-md bg-gray-600 border-gray-400 h-12 items-center gap-3">
                          <CalendarDays
                            height={24}
                            width={24}
                            className="ml-2"
                          />
                          <FormControl>
                            <DatePicker
                              showTimeSelect
                              dateFormat={"MM/dd/yyyy - h:mm aa"}
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              className="h-12 bg-transparent outline-none "
                              placeholderText="MM/DD/YYYY - h:mm aa"
                            />
                          </FormControl>
                        </div>

                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm flex items-center gap-2">
                            Reason for appoitment
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className=" bg-gray-700 border-gray-600 text-white rounded-md "
                              placeholder="Enter reason for appointment "
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm flex items-center gap-2">
                            Notes
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className=" bg-gray-700 border-gray-600 text-white rounded-md "
                              placeholder="Enter notes  "
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {type == "cancel" && (
                <FormField
                  control={form.control}
                  name="cancellationReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm flex items-center gap-2">
                        Reason for cancellation
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className=" bg-gray-700 border-gray-600 text-white rounded-md "
                          placeholder="Enter reason for cancellation"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700  text-white py-3 rounded-md ${
                  type == "cancel"
                    ? "bg-red-500 hover:bg-red-700 "
                    : "bg-blue-600"
                }`}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? " Loading ..." : `${btnLabel}`}
              </Button>
            </form>
          </Form>

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

export default NewAppointment;

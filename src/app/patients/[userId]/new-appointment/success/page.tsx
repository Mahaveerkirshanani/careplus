import AppointmentDetails from "@/components/AppointmentDetails";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/appwrite.api";
import { Doctors, SearchParamProps } from "@/lib/validate";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || " ";
  const appiontment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name == appiontment.primaryPhysician
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start ">
      <div className="max-w-[95vw] w-full md:max-w-[70vw] py-8   rounded-lg shadow-lg">
        <Link href={`/patients/${userId}/home`}>
          <Image
            src="/icons/logoipsum-297 (1).svg"
            alt="Logo"
            className="lg:w-[250px] w-[140px] mb-4 text-start"
            width={1000}
            height={1000}
          />
        </Link>

        <section className="flex flex-col items-center mt-10">
          <Image
            src="/icons/success.gif"
            height={300}
            width={280}
            alt="success"
          />

          <h2 className="mb-6 capitalize text-center font-extrabold tracking-wider text-2xl  lg:text-4xl w-full">
            Your <span className="text-green-500"> appointment request </span>{" "}
            has been <span className="text-pink-500 ">successfully</span>{" "}
            submitted!
          </h2>

          <p className=" md:text-lg text-sm text-gray-300  tracking-widest  font-semibold">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>

        <div className="container mx-auto p-4">
          <AppointmentDetails
            doctor={doctor!}
            appointmentTime={appiontment.schedule}
          />
        </div>
      </div>
      <Button
        variant="outline"
        className=" bg-blue-500  hover:bg-blue-300"
        asChild
      >
        <Link href={`/patients/${userId}/new-appointment`}>
          New Appointment
        </Link>
      </Button>
      <p className="text-center mt-6 mb-10 text-gray-500 lg:text-sm text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Mahaveer Kumar. All rights
            reserved.
          </p>
    </div>
  );
};

export default Success;

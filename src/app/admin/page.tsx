import AppointmentCard from "@/components/AppiontmentCard";
import Image from "next/image";
import React from "react";
import { CancelledIcon, PendingIcon, ScheduledIcon } from "../../../svg";
import getRecentAppointmentList from "@/lib/appwrite.api";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/columns";

const Admin = async () => {


  const appointments = await getRecentAppointmentList();

  console.table(appointments);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-10">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        {/* Left side image */}
        <div className="flex items-center gap-4">
          <Image
            src="/icons/logoipsum-297 (1).svg" // Update with your image path
            alt="Admin"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>

        {/* Right side admin badge */}
        <div className="flex items-center gap-2">
          <span className="bg-blue-500 capitalize text-white px-3 py-1 rounded-md">
            Admin dashboard
          </span>
        </div>
      </header>

      <main>
        <div>
          <h1 className="text-4xl font-semibold tracking-wider">
            Welcome Admin
          </h1>
          <p className="text-sm text-gray-400">
            Start your day with managing new appointments
          </p>
        </div>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppointmentCard
            count={appointments.pendingCount}
            status="Pending Appointments"
            icon={<PendingIcon />}
            gradientColor="bg-gradient-to-r from-blue-50/[0.2] to-blue-200/[0.5]"
          />
          <AppointmentCard
            count={appointments.scheduledCount}
            status="Scheduled Appointments"
            icon={<ScheduledIcon />}
            gradientColor="bg-gradient-to-r from-green-50/[0.3] to-green-200/[0.5]"
          />
          <AppointmentCard
            count={appointments.cancelledCount}
            status="Cancelled Appointments"
            icon={<CancelledIcon />}
            gradientColor="bg-gradient-to-r from-red-50/[0.3] to-red-200/[0.5]"
          />
        </section>
      </main>
      <DataTable columns={columns} data={appointments.documents} />
    </div>
  );
};

export default Admin;

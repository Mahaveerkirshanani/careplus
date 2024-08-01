import Image from "next/image";
import moment from "moment";
import { CalendarDays } from "lucide-react";

interface Doctor {
  name: string;
  image: string;
  
}

interface AppointmentDetailsProps {
  doctor: Doctor ;
  appointmentTime: Date;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ doctor, appointmentTime }) => {
  return (
    <section className="lg:flex flex-col items-center gap-5 ">
      <p className="text-lg text-gray-200 font-semibold ">Requested appointment details:</p>
      <div className="flex flex-col lg:flex-row items-center gap-4 mt-3">
        <Image
          src={doctor?.image!}
          alt="doctor img"
          height={1000}
          width={1000}
          className="rounded-full size-9 "
        />
        <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4">
          <p className="text-lg font-semibold tracking-wider text-pink-500">{doctor?.name!}</p>
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays size={24} color="green" />
            <p className="text-green-600">{moment(appointmentTime).format("dddd, MMMM Do YYYY, h:mm a")}</p>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AppointmentDetails;

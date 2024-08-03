import React, { FC } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Doctors } from "@/lib/validate";
import Image from "next/image";

interface DoctorSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DoctorSelect: FC<DoctorSelectProps> = ({ value, onChange }) => {
  const selectedDoctor = Doctors.find((doctor) => doctor.name === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full py-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600  focus:outline-none outline-none">
        {selectedDoctor ? (
          <div className="flex items-center space-x-3">
            <Image
            width={1000}
            height={1000}
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-9 h-9 rounded-full"
            />
            <div className="">
              <p className="font-semibold text-start">{selectedDoctor.name}</p>
              <p className="text-sm text-gray-600 text-start dark:text-gray-400">{selectedDoctor.title}</p>
            </div>
          </div>
        ) : (
          <SelectValue placeholder="Select a doctor" />
        )}
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg">
        {Doctors.map((doctor) => (
          <SelectItem key={doctor.name} value={doctor.name} className="py-3">
            <div className="flex items-center space-x-3">
              <Image
              width={1000}
              height={1000}
                src={doctor.image}
                alt={doctor.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex gap-4">
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.title}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DoctorSelect;

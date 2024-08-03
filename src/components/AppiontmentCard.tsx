import React from 'react';


interface CardProps {
  count: number;
  status: string;
  icon: React.ReactNode;
  gradientColor: string;
}

const AppointmentCard: React.FC<CardProps> = ({ count=0, status, icon, gradientColor }) => {
  return (
    <div className={`flex h-[150px]  items-center p-4 rounded-lg ${gradientColor} shadow-lg bg-opacity-20`}>
      <div className="p-2 rounded-full ">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-2xl font-bold tracking-wider">{count}</p>
        <p className="text-2xl font-bold">{status}</p>
      </div>
    </div>
  );
};

export default AppointmentCard;

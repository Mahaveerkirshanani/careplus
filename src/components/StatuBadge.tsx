import React from "react";
import { CancelledIcon2, PendingIcon2, ScheduledIcon2 } from "../../svg";

interface StatusBadgeProps {
  status: "scheduled" | "pending" | "cancelled"; // Adjust these values based on your actual status values
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor;
  let textColor;
  let label;
  let Icon;

  switch (status) {
    case "scheduled":
      bgColor = "bg-green-300/[.2]";
      textColor = "text-green-300";
      label = "Scheduled";
      Icon = ScheduledIcon2;
      break;
    case "pending":
      bgColor = "bg-blue-300/[.2]";
      textColor = "text-blue-300";
      label = "Pending";
      Icon = PendingIcon2;
      break;
    case "cancelled":
      bgColor = "bg-red-300/[.2]";
      textColor = "text-red-300";
      label = "Cancelled";
      Icon = CancelledIcon2;
      break;
    default:
      bgColor = "bg-gradient-to-r from-gray-100 to-gray-200";
      textColor = "text-gray-700";
      label = "Unknown";
      Icon = () => null; // No icon for unknown status
      break;
  }

  return (
    <span
      className={`inline-flex gap-1  items-center px-3 py-2 rounded-full text-sm font-semibold shadow-md ${bgColor} ${textColor}`}
    >
      <Icon />
      {label}
    </span>
  );
};

export default StatusBadge;

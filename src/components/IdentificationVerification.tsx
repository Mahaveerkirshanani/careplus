import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/FileUpload"; // Ensure correct import path
import { IdentificationTypes } from "@/lib/validate";

interface IdentificationVerificationProps {
  identificationType: string;
  identificationNumber: string;
  identificationDocumentUrl: string;
  onTypeChange: (value: string) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDocumentUpload: (file: File) => void;
}

const IdentificationVerification: FC<IdentificationVerificationProps> = ({
  identificationType,
  identificationNumber,
  identificationDocumentUrl,
  onTypeChange,
  onNumberChange,
  onDocumentUpload,
}) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg mb-8 flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-semibold text-teal-400 mb-4">
          Identification & Verification
        </h3>
        <label className="block text-sm font-medium text-gray-200">
          Identification Type
        </label>
        <Select value={identificationType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select identification type" />
          </SelectTrigger>
          <SelectContent>
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type} className="py-2">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Identification Number
        </label>
        <input
          type="text"
          value={identificationNumber}
          onChange={onNumberChange}
          className="block w-full border-gray-300 h-12 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter identification number"
        />
      </div>

      <FileUpload
        onFileUpload={onDocumentUpload}
        uploadedFileUrl={identificationDocumentUrl}
      />
    </div>
  );
};

export default IdentificationVerification;

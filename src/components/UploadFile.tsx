"use client";
import { convertFileToUrl } from "@/lib/validate";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUploadFill  } from "react-icons/bs"; // Import icons of your choice

interface UploadFileProps {
  files: File[] | undefined;
  onchange: (files: File[]) => void;
}

const UploadFile = ({ files, onchange }: UploadFileProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onchange(acceptedFiles);
  }, [onchange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-800 border-[3px] border-[#b7b7b7e7] border-dashed  flex flex-col items-center justify-center rounded-lg mb-8 ${files && files.length>0 ? 'p-2' : 'p-5' }`}
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded_file"
          className="max-h-[70vh] overflow-hidden object-cover rounded-md"
        />
      ) : (
        <>
          <BsCloudUploadFill   size={45}  color="#1bff5b"  className="text-gray-400 mb-2 lg:text-3xl text-2xl " />
          <p className="text-gray-400 mb-2 lg:text-lg text-sm tracking-wider"> <span className="text-green-400 font-semibold tracking-widest ">Click to upload 
            </span>, or drag and drop</p>
          <p className="text-gray-500 text-xs font-semibold  tracking-wider">PNG, JPEG,SVG or GIF (max 800×400)</p>
        </>
      )}
     
    </div>
  );
};

export default UploadFile;

import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFileUrl: string;
}

const FileUpload: FC<FileUploadProps> = ({ onFileUpload, uploadedFileUrl }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Upload Identification Document</label>
      <div
        {...getRootProps()}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24 4v16M24 20l-6.293 6.293a1 1 0 001.414 1.414L24 22.828l4.879 4.879a1 1 0 001.414-1.414L24 20z"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Click to upload</span>
              <input {...getInputProps()} className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {uploadedFileUrl && (
        <p className="mt-2 text-sm text-gray-500">
          <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="underline">
            View uploaded document
          </a>
        </p>
      )}
    </div>
  );
};

export default FileUpload;

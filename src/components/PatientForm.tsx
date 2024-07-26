import React from 'react'
import { FaUser } from 'react-icons/fa'

const PatientForm = () => {
  return (
    <div className="min-h-screenflex items-center justify-center py-12 px-4">
    <div className="bg-gray-800 rounded-2xl shadow-lg  w-full p-8 space-y-6">
     
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600">
            <FaUser className="text-gray-400 text-2xl" />
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-teal-600 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  
  )
}

export default PatientForm
// app/components/OurTeam.tsx
import React from 'react';
import Image from 'next/image';

const teamMembers = [
  { name: 'Dr. Shanker Lal', title: 'Chief Surgeon', image: '/WhatsApp Image 2024-07-26 at 16.10.37_3925ac99.jpg' },
  { name: 'Dr. Mahaveer Kumar ', title: 'Pediatrician', image: '/WhatsApp Image 2024-07-19 at 12.05.12_a4b17941.jpg' },
  { name: 'Dr. Munesh kumar ', title: 'Medical Assistant', image: '/WhatsApp Image 2024-07-26 at 16.22.56_94b6abde.jpg' },
  { name: 'Dr. SK sahb', title: 'Head Nurse', image: '/WhatsApp Image 2024-07-26 at 16.22.18_3ffc517a.jpg' },
  { name: 'Dr. Loono Mal ', title: 'Cardiologist', image: '/WhatsApp Image 2024-07-18 at 17.40.31_9da62391.jpg' },
  { name: 'Dr . Suneel Sahb', title: 'Radiologic Technologist', image: '/1721975039430.jpg' },
  { name: 'Dr. Veenjhraj Ratnani ', title: 'Orthopedic Surgeon', image: '/WhatsApp Image 2024-07-26 at 16.31.32_5849234b.jpg' },
  { name: 'Veer Akhani', title: 'Physical Therapist', image: '/IMG-20240526-WA0015.jpg' },
];

const TeamCard: React.FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center w-full h-72 relative overflow-hidden">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={member.image}
          alt={member.name}
          layout="fill"
          className="w-full h-full object-cover rounded-full border-4 border-teal-500"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
      <p className="text-teal-600">{member.title}</p>
    </div>
  );
};

const OurTeam: React.FC = () => {
  return (
    <section className="py-12 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-teal-500 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;

// app/home/page.tsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import OurTeam from "@/components/OurTeam";
import Services from "@/components/Services";
import Testimonials from "@/components/Testonomial";
import OurStaff from '@/components/OurStaff';
import HowItWorks from '@/components/HIW';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import RegisterAppointment from '@/components/Appiontment';

const Home = () => {
  const pathname = usePathname();
  
  // Extract userId from the pathname
  const userIdMatch = pathname.match(/\/patients\/([^/]+)\/home/);
  const userId = userIdMatch ? userIdMatch[1] : '';

  return (
    <div>
      <NavBar />
      <HeroSection userId={userId} /> 
      <HowItWorks />
      <RegisterAppointment userId={userId}/>
      <Services userId={userId} /> {/* Pass userId to Services component */}
      <Testimonials />
      <OurStaff />
      <OurTeam />
      <FAQ />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;

import Image from 'next/image';
import React from 'react';
import AboutItem from './AboutItem';

const About = () => {
  return (
    <section className='flex w-full'>
      <div className='bg-[#1A1A1A] h-screen sticky top-0 flex px-20 items-center flex-[0.65]'>
        <p className='text-7xl font-Poppins font-semibold text-white leading-[90px]'>
          Smart <br /> contract <br /> automation
        </p>
      </div>
      <div className='flex-[0.35] bg-[#6736F1] px-6 py-10 font-Poppins'>
        <AboutItem
          imgUrl='/landing1.svg'
          index={1}
          title={'Time based'}
          subtitle={
            'Automate your smartcontract with your custom/cron time and make your smartcontract functions execute smoothly and hassle free.'
          }
        />

        <AboutItem
          imgUrl='/landing2.svg'
          index={2}
          title={'Custom logic'}
          subtitle={
            'Automate your smartcontract with your custom logic function implemented in your own unique way and execute it with ease.'
          }
        />

        <AboutItem
          imgUrl='/landing3.svg'
          index={3}
          title={'Manage Automated Jobs'}
          subtitle={
            'Manage all your deployed time-based/custom logic jobs, add balance, delete and do much more at our crazy dashboard!'
          }
        />
      </div>
    </section>
  );
};

export default About;

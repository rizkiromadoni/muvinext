import { getSettings } from '@/actions'
import Image from 'next/image'
import React from 'react'

const Footer = async () => {
  const options = await getSettings();

  const siteName = options.find((item: any) => item.name === "site-name")?.value as string || "NextJS";
  return (
    <div className='p-10 mb-20 lg:mb-0 flex flex-col gap-2'>
      <div className='flex gap-2 items-center'>
        <Image src="/vercel.svg" className='w-8 h-8' width={40} height={40} alt={"Logo"} />
        <span className='text-3xl font-bold'>{siteName.toUpperCase()}</span>
      </div>
      <div className='text-xs'>
        <p className='opacity-80'>Made with Love By Anonymous</p>
        <p className='opacity-80'>This project uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  )
}

export default Footer
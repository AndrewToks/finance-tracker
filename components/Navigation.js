import Image from 'next/image'
import React from 'react'
import {ImStatsBars} from 'react-icons/im'

const Navigation = () => {
  return (
    <header className='container max-w-2xl px-6 py-6 mx-auto'>
            <div  className="flex items-center justify-between">
            {/*user information  */}
            <div className="flex items-center gap-2">
                {/* img */}
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <Image src="/busand.jpg" alt="Profile Image" width={500} height={500} className="w-full h-full object-cover" />
                </div>
                {/* name */}
                <small>Hi, Busand!</small>
            </div>
            {/* Right Side of our navigation */}
            <nav className="flex items-center gap-4">
                <div><ImStatsBars className='text-2xl'/></div>
                <div><button className='btn btn-danger'>Sign out</button></div>
            </nav>
            </div>
        </header>
  )
}

export default Navigation
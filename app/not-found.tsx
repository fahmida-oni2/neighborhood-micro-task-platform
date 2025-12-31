
import Link from 'next/link';
import errorImg from '../public/error-404.png'
import Image from 'next/image';
export default function NotFound() {
  return (
        
    <div className='flex flex-col min-h-screen bg-base-200 space-y-3 items-center justify-center'>
                    <Image
                              src={errorImg} 
                              alt="image"
                              width={400}
                              height={60}
                              style={{ objectFit: 'cover' }} 
                              className='p-2 items-center' 
                            />
            <h1 className='text-center font-extrabold text-4xl '>Oops, page not found!</h1>
            <p className='text-center  '>The page you are looking for is not available.</p>
            <div className='flex items-center justify-center'>
             <Link href='/' className='btn rounded-xl text-white  bg-primary'>Go Back!</Link>
            </div>
        </div>
   
  );
}
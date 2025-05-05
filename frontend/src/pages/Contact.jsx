import React, { useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLatterBox from '../components/NewsLatterBox'
import { ShopContext } from '../context/ShopContext'

function Contact() {
  const{showSearch,navigate}=useContext(ShopContext)
    if(showSearch){
      navigate("/collections")
    }
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={"Us"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'> 54709 willms Station <br /> suite 350, washington,USA</p>
            <p>Tel:(415) 555-0123 <br /> Email:admin@TimeLessThereads.com</p>
            <p className='font-semibold text-xl text-gray-600'> Careers at Forever</p>
            <p className='text-gray-500'> Learn more about our team and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      {/* <NewsLatterBox/> */}
    </div>
  )
}

export default Contact

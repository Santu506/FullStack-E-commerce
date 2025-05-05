import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

function Footer() {
    const {navigate} = useContext(ShopContext)
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
         <img className="mb-5 w-72 rounded-md" src={assets.logo2} alt="" />
        <p className="w-full md:w-2/3 text-gray-600">
          Thank you for visiting our site! We're committed to providing you with
          exceptional service and valuable information. For any inquiries or
          support, please don't hesitate to contact us. Stay updated with the
          latest news, offers, and updates by following us on social media. Your
          feedback is important to us, and we look forward to continuing to
          serve you. Have a great day!
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">Company</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Corporates information</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">Consumer Policy</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li onClick={() => navigate("/pivacy-policy")} className="cursor-pointer text-blue-500" >collections & returns</li>
          <li>Terms Of Use</li>
          <li>Security</li>
          <li onClick={() => navigate("/pivacy-policy")} className="cursor-pointer text-blue-500" >Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">Get In Touch</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Tel:(415) 555-0123</li>
          <li>Email:admin@TimeLessThereads.com</li>
        </ul>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@TimeLessThereads.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

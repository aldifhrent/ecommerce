import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-blue-500 h-[592px] mt-20 p-24">
      <div className="flex items-center gap-10">
        <div className=" flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-white">MegaPhone</h1>
          <p>Contact Us</p>
          <div className="flex items-start gap-4 text-white">
            <Phone />
            <div className="flex flex-col">
              <p>Call us</p>
              <p> +202 555</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-4xl text-white font-bold">Customer Services</h1>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>E-waste Policy</p>
          <p>Cancellation & Return Policy</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <hr />
        <p className="text-center text-white text-lg">
          © 2022 All rights reserved. Reliance Retail Ltd.
        </p>
      </div>
    </div>
  );
}

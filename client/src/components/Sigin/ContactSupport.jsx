import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowLeft } from "react-icons/fi";

function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Top Section */}
      <div className="bg-white border-b border-[#E6E6E6] px-6 sm:px-12 lg:px-20 pt-6 pb-8">
        <div className="max-w-[1100px] mx-auto">
          <Link to="/account-review" className="inline-flex items-center gap-1 text-[#055BDA] text-[13px] font-medium mb-3 hover:underline">
            <FiArrowLeft size={13} /> Back
          </Link>
          <h1 className="text-[#0F172A] font-bold text-[28px]">Contact Us</h1>
          <p className="text-[#64748B] text-[15px] mt-2 leading-[1.6]">
            Have questions about our platform, pricing, or support? Our team is here to help.<br className="hidden sm:block" />
            Reach out and we'll respond shortly.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 bg-[#F8FAFB] px-6 sm:px-12 lg:px-20 py-10">
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left - Get in Touch */}
          <div className="flex flex-col gap-7 w-full lg:w-[300px] shrink-0 pt-2">
            <h2 className="text-[#0F172A] font-bold text-[17px]">Get in Touch</h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0 mt-0.5">
                  <FiMail size={16} className="text-[#6C47FF]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#0F172A] font-bold text-[14px]">Email</span>
                  <span className="text-[#64748B] text-[13px]">support@kasperinfotech.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0 mt-0.5">
                  <FiPhone size={16} className="text-[#6C47FF]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#0F172A] font-bold text-[14px]">Phone</span>
                  <span className="text-[#64748B] text-[13px]">+91 98765 43210</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin size={16} className="text-[#6C47FF]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#0F172A] font-bold text-[14px]">Office</span>
                  <span className="text-[#64748B] text-[13px]">Kasper Infotech Pvt Ltd</span>
                  <span className="text-[#64748B] text-[13px]">India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center shrink-0 mt-0.5">
                  <FiClock size={16} className="text-[#6C47FF]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#0F172A] font-bold text-[14px]">Working Hours</span>
                  <span className="text-[#64748B] text-[13px]">Monday – Friday</span>
                  <span className="text-[#64748B] text-[13px]">9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form Card */}
          <div className="flex-1 w-full max-w-[550px] bg-white border border-[#E8E8E8] rounded-[16px] px-8 py-7 sm:px-10 sm:py-8">
            <h2 className="text-[#0F172A] font-bold text-[17px] mb-5">Send us a message</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-[#E2E2E2] rounded-md px-4 h-[42px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#6C47FF] transition-colors placeholder:text-[#B0B0B0] bg-white"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-[#E2E2E2] rounded-md px-4 h-[42px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#6C47FF] transition-colors placeholder:text-[#B0B0B0] bg-white"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full border border-[#E2E2E2] rounded-md px-4 h-[42px] text-[14px] text-[#1A1A1A] outline-none focus:border-[#6C47FF] transition-colors placeholder:text-[#B0B0B0] bg-white"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows={5}
                className="w-full border border-[#E2E2E2] rounded-md px-4 py-3 text-[14px] text-[#1A1A1A] outline-none focus:border-[#6C47FF] transition-colors placeholder:text-[#B0B0B0] bg-white resize-vertical min-h-[120px]"
              />
              <button
                type="submit"
                className="w-full bg-[#6C47FF] text-white font-semibold text-[15px] h-[44px] rounded-md hover:bg-[#5a38e0] transition-colors mt-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSupport;

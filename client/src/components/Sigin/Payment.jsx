import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FiCreditCard } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state?.plan || { name: "Premium Plan", price: "₹1,200.00" };

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = async () => {
    setLoading(true);
    // Dummy payment - simulate processing
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful!");
      navigate("/account-review", { state: { trackingNo: "#INV-YNM728343" } });
    }, 2000);
  };

  const inputBaseStyle = "w-full border border-[#E6E6E6] rounded-[10px] px-3 h-12 text-[14px] font-normal text-[#1A1A1A] outline-none focus:border-gray-400 transition-colors placeholder:text-[#94A3B8]";

  // Parse price for summary
  const basePrice = 984;
  const cgst = 108;
  const sgst = 108;
  const total = basePrice + cgst + sgst;

  return (
    <div className="bg-white min-h-screen w-full flex items-start justify-center py-16 px-6">
      <div className="flex flex-col lg:flex-row gap-20 max-w-[1500px] w-full">

        {/* Left - Payment Form */}
        <div className="flex-1 max-w-[772px] flex flex-col gap-20">
          {/* Payment Method Tabs */}
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`flex items-center justify-between px-4 h-14 w-[232px] rounded-lg border-2 transition-all ${paymentMethod === "card" ? "border-[#055BDA]" : "border-[#64748B]"}`}
            >
              <div className="flex items-center gap-4">
                <FiCreditCard size={24} className={paymentMethod === "card" ? "text-[#055BDA]" : "text-[#64748B]"} />
                <span className={`font-semibold text-[17px] ${paymentMethod === "card" ? "text-[#055BDA]" : "text-[#64748B]"}`}>Card</span>
              </div>
              {paymentMethod === "card" && <FiCheckCircle size={16} className="text-[#055BDA]" />}
            </button>

            <button
              onClick={() => setPaymentMethod("netbanking")}
              className={`flex items-center justify-between px-4 h-14 rounded-lg border transition-all ${paymentMethod === "netbanking" ? "border-2 border-[#055BDA]" : "border-[#64748B]"}`}
            >
              <div className="flex items-center gap-4">
                <BsBank size={24} className={paymentMethod === "netbanking" ? "text-[#055BDA]" : "text-[#64748B]"} />
                <span className={`font-semibold text-[17px] ${paymentMethod === "netbanking" ? "text-[#055BDA]" : "text-[#64748B]"}`}>Net Banking</span>
              </div>
              {paymentMethod === "netbanking" && <FiCheckCircle size={16} className="text-[#055BDA] ml-12" />}
            </button>

            <button
              onClick={() => setPaymentMethod("upi")}
              className={`flex items-center justify-between px-4 h-14 w-[232px] rounded-lg border transition-all ${paymentMethod === "upi" ? "border-2 border-[#055BDA]" : "border-[#64748B]"}`}
            >
              <div className="flex items-center gap-4">
                <FiSmartphone size={24} className={paymentMethod === "upi" ? "text-[#055BDA]" : "text-[#64748B]"} />
                <span className={`font-semibold text-[17px] ${paymentMethod === "upi" ? "text-[#055BDA]" : "text-[#64748B]"}`}>UPI</span>
              </div>
              {paymentMethod === "upi" && <FiCheckCircle size={16} className="text-[#055BDA]" />}
            </button>
          </div>

          {/* Card Form */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              {/* Card Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-[#475569]">Card Number <span className="text-red-500">*</span></label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="xxxx xxxx xxxx xxxx" className={inputBaseStyle} />
              </div>

              {/* Cardholder Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-[#475569]">Cardholder Name <span className="text-red-500">*</span></label>
                <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleChange} placeholder="John Carter" className={inputBaseStyle} />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-[#475569]">Expiry Date <span className="text-red-500">*</span></label>
                  <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" className={inputBaseStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-[#475569]">CVV <span className="text-red-500">*</span></label>
                  <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength={4} className={inputBaseStyle} />
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-[#EBE7FF] border border-[#CAC5FF] rounded-xl px-4 py-6 flex items-start gap-2.5">
              <span className="text-[#1E05DA] text-[16px]">🔒</span>
              <p className="text-[14px] text-[#1E05DA] leading-[1.2]">Your payment information is encrypted and secure. We never store your full card details.</p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="border border-[#CBD5E1] text-[#475569] font-medium text-[14px] px-5 h-12 rounded-[10px] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePay}
                disabled={loading}
                className="bg-[#055BDA] text-white font-semibold text-[16px] px-5 h-12 rounded-xl hover:bg-[#044a9e] disabled:opacity-50 transition-colors"
              >
                {loading ? "Processing..." : `Pay ₹${total.toLocaleString()}.00`}
              </button>
            </div>
          </div>
        </div>

        {/* Right - Payment Summary */}
        <div className="bg-[#475569] rounded-xl p-6 w-full max-w-[628px] h-fit">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-white text-[20px]">Payment Summary</span>
              <span className="text-[#EEEEEE]/90 text-[17px]">Plan Price</span>
            </div>

            <div className="h-px bg-white"></div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[#EEEEEE]/90 text-[17px]">Premium Plan</span>
                <span className="text-white/90 font-semibold text-[17px]">₹{basePrice}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#EEEEEE]/90 text-[17px]">CGST</span>
                <span className="text-white/90 font-semibold text-[17px]">+₹{cgst}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#EEEEEE]/90 text-[17px]">SGST</span>
                <span className="text-white/90 font-semibold text-[17px]">+₹{sgst}.00</span>
              </div>
            </div>

            <div className="h-px bg-white"></div>

            <div className="flex justify-between items-center">
              <span className="text-white/90 font-semibold text-[17px]">Total Amount</span>
              <span className="text-white/90 font-semibold text-[24px]">₹{total.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

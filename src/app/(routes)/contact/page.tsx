"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, ArrowRight, Leaf } from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    productInterest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after successful submission
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        productInterest: "",
      });

      // Reset success message after some time
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dynamic animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-white z-0"></div>

        {/* Animated floating leaves */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Large blurred gradient blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-300/20 to-green-100/5 -translate-y-1/3 translate-x-1/4 blur-3xl animate-slow-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-green-200/20 to-emerald-100/10 translate-y-1/3 -translate-x-1/4 blur-3xl animate-slow-pulse-delay"></div>
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-emerald-200/10 to-green-100/5 -translate-y-1/2 blur-2xl animate-slow-float"></div>

          {/* Leaf 1 - Top right */}
          <div className="absolute top-[15%] right-[10%] opacity-20 animate-slow-float">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21,4c0,0-3-3-9-3S3,4,3,4s3,3,9,3S21,4,21,4z M3,4c0,0,3,9,9,9s9-9,9-9" stroke="#2E7D32" strokeWidth="1.5" />
              <path d="M12,13v8M8,17h8" stroke="#2E7D32" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Leaf 2 - Bottom left */}
          <div className="absolute bottom-[20%] left-[15%] opacity-20 animate-slow-float-delay">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21,4c0,0-3-3-9-3S3,4,3,4s3,3,9,3S21,4,21,4z M3,4c0,0,3,9,9,9s9-9,9-9" stroke="#2E7D32" strokeWidth="1.5" />
              <path d="M12,13v8M8,17h8" stroke="#2E7D32" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Leaf 3 - Middle */}
          <div className="absolute top-[50%] right-[25%] opacity-15 animate-slow-float-reverse">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21,4c0,0-3-3-9-3S3,4,3,4s3,3,9,3S21,4,21,4z M3,4c0,0,3,9,9,9s9-9,9-9" stroke="#2E7D32" strokeWidth="1.5" />
              <path d="M12,13v8M8,17h8" stroke="#2E7D32" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('/images/grid-pattern.svg')",
            backgroundSize: "30px 30px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center center"
          }}>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-md">
                <Leaf className="mr-1.5 h-3.5 w-3.5" />
                {t('contact.intro', 'Contact TP@CK')}
              </span>
            </motion.div>

            <motion.h1
              className="heading-xl text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch with Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Experts</span>
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have questions about TP@CK solutions? Want to request a demo or get a quote?
              Our team is ready to assist you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Dynamic background with eco-tech pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white z-0"></div>

        {/* Hexagon pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='%23217346' fill-opacity='0.15'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat"
          }}>
        </div>

        {/* Animated gradient accents */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-green-200/10 to-transparent blur-3xl animate-slow-pulse-delay"></div>
          <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-green-100/10 to-transparent blur-2xl animate-slow-pulse"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-10 border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="heading-md mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500">Request a Demo or Information</h2>

                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. One of our team members will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-800 mb-1">
                          First Name*
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-800 mb-1">
                          Last Name*
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                          Email Address*
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-800 mb-1">
                        Company Name*
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="productInterest" className="block text-sm font-medium text-gray-800 mb-1">
                        Product Interest
                      </label>
                      <select
                        id="productInterest"
                        name="productInterest"
                        value={formState.productInterest}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select a product</option>
                        <option value="T20">TP@CK T20</option>
                        <option value="T30">TP@CK T30</option>
                        <option value="T50">TP@CK T50</option>
                        <option value="custom">Custom Solution</option>
                        <option value="multiple">Multiple Products</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                        Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 h-auto shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Information Column */}
            <div>
              <motion.div
                className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white rounded-xl p-8 md:p-10 h-full shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Dynamic background elements */}
                <div className="absolute inset-0 z-0">
                  {/* Glowing accent in top right */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full filter blur-xl"></div>

                  {/* Circuit-like pattern overlay */}
                  <div className="absolute inset-0 z-0 opacity-10"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='white' stroke-width='1' d='M10,30 L90,30 M30,10 L30,90 M50,10 L50,40 L70,40 L70,60 L50,60 L50,90 M10,70 L90,70'/%3E%3Ccircle cx='30' cy='30' r='3' fill='white' opacity='0.5'/%3E%3Ccircle cx='50' cy='40' r='3' fill='white' opacity='0.5'/%3E%3Ccircle cx='70' cy='40' r='3' fill='white' opacity='0.5'/%3E%3Ccircle cx='30' cy='70' r='3' fill='white' opacity='0.5'/%3E%3Ccircle cx='50' cy='60' r='3' fill='white' opacity='0.5'/%3E%3Ccircle cx='70' cy='60' r='3' fill='white' opacity='0.5'/%3E%3C/svg%3E\")",
                      backgroundSize: "50px 50px"
                    }}>
                  </div>

                  {/* Subtle diagonal lines */}
                  <div className="absolute inset-0 z-0 opacity-5"
                    style={{
                      backgroundImage: "linear-gradient(45deg, white 1%, transparent 1%, transparent 49%, white 49%, white 51%, transparent 51%, transparent 99%, white 99%)",
                      backgroundSize: "20px 20px"
                    }}>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-6 relative z-10">Contact Information</h2>

                <div className="space-y-8 relative z-10">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-white flex-shrink-0 mt-1 filter drop-shadow-md" />
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <p className="text-white/90">Mobile: +33 (0) 6 63 40 60 08</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-white flex-shrink-0 mt-1 filter drop-shadow-md" />
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-white/90">mathieu.guihard@tecnimodern.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-white flex-shrink-0 mt-1 filter drop-shadow-md" />
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="text-white/90">
                        ZAC "Des Grandes Terres"<br />
                        42260 Saint GERMAIN LAVAL<br />
                        France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 relative z-10">
                  <h3 className="font-semibold mb-4">Office Hours</h3>
                  <p className="text-white/90">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p className="text-white/90">24/7 Technical Support Available</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  const [mailStatus, setMailStatus] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const MessageRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!NameRef.current || !EmailRef.current || !MessageRef.current) return;
    const name = NameRef.current.value;
    const email = EmailRef.current.value;
    const message = MessageRef.current.value;
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('🙄 Invalid Email ID!');
      }
      setIsLoading(true);
      const mailRes = await emailjs.send(
        "service_ehi6o84",
        "template_dqs772k",
        templateParams,
        "1s4mrxx8_FOwtauF4"
      );
      if (mailRes.status !== 200) {
        throw new Error("😵 Message not Sent");
      }
      setMailStatus({ status: true, message: "👍 Message Sent!" });
      setIsLoading(false);
      NameRef.current.value = "";
      EmailRef.current.value = "";
      MessageRef.current.value = "";
    } catch (error) {
      setMailStatus({ status: false, message: error.message });
    } finally {
      setTimeout(() => {
        setMailStatus({ status: false, message: "" });
      }, 3000);
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          title={"Contact"}
          text={`Got a question?
            WE’D love to hear from you!`}        
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex flex-col px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-6 mt-4">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                daniyalkhawar41@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +923039296741
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-16">
          <form onSubmit={handleFormSubmit} className="bg-white/80 rounded-xl w-full max-w-md px-6 py-8 flex flex-col gap-6 shadow-lg">
            <label htmlFor="name" className="w-full flex flex-col px-1 py-2 text-black font-semibold">
              Name
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                className="w-full p-3 mt-2 rounded-md border border-gray-300 outline-none bg-white text-black focus:border-primary"
                autoComplete='name'
                required
                ref={NameRef}
              />
            </label>
            <label htmlFor="email" className="w-full flex flex-col px-1 py-2 text-black font-semibold">
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full p-3 mt-2 rounded-md border border-gray-300 outline-none bg-white text-black focus:border-primary"
                autoComplete='email'
                required
                ref={EmailRef}
              />
            </label>
            <label htmlFor="message" className="w-full flex flex-col px-1 py-2 text-black font-semibold">
              Message
              <textarea
                rows={5}
                id="message"
                name="message"
                placeholder="Enter your Message"
                className="w-full p-3 mt-2 rounded-md border border-gray-300 outline-none bg-white text-black resize-none focus:border-primary"
                ref={MessageRef}
              />
            </label>
            <div className="w-full flex justify-start items-center gap-4 mt-2">
              <button
                className="flex gap-2 border-none bg-primary text-black font-semibold py-2 px-8 rounded-md shadow hover:bg-primary/90 transition"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span>Sending</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg>
                  </>
                )}
              </button>
              <span className="text-black font-medium">{mailStatus.message}</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

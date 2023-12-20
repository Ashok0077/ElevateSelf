import React, { useState } from "react";
import subscribeImage from "../assets/subscribeImage.jpg";

const Subscribe = () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwKY6aHQQO-RPAA5ZLqeK0upQDr5oIMkttpwvLOhYFUNVn7XPq0N8dWanHtlXmHYX-syg/exec';

  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
      });

      console.log('Success!', response);

      // Clear the input field after successful submission
      setEmail('');

      // Display success message
      setSuccessMessage('Successfully subscribed!');

      // Hide success message after a few seconds (e.g., 5 seconds)
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error('Error!', error.message);
    }
  };

  return (
    <>
      <svg
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>

      <section className="relative bg-[#0d2436] px-5">
        <div className="container grid grid-cols-12 mx-auto py-10 md:pb-20 lg:place-items-center">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left">
            Subscribe to us and receive personalized motivational quotes based on your interests, ensuring that you start each day with the inspiration to make it extraordinary.
            </h2>
            
              <form className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="px-4 py-3 rounded-lg w-full placeholder:text-dark-light"
                  name="Email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="px-4 py-3 rounded-lg w-full bg-[#1565d8] text-white font-bold md:w-fit md:whitespace-nowrap">
                  Get started
                </button>
              </form>
              {successMessage && (
                <p className="text-green-500 text-sm mt-2">
                  {successMessage}
                </p>
              )}
            
            <p className="text-[#B3BAC5]  text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left">
              <span className="font-bold italic text-[#B3BAC5] md:not-italic md:font-normal md:text-dark-light">
                Get a response tomorrow
              </span>{" "}
              Make sure to subscribe so that we can assist you on your journey.
            </p>
          </div>
          <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
            <div className="w-3/4 mx-auto relative">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]" />
              <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]" />
              <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                <img
                  src={subscribeImage}
                  alt="title"
                  className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                />
                <div className="p-5">
                  <h2 className="font-roboto font-bold text-xl text-[#183b56] md:text-2xl lg:text-[28px]">
                    Feed of the day
                  </h2>
                  <p className="text-[#5a7184] mt-3 text-sm md:text-lg">
                  Embrace the journey, ignite your passion, <br/> and let your resilience be the light that guides <br/> you through any darkness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;

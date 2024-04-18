import React from "react";
import "./Testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay, Pagination,  } from "swiper";
import "swiper/css/pagination";
import profilePic1 from "../../img/profile1.jpg";
import profilePic2 from "../../img/profile2.jpg";
import profilePic3 from "../../img/profile3.jpg";
import profilePic4 from "../../img/profile4.jpg";

const Testimonial = () => {
  const clients = [
    {
      img: profilePic1,
      name:"Nathaniel Heutmaker",
      review:"Hina was easy to work with. She was very personable and did the job quickly. She wanted me to be able to leverage her services for the betterment of my company and website in order to take full advantage of the opportunities of the tools that I had chosen and advised me on how to do so. She understood my goals with ease and was a delight to work with.",
    },
    {
      img: profilePic2,
      name:"Simone Martins",
      review:
        "Hina, is an excellent professional. She designed a beautiful flyer for my business with an outstanding artwork and in a timely manner. Thank you, we will working together in my next endeavour and I am also recommending you to my fellow business owners",
    },
    {
      img: profilePic3,
      name:"Daniel Herrada",
      review:
        "I had the pleasure of working with Hina on a project recently, and I couldn't be more impressed with her exceptional services. From start to finish, Hina exhibited a level of professionalism, creativity, and dedication that exceeded my expectations.",
    },
  ];

  return (
    <div className="t-wrapper" id="testimonial">
      <div className="t-heading">
        <span>Clients always get </span>
        <span>Exceptional Work </span>
        <span>from me...</span>
      <div className="blur t-blur1" style={{ background: "var(--purple)" }}></div>
      <div className="blur t-blur2" style={{ background: "skyblue" }}></div>

      </div>
      <Swiper
        // install Swiper modules
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
       >
        {clients.map((client, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="testimonial">
                {/* <img src={client?.img} alt="" /> */}
                <span>{client.review}</span>
                <div style={{marginTop:'10px'}}>{client?.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Testimonial;

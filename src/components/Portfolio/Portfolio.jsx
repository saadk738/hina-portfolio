import React, { useContext } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import Sidebar from "../../img/sidebar.png";
import Ecommerce from "../../img/ecommerce.png";
import HOC from "../../img/hoc.png";
import MusicApp from "../../img/musicapp.png";
import projectImg1 from '../../img/projectImg1.jpeg';
import projectImg2 from '../../img/projectImg2.jpeg';
import projectImg3 from '../../img/projectImg3.jpeg';
import { themeContext } from "../../Context";
const Portfolio = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="portfolio" id="portfolio">
      {/* heading */}
      <span style={{color: darkMode?'white': ''}}>Recent Projects</span>
      <span>Portfolio</span>

      {/* slider */}
      <Swiper
        spaceBetween={30}
        slidesPerView={'auto'}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        className="portfolio-slider"
      >
        <SwiperSlide>
          <a href="https://www.laufcycles.com/" target="_blank">
          <img src={projectImg1} alt="img"  />
          </a>
        </SwiperSlide>
        <SwiperSlide>
        <a href="https://chumbivalley.com/" target="_blank">
          <img src={projectImg2} alt="img"  />
          </a>
        </SwiperSlide>
          <SwiperSlide>
          <a href="https://alfredservice.com/" target="_blank">
            <img src={projectImg3} alt="img"  />
            </a>
          </SwiperSlide>
        <SwiperSlide>
          <img src={HOC} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Portfolio;

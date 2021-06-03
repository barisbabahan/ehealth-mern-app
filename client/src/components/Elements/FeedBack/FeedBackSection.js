import React from "react";
import Slider from "react-slick";
import BillGatesImg from "../../../images/feedbacks/bill-gates.jpeg";
import ElonMusk from "../../../images/feedbacks/elon-musk.png";
import SteveJobs from "../../../images/feedbacks/steve-jobs.png";
import FeedBackBg from "../../../images/feedbacks/feedback-bg.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeedBackSection.css";

const FeedBackCard = ({ imgSrc, name }) => {
  return (
    <div className="feedback-cards-container ">
      <div className="feedback-card-image">
        <img src={imgSrc} alt={name} />
      </div>
      <div className="feedback-content">
        Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolor
        magna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum.
        Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolor
        magna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum.
        <p className="feedback-author">- {name}</p>
      </div>
    </div>
  );
};

const FeedbacksJson = [
  { name: "Bill Gates", img: BillGatesImg },
  { name: "Steve Jobs", img: SteveJobs },
  { name: "Elon Musk", img: ElonMusk },
];

const FeedBackSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <div className="feedback-root-container">
      <div>
        <h1 className="section-title ">Feedbacks From Patients</h1>
      </div>
      <div className="feedbacks-container">
        <img
          className="feedback-bg-image"
          src={FeedBackBg}
          alt="feedback bg banner"
        />
        <Slider {...settings}>
          {FeedbacksJson.map((feedback, i) => (
            <FeedBackCard key={i} name={feedback.name} imgSrc={feedback.img} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeedBackSection;

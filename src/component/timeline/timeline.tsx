import React from "react";
import "../App.scss"; // SCSS 변수 사용 위해 import

export const Timeline = () => {
  const photos = [
    {
      date: "2019.03.02",
      caption: "처음 만난 날 💕",
      img: "/images/love1.jpg",
    },
    {
      date: "2020.05.17",
      caption: "첫 여행 ✈️",
      img: "/images/love2.jpg",
    },
    {
      date: "2021.09.25",
      caption: "함께한 1000일 🌸",
      img: "/images/love3.jpg",
    },
    {
      date: "2023.02.14",
      caption: "결혼을 약속한 날 💍",
      img: "/images/love4.jpg",
    },
  ];

  return (
    <div className="card timeline">
      <h2>우리의 시간</h2>
      <div className="timeline-gallery">
        {photos.map((p, i) => (
          <div key={i} className="timeline-item">
            <img src={p.img} alt={p.caption} />
            <div className="timeline-caption">
              <p className="date">{p.date}</p>
              <p className="text">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

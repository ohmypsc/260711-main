import React from "react";
import "../index.scss";

export const Timeline = () => {
  const photos = [
    {
      date: "2024.가을",
      caption: "처음 만난 날 💕",
      img: "/images/love1.png",
    },
    {
      date: "2025.봄",
      caption: "꽃놀이 🩷",
      img: "/images/love2.png",
    },
    {
      date: "2025.여름",
      caption: "여행 ✈️",
      img: "/images/love3.jpg",
    },
    {
      date: "2026.여름",
      caption: "결혼합니다",
      img: "/images/love4.png",
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

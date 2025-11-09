import { LazyDiv } from "../lazyDiv";

export const Timeline = () => {
  const photos = [
    {
      date: "2024.가을",
      caption: "처음 만난 날 💕",
      img: `${import.meta.env.BASE_URL}love1.png`,
    },
    {
      date: "2025.봄",
      caption: "꽃놀이 🩷",
      img: `${import.meta.env.BASE_URL}love2.png`,
    },
    {
      date: "2025.여름",
      caption: "여행 ✈️",
      img: `${import.meta.env.BASE_URL}love3.jpg`,
    },
    {
      date: "2026.여름",
      caption: "결혼합니다 💍",
      img: `${import.meta.env.BASE_URL}love4.png`,
    },
  ];

  return (
    <LazyDiv className="card timeline">
      <h2>우리의 시간</h2>

      <div className="break" />

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
    </LazyDiv>
  );
};

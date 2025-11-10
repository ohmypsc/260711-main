import { LazyDiv } from "../lazyDiv";
import "./index.scss";

export const Timeline = () => {
  const items = [
    {
      year: "2021",
      text: "처음 만난 날 💕",
      img: `${import.meta.env.BASE_URL}love1.png`,
    },
    {
      year: "2022",
      text: "함께한 시간 🌿",
      img: `${import.meta.env.BASE_URL}love2.png`,
    },
    {
      year: "2023",
      text: "프로포즈 💍",
      img: `${import.meta.env.BASE_URL}love3.jpg`,
    },
    {
      year: "2024",
      text: "우리, 결혼합니다 🌸",
      img: `${import.meta.env.BASE_URL}love4.png`,
    },
  ];

  return (
    <LazyDiv className="card timeline">
      <h2>우리의 시간</h2>
      <div className="timeline-gallery">
        {items.map((item, i) => (
          <div
            key={i}
            className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <div className="circle-image">
                <img src={item.img} alt={item.text} />
              </div>
              <div className="timeline-text">
                <p className="year">{item.year}</p>
                <p className="caption">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LazyDiv>
  );
};

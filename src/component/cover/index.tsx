import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

const DAY_OF_WEEK = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
]

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      {/* 날짜 */}
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>

      {/* 요일 (한글로 표시) */}
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>

      {/* 이미지 제거 — 대신 높이 유지 */}
      <div
        className="image-wrapper"
        style={{
          width: "100%",
          height: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--theme-bg-color)",
        }}
      >
        <span style={{ opacity: 0.5, fontSize: "1rem" }}>
          {/* placeholder */}
        </span>
      </div>

      {/* 안내 문구 */}
      <div className="subtitle">Save the date for the wedding of</div>

      {/* 이름 */}
      <div className="names">
        {GROOM_FULLNAME}
        <div className="divider" />
        {BRIDE_FULLNAME}
      </div>

      {/* 날짜 + 장소 */}
      <div className="info">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</div>
      <div className="info">{LOCATION}</div>
    </LazyDiv>
  )
}

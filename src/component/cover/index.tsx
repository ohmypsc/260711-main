import {
  BRIDE_FULLNAME,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  BRIDE_TITLE,
  GROOM_FULLNAME,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"

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
    <div className="card cover fade-in">
      {/* 날짜 */}
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>

      {/* 요일 */}
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>

      {/* 서브타이틀 */}
      <div className="subtitle">Wedding Day</div>

      {/* 이름 */}
      <div className="names">
        {GROOM_FULLNAME}
        <div className="divider" />
        {BRIDE_FULLNAME}
      </div>

      {/* 날짜 + 장소 */}
      <div className="info">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</div>
      <div className="info">{LOCATION}</div>

      {/* 가족 정보 */}
      <div className="family">
        <div className="name">
          {GROOM_FATHER} · {GROOM_MOTHER}
          <span className="relation">
            의 <span className="relation-name">{GROOM_TITLE}</span>
          </span>{" "}
          {GROOM_FULLNAME}
        </div>
        <div className="name">
          {BRIDE_FATHER} · {BRIDE_MOTHER}
          <span className="relation">
            의 <span className="relation-name">{BRIDE_TITLE}</span>
          </span>{" "}
          {BRIDE_FULLNAME}
        </div>
      </div>
    </div>
  )
}

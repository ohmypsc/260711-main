import { useEffect, useMemo, useState } from "react"
import {
  BRIDE_FIRSTNAME,
  GROOM_FIRSTNAME,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

export const Calendar = () => {
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

  const dayDiff = useMemo(() => {
    const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
    return Math.ceil((tsDiff - dayOffset) / 1000 / 60 / 60 / 24)
  }, [tsDiff])

  useEffect(() => {
    const interval = setInterval(() => {
      setTsDiff(WEDDING_DATE.diff())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const diffs = useMemo(() => {
    const tsDiffAbs = Math.abs(tsDiff)
    const seconds = Math.floor((tsDiffAbs % 60000) / 1000)
    const minutes = Math.floor((tsDiffAbs % 3600000) / 60000)
    const hours = Math.floor((tsDiffAbs % 86400000) / 3600000)
    const days = Math.floor(tsDiffAbs / 86400000)
    const isAfter = tsDiff < 0
    return { days, hours, minutes, seconds, isAfter }
  }, [tsDiff])

  return (
    <LazyDiv className="card calendar">
      <h2>결혼식 날</h2>
      <div className="break" />
      <span className="wedding-date-text">
        {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
      </span>

      {/* 📅 달력 */}
      <div className="calendar-wrapper">
        {/* 요일 헤더 */}
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <div key={i} className={`head ${i === 0 ? "holiday" : ""}`}>
            <span>{d}</span>
          </div>
        ))}

        {/* 빈칸 채우기 */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 날짜 렌더링 */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1
          const classes: string[] = []
          const isWeddingDate = date === WEDDING_DATE.date()
          if (isWeddingDate) classes.push("wedding-date")

          return (
            <div key={i} className={classes.join(" ")}>
              <span>{date}</span>
              {/* ✨ 결혼식 날짜 강조용 스파클 */}
              {isWeddingDate && (
                <div className="sparkles">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 💞 카운트다운 */}
      <div className="countdown-wrapper">
        <div className="message">
          {GROOM_FIRSTNAME} & {BRIDE_FIRSTNAME}의 결혼식이
          <br />
          {dayDiff === 0 ? (
            <>오늘입니다 🎉</>
          ) : (
            <>
              <span className="d-day">
                <span className="pair">
                  <span className="number">{diffs.days}</span>
                  <span className="unit">일</span>
                </span>
                <span className="pair">
                  <span className="number">{diffs.hours}</span>
                  <span className="unit">시간</span>
                </span>
                <span className="pair">
                  <span className="number">{diffs.minutes}</span>
                  <span className="unit">분</span>
                </span>
                <span className="pair">
                  <span className="number">{diffs.seconds}</span>
                  <span className="unit">초</span>
                </span>
              </span>
              <br />
              {diffs.isAfter ? "지났습니다." : "남았습니다."}
            </>
          )}
        </div>
      </div>
    </LazyDiv>
  )
}

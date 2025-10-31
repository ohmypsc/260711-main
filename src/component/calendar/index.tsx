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
  }, []) // ✅ 의존성 배열 추가 (불필요한 재등록 방지)

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
      {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}

      <div className="calendar-wrapper">
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
          const isSunday = (i + firstDayOfWeek) % 7 === 0
          if (isSunday) classes.push("holiday")

          const isWeddingDate = date === WEDDING_DATE.date()
          if (isWeddingDate) classes.push("wedding-date")

          return (
            <div key={i} className={classes.join(" ")}>
              <span>{date}</span>
              {isWeddingDate && <div className="heart" />}
            </div>
          )
        })}
      </div>

      {/* 카운트다운 영역 */}
      <div className="countdown-wrapper">
        <div className="countdown">
          <div className="unit">DAY</div>
          <div />
          <div className="unit">HOUR</div>
          <div />
          <div className="unit">MIN</div>
          <div />
          <div className="unit">SEC</div>

          <div className="count">{diffs.days}</div>
          <span>:</span>
          <div className="count">{diffs.hours}</div>
          <span>:</span>
          <div className="count">{diffs.minutes}</div>
          <span>:</span>
          <div className="count">{diffs.seconds}</div>
        </div>

        <div className="message">
          {GROOM_FIRSTNAME} & {BRIDE_FIRSTNAME}의 결혼식이{" "}
          {dayDiff > 0 ? (
            <>
              <span className="d-day">{dayDiff}</span>일 남았습니다.
            </>
          ) : dayDiff === 0 ? (
            <>오늘입니다.</>
          ) : (
            <>
              <span className="d-day">{-dayDiff}</span>일 지났습니다.
            </>
          )}
        </div>
      </div>
    </LazyDiv>
  )
}

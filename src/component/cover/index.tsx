import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
  GROOM_FATHER,
  GROOM_MOTHER,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"
import { Fragment } from "react/jsx-runtime"

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
  const { openModal, closeModal } = useModal()

  const handleContact = () => {
    openModal({
      className: "contact-modal",
      closeOnClickBackground: true,
      header: (
        <div className="title-group">
          <div className="title">축하 인사 전하기</div>
          <div className="subtitle">전화 또는 문자 메시지로 축하 인사를 전해보세요.</div>
        </div>
      ),
      content: (
        <>
          <div className="contact-info">
            <div className="relation">신랑측</div>
            <div>{GROOM_FATHER} · {GROOM_MOTHER}의 {GROOM_TITLE}</div>
            <div>{GROOM_FULLNAME}</div>
            <div className="icon-row">
              <PhoneIcon className="flip icon" onClick={() => window.open(`tel:01000000000`, "_self")} />
              <EnvelopeIcon className="icon" onClick={() => window.open(`sms:01000000000`, "_self")} />
            </div>
          </div>

          <div className="contact-info">
            <div className="relation">신부측</div>
            <div>{BRIDE_FATHER} · {BRIDE_MOTHER}의 {BRIDE_TITLE}</div>
            <div>{BRIDE_FULLNAME}</div>
            <div className="icon-row">
              <PhoneIcon className="flip icon" onClick={() => window.open(`tel:01000000000`, "_self")} />
              <EnvelopeIcon className="icon" onClick={() => window.open(`sms:01000000000`, "_self")} />
            </div>
          </div>
        </>
      ),
      footer: (
        <Button
          buttonStyle="style2"
          className="bg-light-grey-color text-dark-color"
          onClick={closeModal}
        >
          닫기
        </Button>
      ),
    })
  }

  return (
    <div className="card cover">
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
          {GROOM_FATHER} · {GROOM_MOTHER}의 <span className="relation-name">{GROOM_TITLE}</span> {GROOM_FULLNAME}
        </div>
        <div className="name">
          {BRIDE_FATHER} · {BRIDE_MOTHER}의 <span className="relation-name">{BRIDE_TITLE}</span> {BRIDE_FULLNAME}
        </div>
      </div>

      {/* 연락하기 버튼 */}
      <button onClick={handleContact}>
        <span className="icon">💐</span>
        <span>축하 인사 전하기</span>
      </button>
    </div>
  )
}

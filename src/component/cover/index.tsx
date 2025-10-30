import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
  BRIDE_INFO,
  GROOM_INFO,
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

  // ✅ 연락 모달 열기 함수
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
          {/* 신랑측 */}
          <div className="contact-info">
            {GROOM_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div>
                    <PhoneIcon
                      className="flip icon"
                      onClick={() => window.open(`tel:${phone}`, "_self")}
                    />
                    <EnvelopeIcon
                      className="icon"
                      onClick={() => window.open(`sms:${phone}`, "_self")}
                    />
                  </div>
                </Fragment>
              )
            )}
          </div>

          {/* 신부측 */}
          <div className="contact-info">
            {BRIDE_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div>
                    <PhoneIcon
                      className="flip icon"
                      onClick={() => window.open(`tel:${phone}`, "_self")}
                    />
                    <EnvelopeIcon
                      className="icon"
                      onClick={() => window.open(`sms:${phone}`, "_self")}
                    />
                  </div>
                </Fragment>
              )
            )}
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

      {/* 연락하기 버튼 */}
      <button onClick={handleContact}>
        <span className="icon">💐</span>
        <span>축하 인사 전하기</span>
      </button>
    </div>
  )
}

import { useState, Fragment } from "react"
import {
  BRIDE_INFO,
  GROOM_INFO,
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"

export const Cover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <LazyDiv className="card cover">
      <h2 className="subtitle">Wedding Invitation</h2>

      <div className="names">
        <span>{GROOM_FULLNAME}</span>
        <div className="divider" />
        <span>{BRIDE_FULLNAME}</span>
      </div>

      <div className="wedding-date">
        <span>2025. 05. 18</span>
        <div className="divider" />
        <span>12:00 PM</span>
      </div>

      <div className="wedding-day-of-week">일요일</div>
      <div className="info">세종컨벤션센터 2층 예식홀</div>

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

      <Button onClick={() => setIsModalOpen(true)}>연락하기</Button>

      {isModalOpen && (
        <div className="cover-modal" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header">
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              />
              <div className="title">축하 인사 전하기</div>
              <div className="subtitle">
                전화 또는 문자로 따뜻한 마음을 전해주세요.
              </div>
            </div>

            <div className="contact-info">
              {[...GROOM_INFO, ...BRIDE_INFO].map(({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div className="name">{name}</div>
                  <div className="icon">
                    <PhoneIcon className="flip" onClick={() => window.open(`tel:${phone}`, "_self")} />
                    <EnvelopeIcon onClick={() => window.open(`sms:${phone}`, "_self")} />
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="footer">
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </LazyDiv>
  )
}

import { useState, Fragment, useEffect } from "react"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  BRIDE_TITLE,
  GROOM_TITLE,
} from "../../const"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Cover = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // ✅ ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 250)
  }

  return (
    <>
      {/* =============================== */}
      {/* ✅ Cover 본문 */}
      {/* =============================== */}
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

        <Button onClick={() => setIsOpen(true)}>연락하기</Button>
      </LazyDiv>

      {/* =============================== */}
      {/* ✅ 연락하기 모달 */}
      {/* =============================== */}
      {isOpen && (
        <div
          className={`modal-background ${isClosing ? "closing" : ""}`}
          onClick={handleClose}
        >
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <div className="title-group">
                <div className="title">축하 인사 전하기</div>
                <div className="subtitle">
                  전화, 문자메시지로 축하 인사를 전해보세요.
                </div>
              </div>
            </div>

            <div className="content">
              {/* ✅ 신랑 쪽 */}
              <div className="contact-info">
                {GROOM_INFO.filter(({ phone }) => !!phone).map(
                  ({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div className="name">{name}</div>
                      <div className="icon">
                        <PhoneIcon
                          className="flip"
                          onClick={() => window.open(`tel:${phone}`, "_self")}
                        />
                        <EnvelopeIcon
                          onClick={() => window.open(`sms:${phone}`, "_self")}
                        />
                      </div>
                    </Fragment>
                  )
                )}
              </div>

              {/* ✅ 신부 쪽 */}
              <div className="contact-info">
                {BRIDE_INFO.filter(({ phone }) => !!phone).map(
                  ({ relation, name, phone }) => (
                    <Fragment key={relation}>
                      <div className="relation">{relation}</div>
                      <div className="name">{name}</div>
                      <div className="icon">
                        <PhoneIcon
                          onClick={() => window.open(`tel:${phone}`, "_self")}
                        />
                        <EnvelopeIcon
                          onClick={() => window.open(`sms:${phone}`, "_self")}
                        />
                      </div>
                    </Fragment>
                  )
                )}
              </div>
            </div>

            <div className="footer">
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={handleClose}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

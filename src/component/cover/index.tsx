import { Fragment } from "react"
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
import { useModal } from "../modal"

export const Cover = () => {
  const { openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      className: "donation-modal", // ✅ 원작 스타일 클래스
      closeOnClickBackground: true,
      header: (
        <div className="title" style={{ textAlign: "center" }}>
          축하 인사 전하기
        </div>
      ),
      content: (
        <div className="contact-info" style={{ padding: "1rem" }}>
          {[...GROOM_INFO, ...BRIDE_INFO].map(({ relation, name, phone }) => (
            <Fragment key={`${relation}-${name}`}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "8rem 7rem 1fr",
                  alignItems: "center",
                  rowGap: "0.5rem",
                  fontSize: "0.9rem",
                  marginBottom: "0.4rem",
                }}
              >
                <div style={{ textAlign: "right", opacity: 0.7 }}>
                  {relation}
                </div>
                <div style={{ textAlign: "center" }}>{name}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.4rem",
                  }}
                >
                  <PhoneIcon
                    className="flip"
                    onClick={() => window.open(`tel:${phone}`, "_self")}
                    style={{ cursor: "pointer" }}
                  />
                  <EnvelopeIcon
                    onClick={() => window.open(`sms:${phone}`, "_self")}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
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

      <div className="wedding-day-of-week">토요일</div>
      <div className="info">유성컨벤션센터 3층 그랜드홀</div>

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

      <Button onClick={handleOpenModal}>연락하기</Button>
    </LazyDiv>
  )
}

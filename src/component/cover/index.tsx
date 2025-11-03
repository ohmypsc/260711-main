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

  // Invitation 모달 열기 함수
  const handleOpenModal = () => {
    openModal({
      className: "invitation-modal",
      closeOnClickBackground: true,
      header: <div className="title">신랑 · 신부에게 연락하기</div>,
      content: (
        <div className="invitation-contact">
          <p className="intro">
            직접 축하 인사를 전하고 싶으시다면 아래로 연락 부탁드립니다.
          </p>

          <div className="contact-info">
            {[...GROOM_INFO, ...BRIDE_INFO].map(({ relation, name, phone }) => (
              <Fragment key={`${relation}-${name}`}>
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
            ))}
          </div>
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

      <Button onClick={handleOpenModal}>연락하기</Button>
    </LazyDiv>
  )
}

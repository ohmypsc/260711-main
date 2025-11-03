import { Fragment } from "react/jsx-runtime"
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
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Cover = () => {
  const { openModal, closeModal } = useModal()

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

      {/* ✅ Invitation 모달 완전 복제 */}
      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">축하 인사 전하기</div>
                <div className="subtitle">
                  전화, 문자메세지로 축하 인사를 전해보세요.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {GROOM_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() =>
                              window.open(`tel:${phone}`, "_self")
                            }
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() =>
                              window.open(`sms:${phone}`, "_self")
                            }
                          />
                        </div>
                      </Fragment>
                    )
                  )}
                </div>

                <div className="contact-info">
                  {BRIDE_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() =>
                              window.open(`tel:${phone}`, "_self")
                            }
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() =>
                              window.open(`sms:${phone}`, "_self")
                            }
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
        }}
      >
        연락하기
      </Button>
    </LazyDiv>
  )
}

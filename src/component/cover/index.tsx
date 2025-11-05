import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
  GROOM_INFO,
  BRIDE_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { Button } from "../button"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

export const Cover = () => {
  const { openModal, closeModal } = useModal()

  return (
    <LazyDiv className="card cover">
      {/* 이름 */}
      <div className="names">
        {GROOM_FULLNAME}
        <div className="divider" />
        {BRIDE_FULLNAME}
      </div>

      {/* 날짜 + 요일 + 시간 */}
      <div className="wedding-date-line">
        {WEDDING_DATE.format("YYYY.MM.DD")} ({DAY_OF_WEEK[WEDDING_DATE.day()]}){" "}
        {WEDDING_DATE.format("A h시")}
      </div>

      {/* 장소 */}
      <div className="info">{LOCATION}</div>

      {/* 가족관계 */}
      <div className="family-section">
        <div className="name">
          <span className="parent-names">
            {GROOM_FATHER} · {GROOM_MOTHER}의
          </span>{" "}
          <span className="relation-name">{GROOM_TITLE}</span>{" "}
          {GROOM_FULLNAME}
        </div>
        <div className="name">
          <span className="parent-names">
            {BRIDE_FATHER} · {BRIDE_MOTHER}의
          </span>{" "}
          <span className="relation-name">{BRIDE_TITLE}</span>{" "}
          {BRIDE_FULLNAME}
        </div>
      </div>

      {/* 버튼 */}
      <Button
        className="contact-button"
        style={{ width: "90%" }}
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">축하 인사 전하기</div>
                <div className="subtitle">
                  전화, 문자메시지로 축하 인사를 전해보세요.
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {GROOM_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={`g-${relation}`}>
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
                    ),
                  )}
                </div>

                <div className="contact-info">
                  {BRIDE_INFO.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={`b-${relation}`}>
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
                    ),
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

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

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "토요일",
]

export const Cover = () => {
  const { openModal, closeModal } = useModal()

  return (
    <LazyDiv className="card cover flex flex-col items-center text-center px-4 py-6 space-y-4">
      {/* 날짜 */}
      <div className="wedding-date text-3xl font-semibold tracking-wide text-gray-800 leading-snug">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider inline-block mx-1 text-gray-400">·</div>
        {WEDDING_DATE.format("MM")}
        <div className="divider inline-block mx-1 text-gray-400">·</div>
        {WEDDING_DATE.format("DD")}
      </div>

      {/* 요일 */}
      <div className="wedding-day-of-week text-sm text-gray-500 tracking-widest uppercase">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>

      {/* 이름 */}
      <div className="names flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 mt-1 mb-1">
        <span className="text-gray-800">{GROOM_FULLNAME}</span>
        <div className="divider text-gray-400 text-2xl">♥</div>
        <span className="text-gray-800">{BRIDE_FULLNAME}</span>
      </div>

      {/* 날짜 / 장소 */}
      <div className="info text-base text-gray-600 mt-1">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</div>
      <div className="info text-base text-gray-600 mb-2">{LOCATION}</div>

      {/* 가족관계 */}
      <div className="family-section mt-4 pt-4 border-t border-gray-200 w-full text-gray-700 text-sm space-y-2 leading-relaxed">
        <div className="name">
          {GROOM_FATHER} · {GROOM_MOTHER}
          <span className="relation ml-0">
            의 <span className="relation-name font-medium text-gray-800">{GROOM_TITLE}</span>
          </span>{" "}
          <span className="font-semibold text-gray-900">{GROOM_FULLNAME}</span>
        </div>
        <div className="name">
          {BRIDE_FATHER} · {BRIDE_MOTHER}
          <span className="relation ml-0">
            의 <span className="relation-name font-medium text-gray-800">{BRIDE_TITLE}</span>
          </span>{" "}
          <span className="font-semibold text-gray-900">{BRIDE_FULLNAME}</span>
        </div>
      </div>

      {/* 버튼 — 위 요소와 자연스럽게 여백 */}
      <div className="mt-8 w-full flex justify-center">
        <Button
          style={{ width: "90%" }}
          className="transition-all duration-200"
          onClick={() => {
            openModal({
              className: "contact-modal",
              closeOnClickBackground: true,
              header: (
                <div className="title-group">
                  <div className="title text-lg font-semibold">축하 인사 전하기</div>
                  <div className="subtitle text-sm text-gray-500">
                    전화, 문자메시지로 축하 인사를 전해보세요.
                  </div>
                </div>
              ),
              content: (
                <>
                  <div className="contact-info grid grid-cols-3 gap-2 my-3 text-sm text-gray-700">
                    {GROOM_INFO.filter(({ phone }) => !!phone).map(
                      ({ relation, name, phone }) => (
                        <Fragment key={`g-${relation}`}>
                          <div className="relation">{relation}</div>
                          <div>{name}</div>
                          <div>
                            <PhoneIcon
                              className="flip icon cursor-pointer hover:text-blue-600"
                              onClick={() => window.open(`tel:${phone}`, "_self")}
                            />
                            <EnvelopeIcon
                              className="icon cursor-pointer hover:text-green-600"
                              onClick={() => window.open(`sms:${phone}`, "_self")}
                            />
                          </div>
                        </Fragment>
                      ),
                    )}
                  </div>

                  <div className="contact-info grid grid-cols-3 gap-2 my-3 text-sm text-gray-700">
                    {BRIDE_INFO.filter(({ phone }) => !!phone).map(
                      ({ relation, name, phone }) => (
                        <Fragment key={`b-${relation}`}>
                          <div className="relation">{relation}</div>
                          <div>{name}</div>
                          <div>
                            <PhoneIcon
                              className="flip icon cursor-pointer hover:text-blue-600"
                              onClick={() => window.open(`tel:${phone}`, "_self")}
                            />
                            <EnvelopeIcon
                              className="icon cursor-pointer hover:text-green-600"
                              onClick={() => window.open(`sms:${phone}`, "_self")}
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
                  className="bg-light-grey-color text-dark-color mt-2"
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
      </div>
    </LazyDiv>
  )
}

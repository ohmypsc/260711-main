import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useRef, useState } from "react"
import { supabase } from "../../supabaseClient" // ✅ supabase 연결

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  const { openModal } = useModal()
  const now = useRef(dayjs())

  // ✅ 자동 팝업 제거. 버튼만 남김.
  if (WEDDING_DATE.isBefore(now.current)) return null

  return (
    <div className="info-card">
      <div className="label">참석 의사 전달</div>
      <div className="content">
        신랑, 신부에게 참석 의사를
        <br />
        미리 전달할 수 있어요.
      </div>

      <div className="break" />

      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal(attendanceModalInfo)
        }}
      >
        참석 의사 전달하기
      </Button>
    </div>
  )
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const side = inputRef.current.side.groom.checked
            ? "groom"
            : inputRef.current.side.bride.checked
              ? "bride"
              : null
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.undecided.checked
              ? "undecided"
              : inputRef.current.meal.no.checked
                ? "no"
                : null
          const count = Number(inputRef.current.count.value)

          if (!side) return alert("신랑 또는 신부를 선택해주세요.")
          if (!name) return alert("성함을 입력해주세요.")
          if (name.length > RULES.name.maxLength)
            return alert(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
          if (!meal) return alert("식사 여부를 선택해주세요.")
          if (isNaN(count) || count < RULES.count.min)
            return alert(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)

          // ✅ Supabase 저장
          const { error } = await supabase.from("attendance").insert([
            { side, name, meal, count },
          ])

          if (error) throw error

          alert("참석 의사가 성공적으로 전달되었습니다.")
          closeModal()
        } catch (err) {
          console.error(err)
          alert("참석 의사 전달에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">구분</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) => {
                inputRef.current.side.groom = ref as HTMLInputElement
              }}
            />
            <span>신랑</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) => {
                inputRef.current.side.bride = ref as HTMLInputElement
              }}
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">성함</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            placeholder="참석자 성함을 입력해주세요."
            maxLength={RULES.name.maxLength}
            ref={(ref) => {
              inputRef.current.name = ref as HTMLInputElement
            }}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">식사</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) => {
                inputRef.current.meal.yes = ref as HTMLInputElement
              }}
            />
            <span>예정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) => {
                inputRef.current.meal.undecided = ref as HTMLInputElement
              }}
            />
            <span>미정</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="no"
              ref={(ref) => {
                inputRef.current.meal.no = ref as HTMLInputElement
              }}
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">참석 인원 (본인 포함)</div>
        <div>
          <input
            disabled={loading}
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => {
              inputRef.current.count = ref as HTMLInputElement
            }}
          />
          명
        </div>
      </div>
    </form>
  )
}

const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        전달하기
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        닫기
      </Button>
    </>
  )
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <div className="title">참석 의사 전달하기</div>,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2025-07-11 11:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${
  WEDDING_DATE.minute() === 0 ? "" : " m분"
}`

// 예식 당월 휴무일 (캘린더 표시용)
export const HOLIDAYS = [15]

// 📍 장소 정보
export const LOCATION = "유성컨벤션웨딩홀 3층 그랜드홀"
export const LOCATION_ADDRESS = "대전 유성구 온천북로 77"

// 카카오톡 공유 시 표시될 주소
export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 지도 좌표 (유성컨벤션웨딩홀 기준)
export const WEDDING_HALL_POSITION = [127.3514617, 36.3562313]

// 네이버 지도 place ID
export const NMAP_PLACE_ID = 19882195

// 카카오 지도 place ID
export const KMAP_PLACE_ID = 10457235

// 👰 신부 정보
export const BRIDE_FULLNAME = "오미영"
export const BRIDE_FIRSTNAME = "미영"
export const BRIDE_TITLE = "딸"
export const BRIDE_FATHER = "오세진"
export const BRIDE_MOTHER = "박근석"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-2764-0471",
    account: "토스 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-6411-0471",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-9874-0471",
    account: "하나은행 00000000000000",
  },
]

// 🤵 신랑 정보
export const GROOM_FULLNAME = "백승철"
export const GROOM_FIRSTNAME = "승철"
export const GROOM_TITLE = "아들"
export const GROOM_FATHER = "백문기"
export const GROOM_MOTHER = "김경희"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-2614-4179",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]

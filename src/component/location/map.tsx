import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

export const Map = () => {
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div>Map is not available</div>
}

const NaverMap = () => {
  const naver = useNaver()
  const kakao = useKakao()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) return "ios"
    else if (userAgent.match(/(Android)/)) return "android"
    else return "other"
  }

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: WEDDING_HALL_POSITION,
        zoom: 17,
      })
      new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map })
      return () => map.destroy()
    }
  }, [naver])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current)
                clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current)
                clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러 확대·이동이 가능합니다.
              </div>
            )}
          </div>
        )}

        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current)
              clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((prev) => !prev)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        <div className="map-inner" ref={ref}></div>
      </div>

      {/* 🧭 길찾기 버튼 */}
      <div className="navigation">
        <button
          onClick={() => {
            const device = checkDevice()
            if (device === "ios" || device === "android")
              window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
            else
              window.open(
                `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                "_blank",
              )
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>

        <button
          onClick={() => {
            const device = checkDevice()
            if (device === "ios" || device === "android") {
              if (kakao)
                kakao.Navi.start({
                  name: LOCATION,
                  x: WEDDING_HALL_POSITION[0],
                  y: WEDDING_HALL_POSITION[1],
                  coordType: "wgs84",
                })
            } else {
              window.open(
                `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                "_blank",
              )
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>

        <button
          onClick={() => {
            const device = checkDevice()
            if (device === "ios" || device === "android") {
              const params = new URLSearchParams({
                goalx: WEDDING_HALL_POSITION[0].toString(),
                goaly: WEDDING_HALL_POSITION[1].toString(),
                goalName: LOCATION,
              })
              window.open(`tmap://route?${params.toString()}`, "_self")
            } else {
              alert("모바일에서 이용 가능합니다.")
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>

      {/* 🚶 간단 안내문 */}
      <p className="map-guide">유성온천역 도보 약 8분 거리</p>
    </>
  )
}

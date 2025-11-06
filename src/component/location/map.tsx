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
    const ua = window.navigator.userAgent
    if (ua.match(/iPhone|iPod|iPad/)) return "ios"
    if (ua.match(/Android/)) return "android"
    return "other"
  }

  useEffect(() => {
    if (!naver || !ref.current) return
    const map = new naver.maps.Map(ref.current, {
      center: WEDDING_HALL_POSITION,
      zoom: 17,
      draggable: !locked,
      pinchZoom: !locked,
      scrollWheel: !locked,
      keyboardShortcuts: false,
      disableDoubleTapZoom: locked,
    })
    new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map })
    return () => map.destroy()
  }, [naver, locked])

  const handleLockMessage = () => {
    setShowLockMessage(true)
    if (lockMessageTimeout.current) clearTimeout(lockMessageTimeout.current)
    lockMessageTimeout.current = window.setTimeout(
      () => setShowLockMessage(false),
      2500,
    )
  }

  return (
    <>
      <div className="map-wrapper">
        {/* 🔒 터치 잠금 오버레이 */}
        {locked && (
          <div
            className="lock"
            onTouchStart={handleLockMessage}
            onMouseDown={handleLockMessage}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 지도 조작이 잠겨 있습니다.
                <br />
                자물쇠 버튼을 눌러 해제하세요.
              </div>
            )}
          </div>
        )}

        {/* 🔓 잠금 해제 버튼 */}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current)
              clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((v) => !v)
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
      <p className="map-guide"> <br /><b>주차는 무료입니다. <br />돌다리 얘기를 넣을지 말지 너무 고민되는구나</b></p>
    </>
  )
}

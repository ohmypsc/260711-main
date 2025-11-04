import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2>오시는 길</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      <LazyDiv className="card location">
        {/* 🚍 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용 시<br />(돌다리 얘기 넣어 말아 고민고민쓰)
            <br />
            <b>대전 1호선 유성온천역</b> 하차 후 도보 약 8분 거리
            <br />
            또는 <b>시청방면 104, 706번 버스</b> 이용
            <br />
            → <b>유성컨벤션웨딩홀 정류장</b> 하차
            <br />
            <b>웨딩홀 3층 그랜드홀</b>로 오시면 됩니다.
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - 간선버스: 104, 706, 911
            <br />
            - 지선버스: 119, 121, 655
            <br />
            <b>유성온천역 또는 유성컨벤션웨딩홀 정류장</b> 하차 후 도보 이동
            <br />
            유성문화원 방향으로 약 100m 직진하시면 웨딩홀이 보입니다.
          </div>
        </div>

        {/* 🚗 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            내비게이션에서 <b>유성컨벤션웨딩홀</b> 검색
            <br />
            (주소: 대전광역시 유성구 온천북로 77)
            <br />
            <b>유성온천역</b> 사거리에서 약 3분 거리입니다.
            <br />
            웨딩홀 내 전용 주차장이 있으며 <b>무료 주차</b> 가능합니다.
          </div>
          <div />
          <div className="content">
            <b>
              ※ 주차장 진입 시 ‘그랜드홀’ 방향으로 진입하시면
              예식장과 바로 연결됩니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}

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
          <strong>{LOCATION}</strong>
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>

        <Map />
      </LazyDiv>

      <LazyDiv className="card location">
        {/* 🚍 대중교통 */}
        <div className="location-info">
          <BusIcon className="transportation-icon" />
          <div className="heading">대중교통(돌다리얘기넣어말아고민고민</div>

          <div className="content">
            <p><b>유성온천역 (1호선)</b> 하차 후 도보 약 8분</p>
            <p>
              또는 <b>104번 / 706번</b> 버스 이용 →{" "}
              <b>유성컨벤션웨딩홀 정류장</b> 하차
            </p>
            <p><b>웨딩홀 3층 그랜드홀</b>에서 예식이 진행됩니다.</p>
          </div>
        </div>

        {/* 🚗 자가용 */}
        <div className="location-info">
          <CarIcon className="transportation-icon" />
          <div className="heading">자가용</div>

          <div className="content">
            <p>
              내비게이션에서 <b>유성컨벤션웨딩홀</b> 검색  
              <br />(대전 유성구 온천북로 77)
            </p>
            <p className="note">
              주차 요금은 무료입니다.
            </p>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}

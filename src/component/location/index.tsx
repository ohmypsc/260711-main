import { Map } from "./map"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <LazyDiv className="card location">
      <h2>오시는 길</h2>

      <div className="addr">
        <strong>{LOCATION}</strong>
        <div className="detail">{LOCATION_ADDRESS}</div>
      </div>

      <Map /> {/* 지도 + 길찾기 버튼 + 짧은 안내문 포함 */}
    </LazyDiv>
  )
}

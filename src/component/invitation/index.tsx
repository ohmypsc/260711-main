import { LazyDiv } from "../lazyDiv"

export const Invitation = () => {
  return (
    <LazyDiv className="card invitation">
      <h2>모시는 글</h2>

      <div className="break" />

      <div className="inv-content">
        <p>나는 오래된 거리처럼 너를 사랑하고</p>
        <p>별들은 벌들처럼 웅성거리고</p>
      </div>

      <div className="inv-content">
        <p>여름에는 작은 은색 드럼을 치는 것처럼</p>
        <p>네 손바닥을 두드리는 비를 줄게</p>
        <p>과거에게 그랬듯 미래에게도 아첨하지 않을게</p>
      </div>

      <div className="inv-content">
        <p>어린 시절 순결한 비누 거품 속에서 우리가 했던 맹세들을 찾아</p>
        <p>너의 팔에 모두 적어줄게</p>
      </div>

      <div className="inv-content poet">- 진은영, &lt;청혼&gt; 중</div>

      <div className="divider-line" />

      <div className="inv-content">
        <p>오래된 거리처럼 익숙하지만,</p>
        <p>여름 비도 은색 드럼처럼 즐거워하고,</p>
        <p>시간의 흐름에 기대지 않고 서로에게 최선을 다하며,</p>
        <p>어린 시절 순수한 마음으로 서로를 대하는 부부가 되고자 합니다.</p>
        <p>이 시작을 함께해 주신다면 더없이 감사하겠습니다.</p>
      </div>
    </LazyDiv>
  )
}

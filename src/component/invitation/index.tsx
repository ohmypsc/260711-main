import { LazyDiv } from "../lazyDiv"

export const Invitation = () => {
  return (
    <LazyDiv className="card invitation">
      <h2>초대의 글</h2>

      <div className="break" />

      <div className="content">
        나는 오래된 거리처럼 너를 사랑하고 별들은 벌들처럼 웅성거리고
      </div>
      <div className="content">
        여름에는 작은 은색 드럼을 치는 것처럼 네 손바닥을 두드리는 비를 줄게
      </div>
      <div className="content">
        과거에게 그랬듯 미래에게도 아첨하지 않을게
      </div>
      <div className="content">
        어린 시절 순결한 비누 거품 속에서 우리가 했던 맹세들을 찾아
        너의 팔에 모두 적어줄게
      </div>

      <div className="content poet">- 진은영, &lt;청혼&gt; 중</div>

      <div className="break" />

      <div className="content">
        오래된 거리처럼 익숙하지만,<br />
        여름 비도 은색 드럼처럼 즐거워하고,<br />
        시간에게 기대지 않고 서로에게 최선을 다하며,<br />
        어린 시절 순수한 마음으로 서로를 대하는 부부가 되고자 합니다.<br />
        이 시작을 함께해 주신다면 더없이 감사하겠습니다.
      </div>
    </LazyDiv>
  )
}

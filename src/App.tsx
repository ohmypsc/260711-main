import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import { Cover } from "./component/cover";
import { Location } from "./component/location";
import "./App.scss";
import { BGEffect } from "./component/bgEffect";
import { Invitation } from "./component/invitation";
import { Timeline } from "./component/timeline";
import { Calendar } from "./component/calendar";
import { Information } from "./component/information";
import { GuestBook } from "./component/guestbook";
import { LazyDiv } from "./component/lazyDiv";
import { STATIC_ONLY } from "./env";

function App() {
  // ✅ GitHub Pages 배포 환경에서도 동작하도록 보정
  const path = window.location.pathname.replace(import.meta.env.BASE_URL, "");

  // ✅ "/admin" 포함 여부 확인
  if (path.startsWith("admin")) {
    return <AdminPage />;
  }

  // ✅ 기본(청첩장 메인) 렌더링
  return (
    <>
      <div className="background">
        <div className="card-view">
          {/* 표지 + 모시는 글 */}
          <LazyDiv className="card-group">
            <Cover />
            <Invitation />
          </LazyDiv>

          {/* 타임라인 */}
          <LazyDiv className="card-group">
            <Timeline />
          </LazyDiv>

          {/* 결혼식 날짜 */}
          <LazyDiv className="card-group">
            <Calendar />
          </LazyDiv>

          {/* 오시는 길 */}
          <LazyDiv className="card-group">
            <Location />
          </LazyDiv>

          {/* 마음 전하기 + 방명록 */}
          <LazyDiv className="card-group">
            <Information />
            {!STATIC_ONLY && <GuestBook />}
          </LazyDiv>
        </div>
      </div>

      {/* 🌸 꽃잎 효과는 항상 카드 위에 표시되도록 background 밖으로 이동 */}
      <BGEffect />
    </>
  );
}

export default App;

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
  /* ✅ 전체 확대 방지 설정 */
  useEffect(() => {
    // 더블탭 확대 방지
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 핀치 줌 및 제스처 확대 방지
    const preventGesture = (e: Event) => e.preventDefault();

    document.addEventListener("touchend", preventZoom, false);
    document.addEventListener("gesturestart", preventGesture, false);
    document.addEventListener("gesturechange", preventGesture, false);
    document.addEventListener("gestureend", preventGesture, false);

    return () => {
      document.removeEventListener("touchend", preventZoom);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);
  /* ✅ 끝 */

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
          <LazyDiv className="card-group">
            <Cover />
            <Invitation />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Timeline />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Calendar />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Location />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Information />
            {!STATIC_ONLY && <GuestBook />}
          </LazyDiv>
        </div>
      </div>

      <BGEffect />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import { Cover } from "./component/cover";
import { Location } from "./component/location";
import "./App.scss";
import { BGEffect } from "./component/bgEffect";
import { Invitation } from "./component/invitation";
import { Calendar } from "./component/calendar";
import { Information } from "./component/information";
import { GuestBook } from "./component/guestbook";
import { LazyDiv } from "./component/lazyDiv";
import { STATIC_ONLY } from "./env";
import { ModalProvider } from "./component/modal";

/* ===============================
   ✅ 라우터
================================= */
function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleChange);
    return () => window.removeEventListener("popstate", handleChange);
  }, []);

  if (path.endsWith("/admin")) return <AdminPage />;
  return <Home />;
}

/* ===============================
   ✅ 홈 (청첩장 메인 페이지)
================================= */
function Home() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        {/* ✅ Cover (항상 보이도록 설정됨) */}
        <LazyDiv className="card-group">
          <Cover />
        </LazyDiv>

        {/* ✅ 초대 글 */}
        <LazyDiv className="card-group">
          <Invitation />
        </LazyDiv>

        {/* ✅ 달력 */}
        <LazyDiv className="card-group">
          <Calendar />
        </LazyDiv>

        {/* ✅ 오시는 길 */}
        <LazyDiv className="card-group">
          <Location />
        </LazyDiv>

        {/* ✅ 마음 전하기 */}
        <LazyDiv className="card-group">
          <Information />
        </LazyDiv>

        {/* ✅ 방명록 (정적 모드가 아닐 때만 표시) */}
        {!STATIC_ONLY && (
          <LazyDiv className="card-group">
            <GuestBook />
          </LazyDiv>
        )}
      </div>
    </div>
  );
}

/* ===============================
   ✅ 앱 루트
================================= */
export default function App() {
  return (
    <ModalProvider>
      <Router />
    </ModalProvider>
  );
}

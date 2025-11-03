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
   ✅ 라우터 컴포넌트
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
        {/* ✅ Cover는 LazyDiv나 card-group 밖에 단독 배치 */}
        <Cover />

        {/* ✅ 이후 섹션들은 LazyDiv 유지 */}
        <LazyDiv className="card-group">
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Calendar />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Information />
        </LazyDiv>

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
   ✅ 앱 루트 컴포넌트
================================= */
export default function App() {
  return (
    <ModalProvider>
      <Router />
    </ModalProvider>
  );
}

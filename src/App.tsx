import { useEffect, useState } from "react"
import AdminPage from "./AdminPage"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

// ✅ Router 컴포넌트로 관리자 경로 분기
function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleChange = () => setPath(window.location.pathname)
    window.addEventListener("popstate", handleChange)
    return () => window.removeEventListener("popstate", handleChange)
  }, [])

  // ✅ /admin 경로일 때 관리자 페이지 열기
  if (path.endsWith("/admin")) {
    return <AdminPage />
  }

  // ✅ 그 외에는 기본 청첩장 페이지
  return <Home />
}

// ✅ Home 컴포넌트 (기존 청첩장 메인)
function Home() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        {/* 각 섹션을 하나씩 세로로 쌓기 */}
        <LazyDiv className="card-group">
          <Cover />
        </LazyDiv>

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

        <ShareButton />
      </div>
    </div>
  )
}

export default Router

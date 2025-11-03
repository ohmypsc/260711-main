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
import { STATIC_ONLY } from "./env"

function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleChange = () => setPath(window.location.pathname)
    window.addEventListener("popstate", handleChange)
    return () => window.removeEventListener("popstate", handleChange)
  }, [])

  if (path.endsWith("/admin")) return <AdminPage />
  return <Home />
}

function Home() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        {/* ✅ Cover도 LazyDiv 안에 포함 */}
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
      </div>
    </div>
  )
}

export default function App() {
  return <Router />
}

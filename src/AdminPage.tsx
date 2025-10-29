import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [guestbook, setGuestbook] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any[]>([])

  const ADMIN_PASSWORD = "love2026" // ✅ 변경 가능

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert("비밀번호가 올바르지 않습니다.")
    }
  }

  useEffect(() => {
    if (authenticated) loadData()
  }, [authenticated])

  const loadData = async () => {
    const { data: guestbookData } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*")
      .order("created_at", { ascending: false })

    setGuestbook(guestbookData || [])
    setAttendance(attendanceData || [])
  }

  if (!authenticated) {
    return (
      <div style={styles.center}>
        <div style={styles.loginCard}>
          <h2 style={{ marginBottom: 20 }}>관리자 로그인</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              로그인
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💒 관리자 페이지</h1>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>📖 방명록 목록</h2>
        <div style={styles.cardList}>
          {guestbook.length === 0 ? (
            <p style={styles.empty}>아직 작성된 방명록이 없습니다.</p>
          ) : (
            guestbook.map((g) => (
              <div key={g.id} style={styles.card}>
                <h3 style={styles.name}>🧡 {g.name}</h3>
                <p style={styles.content}>{g.content}</p>
                <p style={styles.date}>
                  🕒 {new Date(g.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>💌 참석 의사 목록</h2>
        <div style={styles.cardList}>
          {attendance.length === 0 ? (
            <p style={styles.empty}>아직 참석 의사가 없습니다.</p>
          ) : (
            attendance.map((a) => (
              <div key={a.id} style={styles.card}>
                <h3 style={styles.name}>
                  🎉 {a.name} ({a.side === "groom" ? "신랑 측" : "신부 측"})
                </h3>
                <p>🍽 식사: {mealText(a.meal)}</p>
                <p>👥 인원: {a.count}명</p>
                <p style={styles.date}>
                  🕒 {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

function mealText(meal: string) {
  switch (meal) {
    case "yes":
      return "예정"
    case "undecided":
      return "미정"
    case "no":
      return "불참"
    default:
      return "-"
  }
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#fff7f5",
    fontFamily: "Noto Sans KR, sans-serif",
  },
  loginCard: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: 400,
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: "100%",
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 12,
  },
  button: {
    width: "100%",
    padding: "10px 18px",
    fontSize: 16,
    borderRadius: 6,
    background: "#ff8a80",
    color: "white",
    border: "none",
  },
  container: {
    padding: "20px 10px",
    fontFamily: "Noto Sans KR, sans-serif",
    background: "#fffaf8",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 40,
  },
  subtitle: {
    marginBottom: 10,
    color: "#e57373",
  },
  cardList: {
    display: "grid",
    gap: "12px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  card: {
    background: "white",
    borderRadius: 10,
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    padding: 15,
  },
  name: {
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    marginBottom: 8,
    lineHeight: 1.4,
  },
  date: {
    color: "#777",
    fontSize: 13,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
  },
}

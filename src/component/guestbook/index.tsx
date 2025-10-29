import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../button"
import { dayjs } from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { createClient } from "@supabase/supabase-js"

// 🔑 Supabase 연결 (.env 값 사용)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

const RULES = {
  name: { maxLength: 10 },
  content: { maxLength: 100 },
  password: { minLength: 4, maxLength: 20 },
}

const PAGES_PER_BLOCK = 5
const POSTS_PER_PAGE = 5

type Post = {
  id: number
  timestamp: number
  name: string
  content: string
}

export const GuestBook = () => {
  const { openModal, closeModal } = useModal()
  const [posts, setPosts] = useState<Post[]>([])

  // 🔹 글 불러오기
  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("id, name, content, created_at")
        .order("created_at", { ascending: false })
        .limit(3)

      if (error) throw error

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name,
        content: item.content,
        timestamp: Math.floor(new Date(item.created_at).getTime() / 1000),
      }))

      setPosts(formatted)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }

  // 🔹 초기 로드 + 실시간 구독
  useEffect(() => {
    loadPosts()

    const subscription = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          const newPost = payload.new
          setPosts((prev) => [
            {
              id: newPost.id,
              name: newPost.name,
              content: newPost.content,
              timestamp: Math.floor(new Date(newPost.created_at).getTime() / 1000),
            },
            ...prev,
          ])
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "guestbook" },
        (payload) => {
          const deletedId = payload.old.id
          setPosts((prev) => prev.filter((p) => p.id !== deletedId))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  return (
    <LazyDiv className="card guestbook">
      <h2>방명록</h2>

      <div className="break" />

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <button
              className="close-button"
              onClick={() => {
                openModal({
                  className: "delete-guestbook-modal",
                  closeOnClickBackground: false,
                  header: <div className="title">삭제하시겠습니까?</div>,
                  content: (
                    <DeleteGuestBookModal
                      postId={post.id}
                      onSuccess={() => loadPosts()}
                    />
                  ),
                  footer: (
                    <>
                      <Button
                        buttonStyle="style2"
                        type="submit"
                        form="guestbook-delete-form"
                      >
                        삭제하기
                      </Button>
                      <Button
                        buttonStyle="style2"
                        className="bg-light-grey-color text-dark-color"
                        onClick={closeModal}
                      >
                        닫기
                      </Button>
                    </>
                  ),
                })
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="break" />

      <Button
        onClick={() =>
          openModal({
            className: "write-guestbook-modal",
            closeOnClickBackground: false,
            header: (
              <div className="title-group">
                <div className="title">방명록 작성하기</div>
                <div className="subtitle">
                  신랑, 신부에게 축하의 마음을 전해주세요.
                </div>
              </div>
            ),
            content: <WriteGuestBookModal loadPosts={loadPosts} />,
            footer: (
              <>
                <Button
                  buttonStyle="style2"
                  type="submit"
                  form="guestbook-write-form"
                >
                  저장하기
                </Button>
                <Button
                  buttonStyle="style2"
                  className="bg-light-grey-color text-dark-color"
                  onClick={closeModal}
                >
                  닫기
                </Button>
              </>
            ),
          })
        }
      >
        방명록 작성하기
      </Button>

      <div className="break" />

      <Button
        onClick={() =>
          openModal({
            className: "all-guestbook-modal",
            closeOnClickBackground: true,
            header: <div className="title">방명록 전체보기</div>,
            content: <AllGuestBookModal loadPosts={loadPosts} />,
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                닫기
              </Button>
            ),
          })
        }
      >
        방명록 전체보기
      </Button>
    </LazyDiv>
  )
}

// ✏️ 작성 모달
const WriteGuestBookModal = ({ loadPosts }: { loadPosts: () => void }) => {
  const inputRef = useRef({}) as React.RefObject<{
    name: HTMLInputElement
    content: HTMLTextAreaElement
    password: HTMLInputElement
  }>
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-write-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const name = inputRef.current.name.value.trim()
          const content = inputRef.current.content.value.trim()
          const password = inputRef.current.password.value

          if (!name || !content || !password) {
            alert("모든 항목을 입력해주세요.")
            return
          }

          const { error } = await supabase
            .from("guestbook")
            .insert([{ name, content, password }])

          if (error) throw error

          alert("방명록이 등록되었습니다.")
          closeModal()
          loadPosts()
        } catch {
          alert("방명록 작성에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      이름
      <input
        disabled={loading}
        type="text"
        placeholder="이름을 입력해주세요."
        ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
      />
      내용
      <textarea
        disabled={loading}
        placeholder="축하 메시지를 입력해주세요."
        ref={(ref) => (inputRef.current.content = ref as HTMLTextAreaElement)}
      />
      비밀번호
      <input
        disabled={loading}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        ref={(ref) => (inputRef.current.password = ref as HTMLInputElement)}
      />
    </form>
  )
}

// 📜 전체보기 모달
const AllGuestBookModal = ({
  loadPosts,
}: {
  loadPosts: () => Promise<void>
}) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const { openModal, closeModal } = useModal()

  const loadPage = async (page: number) => {
    setCurrentPage(page)
    const offset = page * POSTS_PER_PAGE
    const { data, count, error } = await supabase
      .from("guestbook")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + POSTS_PER_PAGE - 1)

    if (error) return console.error(error)

    setPosts(
      data.map((item) => ({
        id: item.id,
        name: item.name,
        content: item.content,
        timestamp: Math.floor(new Date(item.created_at).getTime() / 1000),
      }))
    )
    setTotalPages(Math.ceil((count || 1) / POSTS_PER_PAGE))
  }

  useEffect(() => {
    loadPage(0)
  }, [])

  const pages = useMemo(() => {
    const start = Math.floor(currentPage / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
    const end = Math.min(start + PAGES_PER_BLOCK, totalPages)
    return Array.from({ length: end - start }).map((_, i) => i + start)
  }, [currentPage, totalPages])

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="heading">
            <div
              className="close-button"
              onClick={() => {
                openModal({
                  className: "delete-guestbook-modal",
                  closeOnClickBackground: false,
                  header: <div className="title">삭제하시겠습니까?</div>,
                  content: (
                    <DeleteGuestBookModal
                      postId={post.id}
                      onSuccess={() => {
                        loadPosts()
                        loadPage(currentPage)
                      }}
                    />
                  ),
                  footer: (
                    <>
                      <Button
                        buttonStyle="style2"
                        type="submit"
                        form="guestbook-delete-form"
                      >
                        삭제하기
                      </Button>
                      <Button
                        buttonStyle="style2"
                        className="bg-light-grey-color text-dark-color"
                        onClick={closeModal}
                      >
                        닫기
                      </Button>
                    </>
                  ),
                })
              }}
            />
          </div>
          <div className="body">
            <div className="title">
              <div className="name">{post.name}</div>
              <div className="date">
                {dayjs.unix(post.timestamp).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      ))}

      <div className="pagination">
        {pages[0] > 0 && (
          <div className="page" onClick={() => loadPage(pages[0] - 1)}>
            이전
          </div>
        )}
        {pages.map((page) => (
          <div
            className={`page${page === currentPage ? " current" : ""}`}
            key={page}
            onClick={() => page !== currentPage && loadPage(page)}
          >
            {page + 1}
          </div>
        ))}
        {pages[pages.length - 1] < totalPages - 1 && (
          <div
            className="page"
            onClick={() => loadPage(pages[pages.length - 1] + 1)}
          >
            다음
          </div>
        )}
      </div>
    </>
  )
}

// 🗑️ 삭제 모달
const DeleteGuestBookModal = ({
  postId,
  onSuccess,
}: {
  postId: number
  onSuccess: () => void
}) => {
  const inputRef = useRef({} as HTMLInputElement)
  const { closeModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="guestbook-delete-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const password = inputRef.current.value
          const { data, error } = await supabase
            .from("guestbook")
            .select("password")
            .eq("id", postId)
            .single()

          if (error || !data) {
            alert("삭제 오류가 발생했습니다.")
            return
          }

          if (data.password !== password) {
            alert("비밀번호가 일치하지 않습니다.")
            return
          }

          const { error: deleteError } = await supabase
            .from("guestbook")
            .delete()
            .eq("id", postId)

          if (deleteError) throw deleteError

          alert("삭제되었습니다.")
          closeModal()
          onSuccess()
        } catch {
          alert("삭제에 실패했습니다.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <input
        disabled={loading}
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="password"
        ref={inputRef}
      />
    </form>
  )
}

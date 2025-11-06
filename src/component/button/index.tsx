import { useEffect, useRef } from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "style1" | "style2"
  children?: ReactNode
}

export const Button = (props: ButtonProps) => {
  const { buttonStyle, children, ...rest } = props

  // ✅ 버튼 DOM 참조용 ref 생성
  const ref = useRef<HTMLButtonElement>(null)

  // ✅ 렌더 후 콘솔로 실제 스타일 출력
  useEffect(() => {
    if (ref.current) {
      const styles = window.getComputedStyle(ref.current)
      console.log("🔍 버튼 스타일 디버그")
      console.log("width:", styles.width)
      console.log("min-width:", styles.minWidth)
      console.log("display:", styles.display)
      console.log("flex:", styles.flex)
      console.log("border-radius:", styles.borderRadius)
    }
  }, [])

  return (
    <button
      ref={ref} // ✅ ref 연결
      {...{
        ...rest,
        className: `button ${
          buttonStyle === "style2" ? "button-style-2" : "button-style-1"
        }${props.className ? " " + props.className : ""}`,
      }}
    >
      {children}
    </button>
  )
}

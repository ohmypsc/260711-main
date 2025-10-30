import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: "style1" | "style2"
  children?: ReactNode // ✅ children 추가
}

export const Button = (props: ButtonProps) => {
  const { buttonStyle, children, ...rest } = props

  return (
    <button
      {...{
        ...rest,
        className: `button ${
          buttonStyle === "style2" ? "button-style-2" : "button-style-1"
        }${props.className ? " " + props.className : ""}`,
      }}
    >
      {children} {/* ✅ 버튼 내용 표시 */}
    </button>
  )
}

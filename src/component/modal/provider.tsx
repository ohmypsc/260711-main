import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number }

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfoWithKey[]>([])
  const modalFocusTrapInitialized = useRef(false)
  const modalKey = useRef(0)

  // ✅ body 아래에 모달용 div를 생성
  const modalRootRef = useRef<HTMLDivElement | null>(null)
  if (!modalRootRef.current) {
    modalRootRef.current = document.createElement("div")
    modalRootRef.current.className = "modals-wrapper"
  }

  useEffect(() => {
    const modalRoot = modalRootRef.current!
    document.body.appendChild(modalRoot)
    return () => {
      document.body.removeChild(modalRoot)
    }
  }, [])

  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((prev) => {
      if (prev.length === 0) document.body.classList.add("modal-open")
      return [...prev, { ...modalInfo, key: modalKey.current++ }]
    })
    modalFocusTrapInitialized.current = false
  }, [])

  const closeModal = useCallback(() => {
    setModalInfoList((prev) => {
      const result = prev.slice(0, -1)
      if (result.length === 0) document.body.classList.remove("modal-open")
      return result
    })
  }, [])

  // ✅ 포커스 트랩 유지 (기존 로직 그대로)
  useEffect(() => {
    if (modalInfoList.length === 0) return

    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const lastChild = modalRootRef.current?.lastElementChild
        if (!lastChild) return

        const focusables = lastChild.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )

        if (focusables.length === 0) {
          e.preventDefault()
        } else if (!modalFocusTrapInitialized.current) {
          e.preventDefault()
          modalFocusTrapInitialized.current = true
          ;(focusables[0] as HTMLElement).focus()
        } else if (
          document.activeElement === focusables[0] &&
          e.shiftKey
        ) {
          e.preventDefault()
          ;(focusables[focusables.length - 1] as HTMLElement).focus()
        } else if (
          document.activeElement ===
            focusables[focusables.length - 1] &&
          !e.shiftKey
        ) {
          e.preventDefault()
          ;(focusables[0] as HTMLElement).focus()
        }
      }
    }

    const onFocus = () => {
      modalFocusTrapInitialized.current = true
    }

    window.addEventListener("keydown", focusTrap)
    window.addEventListener("focus", onFocus, true)
    return () => {
      window.removeEventListener("keydown", focusTrap)
      window.removeEventListener("focus", onFocus, true)
    }
  }, [modalInfoList])

  // ✅ Portal로 모달 렌더링
  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}
      {createPortal(
        <>
          {modalInfoList.map((modalInfo, idx) => (
            <div
              key={modalInfo.key}
              className="modal-background"
              style={{ zIndex: 1000 + idx }}
              onClick={() => {
                if (modalInfo.closeOnClickBackground) closeModal()
              }}
            >
              <div
                className={`modal${
                  modalInfo.className ? ` ${modalInfo.className}` : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="header">
                  <div className="close-button-wrapper">
                    <button className="close-button" onClick={closeModal} />
                  </div>
                  {modalInfo.header}
                </div>
                <div className="content">{modalInfo.content}</div>
                <div className="footer">{modalInfo.footer}</div>
              </div>
            </div>
          ))}
        </>,
        modalRootRef.current
      )}
    </ModalContext.Provider>
  )
}

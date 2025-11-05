import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom" // ✅ Portal 기능 추가
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number }

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfoWithKey[]>([])
  const modalWrapperRef = useRef<HTMLDivElement>(null)
  const modalFocusTrapInitialized = useRef(false)
  const modalKey = useRef(0)

  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((prevList) => {
      if (prevList.length === 0) document.body.classList.add("modal-open")
      return [...prevList, { ...modalInfo, key: modalKey.current++ }]
    })
    modalFocusTrapInitialized.current = false
  }, [])

  const closeModal = useCallback(() => {
    setModalInfoList((prevList) => {
      const result = prevList.slice(0, -1)
      if (result.length === 0) document.body.classList.remove("modal-open")
      return result
    })
  }, [])

  // ✅ 포커스 트랩 기능
  useEffect(() => {
    if (modalInfoList.length === 0) return

    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const lastChild = modalWrapperRef.current?.lastElementChild
        if (!lastChild) return

        const focusable = lastChild.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        )

        if (focusable.length === 0) e.preventDefault()
        else if (!modalFocusTrapInitialized.current) {
          e.preventDefault()
          modalFocusTrapInitialized.current = true
          ;(focusable[0] as HTMLElement).focus()
        } else if (!document.activeElement) {
          e.preventDefault()
          ;(focusable[0] as HTMLElement).focus()
        } else if (
          document.activeElement === focusable[0] &&
          e.shiftKey
        ) {
          e.preventDefault()
          ;(focusable[focusable.length - 1] as HTMLElement).focus()
        } else if (
          document.activeElement === focusable[focusable.length - 1] &&
          !e.shiftKey
        ) {
          e.preventDefault()
          ;(focusable[0] as HTMLElement).focus()
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

  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}

      {/* ✅ Portal: 모달을 body로 렌더링 */}
      {createPortal(
        <div className="modals-wrappeer" ref={modalWrapperRef}>
          {modalInfoList.map((modalInfo, idx) => (
            <div
              key={modalInfo.key}
              className="modal-background"
              style={{ zIndex: 4 + idx }}
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
                    <button
                      className="close-button"
                      onClick={closeModal}
                    />
                  </div>
                  {modalInfo.header}
                </div>

                <div className="content">{modalInfo.content}</div>

                <div className="footer">{modalInfo.footer}</div>
              </div>
            </div>
          ))}
        </div>,
        document.body, // ✅ 핵심: 모달이 body 바로 아래에 붙음
      )}
    </ModalContext.Provider>
  )
}

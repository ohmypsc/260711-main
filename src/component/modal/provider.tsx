import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number; closing?: boolean }

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfoWithKey[]>([])
  const modalWrapperRef = useRef<HTMLDivElement>(null)
  const modalFocusTrapInitialized = useRef(false)
  const modalKey = useRef(0)

  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((list) => {
      if (list.length === 0) document.body.classList.add("modal-open")
      return [...list, { ...modalInfo, key: modalKey.current++ }]
    })
    modalFocusTrapInitialized.current = false
  }, [])

  const closeModal = useCallback(() => {
    setModalInfoList((list) => {
      if (list.length === 0) return list
      const last = list[list.length - 1]
      // 닫기 애니메이션을 위해 closing 플래그 추가
      const updated = [...list.slice(0, -1), { ...last, closing: true }]
      setTimeout(() => {
        setModalInfoList((l) => {
          const result = l.slice(0, -1)
          if (result.length === 0) document.body.classList.remove("modal-open")
          return result
        })
      }, 300) // CSS transition 시간과 맞춤
      return updated
    })
  }, [])

  // 포커스 트랩 + ESC 닫기
  useEffect(() => {
    if (modalInfoList.length === 0) return

    const focusTrap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
        return
      }

      if (e.key === "Tab") {
        const wrapper = modalWrapperRef.current
        const lastModal = wrapper?.lastElementChild as HTMLElement
        if (!lastModal) return

        const focusables = lastModal.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        )

        if (focusables.length === 0) {
          e.preventDefault()
          return
        }

        if (!modalFocusTrapInitialized.current) {
          e.preventDefault()
          modalFocusTrapInitialized.current = true
          focusables[0].focus()
        } else if (
          document.activeElement === focusables[0] &&
          e.shiftKey
        ) {
          e.preventDefault()
          focusables[focusables.length - 1].focus()
        } else if (
          document.activeElement === focusables[focusables.length - 1] &&
          !e.shiftKey
        ) {
          e.preventDefault()
          focusables[0].focus()
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
  }, [modalInfoList, closeModal])

  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}
      <div className="modals-wrapper" ref={modalWrapperRef}>
        {modalInfoList.map((modalInfo, idx) => (
          <div
            key={modalInfo.key}
            className={`modal-background${modalInfo.closing ? " closing" : ""}`}
            style={{ zIndex: 1000 + idx }}
            onClick={() => {
              if (modalInfo.closeOnClickBackground) closeModal()
            }}
          >
            <div
              className={`modal${modalInfo.className ? ` ${modalInfo.className}` : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="header">
                <div className="close-button-wrapper">
                  <button className="close-button" onClick={closeModal} />
                </div>
                {modalInfo.header}
              </div>
              <div className="content">{modalInfo.content}</div>
              {modalInfo.footer && (
                <div className="footer">{modalInfo.footer}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ModalContext.Provider>
  )
}

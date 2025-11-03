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
      const updated = [...list.slice(0, -1), { ...last, closing: true }]
      setTimeout(() => {
        setModalInfoList((l) => {
          const result = l.slice(0, -1)
          if (result.length === 0) document.body.classList.remove("modal-open")
          return result
        })
      }, 300)
      return updated
    })
  }, [])

  // ✅ ESC & Tab focus trap
  useEffect(() => {
    if (modalInfoList.length === 0) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
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
            onClick={() =>
              modalInfo.closeOnClickBackground && closeModal()
            }
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

              {/* ✅ 수정 포인트: contact-modal 감싸기 */}
              <div className="content">
                {modalInfo.className?.includes("contact-modal") ? (
                  <div className="contact-modal">{modalInfo.content}</div>
                ) : (
                  modalInfo.content
                )}
              </div>

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

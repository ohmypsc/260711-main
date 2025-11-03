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

  /* ✅ 모달 열기 */
  const openModal = useCallback((modalInfo: ModalInfo) => {
    setModalInfoList((list) => {
      if (list.length === 0) document.body.classList.add("modal-open")
      return [...list, { ...modalInfo, key: modalKey.current++ }]
    })
    modalFocusTrapInitialized.current = false
  }, [])

  /* ✅ 닫기 (애니메이션 포함) */
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

  /* ✅ ESC로 닫기 */
  useEffect(() => {
    if (modalInfoList.length === 0) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [modalInfoList, closeModal])

  /* ✅ 렌더링 */
  return (
    <ModalContext.Provider value={{ modalInfoList, openModal, closeModal }}>
      {children}
      <div className="modals-wrapper" ref={modalWrapperRef}>
        {modalInfoList.map((modalInfo, idx) => (
          <div
            key={modalInfo.key}
            className={`modal-background${modalInfo.closing ? " closing" : ""}`}
            style={{ zIndex: 9999 + idx }}
            onClick={() => modalInfo.closeOnClickBackground && closeModal()}
          >
            <div
              className={`modal${
                modalInfo.className ? ` ${modalInfo.className}` : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ 헤더 */}
              <div className="header">
                <div className="close-button-wrapper">
                  <button className="close-button" onClick={closeModal} />
                </div>
                {modalInfo.header}
              </div>

              {/* ✅ 원작자처럼: content 직접 렌더 (중첩 X) */}
              <div className="content">{modalInfo.content}</div>

              {/* ✅ footer 있을 때만 렌더 */}
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

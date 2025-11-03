import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type ModalInfo, ModalContext } from "./context"

type ModalInfoWithKey = ModalInfo & { key: number }

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
      const updated = list.slice(0, -1)
      if (updated.length === 0) document.body.classList.remove("modal-open")
      return updated
    })
  }, [])

  // ✅ 포커스 트랩 + ESC 닫기
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
      <div className="app-modals-wrapper" ref={modalWrapperRef}>
        <AnimatePresence>
          {modalInfoList.map((modalInfo, idx) => (
            <motion.div
              key={modalInfo.key}
              className="app-modal-background"
              style={{ zIndex: 1000 + idx }}
              onClick={() => {
                if (modalInfo.closeOnClickBackground) closeModal()
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className={`app-modal${
                  modalInfo.className ? ` ${modalInfo.className}` : ""
                }`}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="app-modal-header">
                  <div className="app-modal-close-wrapper">
                    <button className="app-modal-close" onClick={closeModal} />
                  </div>
                  {modalInfo.header}
                </div>
                <div className="app-modal-content">{modalInfo.content}</div>
                {modalInfo.footer && (
                  <div className="app-modal-footer">{modalInfo.footer}</div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ModalContext.Provider>
  )
}

import React from "react"
import ReactDOM from "react-dom/client"
import Router from "./App" // App 이름이 Router로 export 되어 있음
import { ModalProvider } from "./component/modal/provider" // ✅ 정확한 Provider import 경로
import { StoreProvider } from "./component/store"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    {/* ✅ 모달과 전역 스토어를 앱 전체에 적용 */}
    <ModalProvider>
      <StoreProvider>
        <Router /> {/* App이 Router로 export된 상태 */}
      </StoreProvider>
    </ModalProvider>
  </React.StrictMode>
)

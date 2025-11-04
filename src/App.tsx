import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import { Cover } from "./component/cover";
import { Location } from "./component/location";
import "./App.scss";
import { BGEffect } from "./component/bgEffect";
import { Invitation } from "./component/invitation";
import { Calendar } from "./component/calendar";
import { Information } from "./component/information";
import { GuestBook } from "./component/guestbook";
import { LazyDiv } from "./component/lazyDiv";
import { STATIC_ONLY } from "./env";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 기본 페이지 (청첩장 메인) */}
        <Route
          path="/"
          element={
            <>
              <div className="background">
                <div className="card-view">
                  <LazyDiv className="card-group">
                    {/* 표지 */}
                    <Cover />

                    {/* 모시는 글 */}
                    <Invitation />
                  </LazyDiv>

                  <LazyDiv className="card-group">
                    {/* 결혼식 날짜 (달력) */}
                    <Calendar />
                  </LazyDiv>

                  <LazyDiv className="card-group">
                    {/* 오시는길 */}
                    <Location />
                  </LazyDiv>

                  <LazyDiv className="card-group">
                    {/* 마음 전하기 */}
                    <Information />
                    {/* 방명록 */}
                    {!STATIC_ONLY && <GuestBook />}
                  </LazyDiv>
                </div>
              </div>

              {/* 🌸 꽃잎 효과는 항상 카드 위에 표시되도록 background 밖으로 이동 */}
              <BGEffect />
            </>
          }
        />

        {/* ✅ 관리자 페이지 라우트 추가 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

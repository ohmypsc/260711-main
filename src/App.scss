@use "./component/cover";
@use "./component/invitation";
@use "./component/button";
@use "./component/bgEffect";
@use "./component/calendar";
@use "./component/location";
@use "./component/information";
@use "./component/guestbook";
@use "./component/modal";

:root {
  --theme-color: #ff8585;
  --theme-bg-color: #ffe7e7;
  --alt-color: #c28080;
  --alt-bg-color: #f4f0f0;
  --dark-color: #282c34;
  --dark-grey-color: #d2d2d2;
  --light-grey-color: #eaeaea;
  --light-color: #f9f9f9;
  --white-color: #ffffff;
  --red-color: #ff0000;

  font-family: "MapoGoldenPier";
  /* ✅ 중간 수준 폰트 크기 (적당히 여유 있고 과하지 않음) */
  font-size: clamp(16px, 3.2vw, 20px);
}

@media (max-width: 500px) {
  /* ✅ 모바일에서 약간 확대 (루트 대비 10% 정도) */
  body {
    font-size: 1.1rem;
    color: #222222;
  }

  /* ✅ 카드 폰트는 본문 중심 비율 유지 */
  .background,
  .background .card,
  .background .information,
  .background .invitation,
  .background .guestbook,
  .background .footer {
    font-size: 1.1rem;
  }

  h1, h2, h3 {
    line-height: 1.35;
  }

  h2 {
    font-size: 1.45rem;
  }

  button {
    font-size: 1.05rem;
  }

  input,
  textarea {
    font-size: 1.05rem;
  }
}

@media print {
  body {
    print-color-adjust: exact;
  }
}

/* 나머지 기존 내용 절대 수정 없음 ↓↓↓ */

/* 색상 변수 자동 클래스화 */
$colors: (
  theme-color: var(--theme-color),
  theme-bg-color: var(--theme-bg-color),
  alt-color: var(--alt-color),
  alt-bg-color: var(--alt-bg-color),
  dark-color: var(--dark-color),
  dark-grey-color: var(--dark-grey-color),
  light-grey-color: var(--light-grey-color),
  light-color: var(--light-color),
  white-color: var(--white-color),
  red-color: var(--red-color),
);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color !important;
  }
  .bg-#{$name} {
    background-color: $color !important;
  }
  .border-#{$name} {
    border-color: $color !important;
  }
}

/* 카드 페이드 인 애니메이션 */
@keyframes lazy-fade-in {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 버튼 기본값 */
button {
  font-family: "MapoGoldenPier";
  font-size: 1rem;
  border: none;
  background-color: transparent;
  padding: 0;
}

/* 기본 body 스타일 */
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100dvh;
  @supports not (height: 100dvh) {
    height: 100vh;
  }

  &.modal-open {
    overflow-y: hidden;
  }

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 기본 박스 */
* {
  box-sizing: border-box;
  color: var(--dark-color);
}

/* 입력 가능 영역은 선택 허용 */
input,
textarea {
  user-select: text;
}

/* ✅ 어절 단위 줄바꿈 */
.background,
.background .card,
.background .footer {
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* 전체 배경 */
.background {
  background-color: var(--theme-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100dvh;
  min-width: 100vw;

  @supports not (min-height: 100dvh) {
    min-height: 100vh;
  }

  .card-view {
    width: 980px;
    text-align: center;

    @media (max-width: 980px) {
      width: 500px;
    }

    @media (max-width: 500px) {
      width: 100vw;
    }

    .card-group {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      box-shadow: none;
      margin: 10px;
      opacity: 0;

      &.lazy-active {
        animation-name: lazy-fade-in;
        animation-duration: 3s;
        opacity: 1;
      }

      @media print {
        opacity: 1;
        animation: none !important;
      }

      .card {
        background-color: var(--light-color);
        padding: 1rem;
        border: 1px solid var(--light-grey-color);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        margin: 0.5rem 0;
        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
        opacity: 0;

        &.lazy-active {
          animation-name: lazy-fade-in;
          animation-duration: 3s;
          opacity: 1;
        }

        @media print {
          opacity: 1;
          animation: none !important;
        }
      }
    }

    .footer {
      position: relative;
      background-color: var(--light-color);
      box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
      margin: 0.5rem;
      padding: 1rem;
      opacity: 0;

      &.lazy-active {
        animation-name: lazy-fade-in;
        animation-duration: 3s;
        opacity: 1;
      }

      @media print {
        opacity: 1;
        animation: none !important;
      }
    }
  }
}

/* 제목 */
h2 {
  font-size: 1.45rem;
  color: var(--theme-color);
  font-weight: normal;
}

/* 구분용 여백 */
div.break {
  height: 1rem;
}

/* 🌸 꽃잎 효과 항상 카드 위로 */
.bgEffect {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

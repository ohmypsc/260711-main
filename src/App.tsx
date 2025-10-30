function Home() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        {/* ✅ Cover: LazyDiv 안에서 동일한 카드 스타일 유지 + 자체 페이드인 효과 적용 */}
        <LazyDiv className="card-group">
          <Cover />
        </LazyDiv>

        {/* ✅ 이후 섹션들은 기존 그대로 */}
        <LazyDiv className="card-group">
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Calendar />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Information />
        </LazyDiv>

        {!STATIC_ONLY && (
          <LazyDiv className="card-group">
            <GuestBook />
          </LazyDiv>
        )}
      </div>
    </div>
  )
}

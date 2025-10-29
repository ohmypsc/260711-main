import { createClient } from "@supabase/supabase-js"

// ✅ 환경변수에서 Supabase 설정값 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ✅ 값이 비어 있을 경우 에러를 던져서 문제를 바로 알 수 있게 함
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase URL 또는 Anon Key가 설정되지 않았습니다. .env 파일을 확인하세요.")
}

// ✅ Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

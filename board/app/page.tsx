import { connectDB } from "@/util/database"

export default async function Home() {
  const db = (await connectDB).db('forum');
  // DB 데이터 가져오는건 서버 컴포넌트에서 하는게 좋은 클라이언트 컴포넌트는 항상 JS를 브라우저에 뿌라기 떄문 (애초에 MongoDB 라이브러리 단에서 막혀잇음)
  const result = await db.collection('post').find().toArray();

  return (
    <main>
      홈 화면임
    </main>
  )
}

import { MongoClient, MongoClientOptions } from 'mongodb'

const url = process.env.MONGO_URL as string
const options: MongoClientOptions = { }

let connectDB: Promise<MongoClient>

declare global {
  var _mongo: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
/**
 * Next.js는 개발 편의를 위해 코드를 수정하고 저장하면 페이지를 새로고침하지 않아도 즉시 반영되는 Hot Reload(Fast Refresh) 기능을 제공함
 * 커넥션 풀 제한이 있는데 (기본 100개라함) Hot Reload 때문에 커넥션 부족해지는 현상이 일어 날 수도 있어서 아래 조치 필요
 */
  // 개발 모드에서 서버 재시작 시 연결 중복을 방지하기 위해 global 저장소 활용
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  // 프로덕션 모드에서는 global을 사용하지 않음
  connectDB = new MongoClient(url, options).connect()
}

export { connectDB }

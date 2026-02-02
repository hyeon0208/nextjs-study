/**
 * api/ 하위의 폴더 이름이 곧 API 경로가 되며, 파일이름은 route여야함 => api/text.ts => www.도메인.com/api/test
 * 메서드 명에 따라 HTTP 메서드가 매핑됨
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 */

type ResponseData = {
  message: string
}

export async function GET() {
  return Response.json({ message: 'Hello World222222' })
}
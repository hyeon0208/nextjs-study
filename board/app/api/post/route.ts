/**
 * api/ 하위의 폴더 이름이 곧 API 경로가 되며, 파일이름은 route여야함 => api/text.ts => www.도메인.com/api/test
 * 메서드 명에 따라 HTTP 메서드가 매핑됨
 * https://nextjs.org/docs/app/api-reference/file-conventions/route
 */

import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  if (!title || !content) {
    return Response.json({ error: '제목과 내용을 입력해주세요' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    await db.collection('post').insertOne({ title, content });
    return Response.json({ status: 200 });
  } catch (error) {
    console.error('DB 저장 에러 발생:', error);
    return Response.json(
      { error: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
const _id = await req.text();

  if (!_id) {
    return Response.json({ error: '삭제할 데이터 ID가 없습니다.' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
        const result = await db.collection('post').deleteOne({ 
        _id: new ObjectId(_id) 
    });

    if (result.deletedCount === 0) {
        return Response.json({ error: '삭제할 게시물을 찾지 못했습니다.' }, { status: 404 });
    }
    return Response.json({ status: 200, message: '삭제 성공' });

  } catch (error) {
    console.error('DB 삭제 에러 발생:', error);
    return Response.json(
      { error: '서버에서 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
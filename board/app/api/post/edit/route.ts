import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get('title') as string;  
  const content = formData.get('content') as string;
  const _id = formData.get('_id') as string;
  if (!title || !content) {
    return Response.json({ error: '제목과 내용을 입력해주세요' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    const targetPost = await db.collection('post').findOne({ _id: new ObjectId(_id) });

    if (!targetPost) {
    return Response.json(
        { error: '존재하지 않는 게시물이 입니다.' }, 
        { status: 400 }
    );
    }

    await db.collection('post').updateOne(
        { _id: new ObjectId(_id) },
        { 
            $set: { 
            title: title, 
            content: content 
            } 
        }
        );
    return Response.json({ status: 200 });
  } catch (error) {
    console.error('DB 업데이트 에러 발생:', error);
    return Response.json(
      { error: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

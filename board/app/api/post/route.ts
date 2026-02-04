import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { withAuth } from "@/util/auth";

export const POST = withAuth(async (req, session) => {
  const formData = await req.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  if (!title || !content) {
    return Response.json({ error: '제목과 내용을 입력해주세요' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    await db.collection('post').insertOne({ 
      title, 
      content,
      author: session.user?.email 
    });
    return Response.json({ status: 200 });
  } catch (error) {
    console.error('DB 저장 에러 발생:', error);
    return Response.json({ error: '서버 에러' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (req, session) => {
  const _id = await req.text();

  if (!_id) {
    return Response.json({ error: '삭제할 데이터 ID가 없습니다.' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    const post = await db.collection('post').findOne({ _id: new ObjectId(_id) });

    if (!post) {
      return Response.json({ error: '게시물을 찾을 수 없습니다.' }, { status: 404 });
    }

    if (post.author !== session.user?.email) {
      return Response.json({ error: '본인이 작성한 글만 삭제할 수 있습니다.' }, { status: 403 });
    }

    const result = await db.collection('post').deleteOne({ 
      _id: new ObjectId(_id) 
    });

    if (result.deletedCount === 0) {
        return Response.json({ error: '삭제 실패' }, { status: 500 });
    }
    return Response.json({ status: 200, message: '삭제 성공' });

  } catch (error) {
    console.error('DB 삭제 에러 발생:', error);
    return Response.json({ error: '서버 에러' }, { status: 500 });
  }
});
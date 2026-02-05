import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { withAuth } from "@/util/auth";

export const POST = withAuth(async (req, session) => {
  const body = await req.json();
  const { comment, _id } = body;

  if (!comment || comment.trim() === '') {
    return Response.json({ error: '댓글 내용을 입력해주세요' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    const result = await db.collection('comment').insertOne({
      content: comment,
      parent: new ObjectId(_id),
      author: session.user?.email,
      authorName: session.user?.name,
      date: new Date()
    });

    return Response.json({ status: 200, result });
  } catch (error) {
    console.error('댓글 저장 에러 발생:', error);
    return Response.json(
      { error: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parentId = searchParams.get('id');

  if (!parentId) {
    return Response.json({ error: '게시글 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const db = (await connectDB).db('baord');
    const result = await db.collection('comment')
      .find({ parent: new ObjectId(parentId) })
      .sort({ date: -1 })
      .toArray();
    
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: '댓글 목록을 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
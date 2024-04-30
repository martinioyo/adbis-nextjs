
import { getUserToken } from '../../utils/cookies';
import { savePostToDatabase } from '../../utils/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userToken = getUserToken(req );
    const postId = req.body.postId;
    try {
      await savePostToDatabase(postId, userToken);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



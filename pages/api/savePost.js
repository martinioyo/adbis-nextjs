import { savePostToDatabase } from '../../utils/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, tags } = req.body;
    try {
      const newPost = await savePostToDatabase(title, description, tags);
      res.status(200).json({ success: true, id: newPost.id });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

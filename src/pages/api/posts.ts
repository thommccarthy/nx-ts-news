import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const data = readPostsInfo();
      return res.json({ postInfo: data });
    }
    default:
      return res.status(404).send('Not Found');
  }
};

const readPostsInfo = () => {
  const dirPathToRead = path.join(process.cwd(), 'posts');
  const dirs = fs.readdirSync(dirPathToRead);

  let data = [];

  for (let dir of dirs) {
    const postDir = path.join(dirPathToRead, dir);
    if (fs.statSync(postDir).isDirectory()) {
      const postFiles = fs.readdirSync(postDir);
      for (let postFile of postFiles) {
        if (postFile.endsWith('.md')) {
          const filePathToRead = path.join(postDir, postFile);
          const fileContent = fs.readFileSync(filePathToRead, {
            encoding: 'utf-8',
          });
          data.push(matter(fileContent).data);
        }
      }
    }
  }

  return data;
};

export default handler;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostApiResponse } from '../utils/types';

export const readPostsInfo = (): PostApiResponse => {
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

  return data as PostApiResponse;
};

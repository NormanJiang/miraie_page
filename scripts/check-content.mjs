import { readContent } from './content.mjs';
try {
 const data=readContent();
 console.log(`内容检查通过：${data.manifest.notes.length} 篇笔记、${data.manifest.blog.length} 篇博客、${data.manifest.projects.length} 个项目，共 ${data.files.length} 个语言文件。`);
} catch(error) { console.error(error.message);process.exitCode=1; }

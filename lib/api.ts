import { Document, Message, Citation, ChatResponse } from "./types";

// Mock 文档上传
export async function uploadDocument(file: File): Promise<Document> {
  // 模拟上传延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: `doc_${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount: 128,
    status: "uploading",
    uploadProgress: 0,
    createdAt: new Date(),
  };
}

// Mock 文档处理进度
export async function* processDocument(docId: string) {
  const steps = [
    { status: "parsing" as const, step: "parse" as const, progress: 30 },
    { status: "chunking" as const, step: "chunk" as const, progress: 60 },
    { status: "indexing" as const, step: "index" as const, progress: 90 },
    { status: "ready" as const, step: undefined, progress: 100 },
  ];

  for (const step of steps) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    yield step;
  }
}

// Mock 对话
export async function* chatStream(
  message: string,
  documentId: string
): AsyncGenerator<string> {
  const response =
    "根据文档描述，**CTRL_REG** 的复位值为 **0x00**[1]，位宽为 8-bit[2]。该寄存器用于控制芯片的主工作模式。";

  for (let i = 0; i < response.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    yield response[i];
  }
}

// Mock 引用数据
export function getMockCitations(): Citation[] {
  return [
    {
      id: "cite_1",
      chunkId: "chunk_37",
      pageNum: 37,
      title: "Ch5 Register Map · CTRL_REG",
      content: "CTRL_REG 寄存器的复位值为 0x00...",
      score: 0.95,
    },
    {
      id: "cite_2",
      chunkId: "chunk_38",
      pageNum: 38,
      title: "Ch5 Register Map · Bit Field Description",
      content: "CTRL_REG 位宽为 8-bit，各位定义如下...",
      score: 0.88,
    },
  ];
}

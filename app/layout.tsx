import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatFile - RAG 知识库",
  description: "上传 PDF，与文档对话",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import { Document, DocumentStatus } from '@/lib/types';
import { useAppStore } from '@/lib/store';

export function useUpload() {
  const { setDocument } = useAppStore();

  const uploadFile = async (file: File) => {
    let doc: Document = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      pageCount: 0,
      status: 'uploading',
      uploadProgress: 0,
      createdAt: new Date(),
    };
    setDocument(doc);

    // Mock upload
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300));
      doc = { ...doc, uploadProgress: i };
      setDocument(doc);
    }

    // Mock processing steps
    const steps: DocumentStatus[] = ['parsing', 'chunking', 'indexing', 'ready'];
    for (const status of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      doc = { ...doc, status, pageCount: status === 'ready' ? 128 : 0 };
      setDocument(doc);
    }
  };

  const reset = () => setDocument(null);

  return { uploadFile, reset };
}

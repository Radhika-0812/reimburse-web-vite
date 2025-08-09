import { useState } from 'react';
import { usePresignReceiptMutation } from '../reportsApi.js';

export default function ReceiptUpload({ reportId }) {
  const [file, setFile] = useState(null);
  const [presign, { isLoading }] = usePresignReceiptMutation();
  const [msg, setMsg] = useState('');

  const onUpload = async () => {
    if (!file) return;
    setMsg('');
    try {
      const presigned = await presign({ reportId, filename: file.name }).unwrap();
      if (presigned.putUrl) {
        await fetch(presigned.putUrl, { method: 'PUT', body: file });
      } else if (presigned.url && presigned.fields) {
        const form = new FormData();
        Object.entries(presigned.fields).forEach(([k, v]) => form.append(k, v));
        form.append('file', file);
        await fetch(presigned.url, { method: 'POST', body: form });
      }
      setMsg('Uploaded!');
    } catch (e) {
      setMsg('Upload failed.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input type="file" onChange={e => setFile(e.target.files?.[0])}
             className="block w-full text-sm" />
      <button onClick={onUpload} disabled={isLoading || !file}
        className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-60">
        {isLoading ? 'Uploading…' : 'Upload'}
      </button>
      {msg && <span className="text-sm ml-2">{msg}</span>}
    </div>
  );
}

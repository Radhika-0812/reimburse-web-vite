import { useParams } from 'react-router-dom';
import { useGetReportQuery } from '../reportsApi.js';

export default function ReportDetailPage() {
  const { id } = useParams();
  const { data: r, isLoading } = useGetReportQuery(id);
  if (isLoading) return <div className="p-6">Loading…</div>;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">{r.title}</h1>
      <div className="bg-white border rounded p-4">
        <p>Status: <b>{r.status}</b></p>
        <p>Total: ₹{r.totalAmount?.toFixed?.(2)}</p>
      </div>
      <div className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Items</h2>
        {r.items?.map(it => (
          <div key={it.id} className="border-t py-2 flex justify-between text-sm">
            <span>{it.txnDate} • {it.description} • {it.categoryName}</span>
            <span>₹{it.amount?.toFixed?.(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

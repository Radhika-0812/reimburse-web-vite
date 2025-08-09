import { useState } from 'react';
import { useGetMyReportsQuery, useCreateReportMutation } from '../reportsApi.js';
import { Link, useNavigate } from 'react-router-dom';

export default function MyReportsPage() {
  const [status, setStatus] = useState('');
  const { data, isLoading, isError, refetch } = useGetMyReportsQuery({ status });
  const [createReport, { isLoading: creating }] = useCreateReportMutation();
  const nav = useNavigate();

  const onNew = async () => {
    const res = await createReport({ title: 'New Report', currency: 'INR' }).unwrap();
    nav(`/reports/${res.id}/edit`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">My Reports</h1>
        <button onClick={onNew} disabled={creating}
          className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {creating ? 'Creating…' : 'New Report'}
        </button>
      </div>

      <div className="mb-3">
        <select value={status} onChange={e => setStatus(e.target.value)}
          className="border rounded px-2 py-1">
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="APPROVED">Approved</option>
          <option value="PAID">Paid</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button onClick={() => refetch()} className="ml-2 border px-2 py-1 rounded">Refresh</button>
      </div>

      {isLoading && <p>Loading…</p>}
      {isError && <p className="text-red-600">Failed to load.</p>}

      <div className="overflow-x-auto bg-white border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-right">Total</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.content?.map(r => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2">{r.title}</td>
                <td className="px-3 py-2"><span className="px-2 py-0.5 rounded bg-gray-100">{r.status}</span></td>
                <td className="px-3 py-2 text-right">₹{r.totalAmount?.toFixed?.(2)}</td>
                <td className="px-3 py-2 text-center">
                  <Link to={`/reports/${r.id}`} className="text-indigo-600 hover:underline mr-2">View</Link>
                  {r.status === 'DRAFT' &&
                    <Link to={`/reports/${r.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>}
                </td>
              </tr>
            ))}
            {!data?.content?.length && !isLoading && <tr><td className="px-3 py-4" colSpan={4}>No reports.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

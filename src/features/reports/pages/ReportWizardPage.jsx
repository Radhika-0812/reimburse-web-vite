import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetReportQuery, useAddItemMutation, useSubmitReportMutation } from '../reportsApi.js';
import ReceiptUpload from '../components/ReceiptUpload.jsx';

export default function ReportWizardPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: report, isLoading } = useGetReportQuery(id);
  const [addItem, { isLoading: adding }] = useAddItemMutation();
  const [submitReport, { isLoading: submitting }] = useSubmitReportMutation();

  const [item, setItem] = useState({ categoryId: '', txnDate: '', description: '', amount: '' });

  const addLine = async (e) => {
    e.preventDefault();
    await addItem({ reportId: id, item: { ...item, amount: Number(item.amount) } }).unwrap();
    setItem({ categoryId: '', txnDate: '', description: '', amount: '' });
  };

  const submit = async () => {
    await submitReport(id).unwrap();
    nav('/reports');
  };

  if (isLoading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit Report — {report?.title}</h1>
        <button onClick={submit} disabled={submitting}
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-3">Add Expense Item</h2>
        <form onSubmit={addLine} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <select className="border rounded px-2 py-2"
            value={item.categoryId}
            onChange={e => setItem(s => ({ ...s, categoryId: e.target.value }))}>
            <option value="">Category</option>
            <option value="1">Travel</option>
            <option value="2">Meals</option>
            <option value="3">Office</option>
          </select>
          <input type="date" className="border rounded px-2 py-2"
            value={item.txnDate} onChange={e => setItem(s => ({ ...s, txnDate: e.target.value }))}/>
          <input placeholder="Description" className="border rounded px-2 py-2"
            value={item.description} onChange={e => setItem(s => ({ ...s, description: e.target.value }))}/>
          <input placeholder="Amount" className="border rounded px-2 py-2"
            value={item.amount} onChange={e => setItem(s => ({ ...s, amount: e.target.value }))}/>
          <button disabled={adding} className="px-3 py-2 bg-indigo-600 text-white rounded">
            {adding ? 'Adding…' : 'Add'}
          </button>
        </form>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Existing Items</h3>
          <div className="text-sm">
            {report?.items?.length ? report.items.map(it => (
              <div key={it.id} className="border-t py-2 flex justify-between">
                <span>{it.txnDate} • {it.description} • {it.categoryName}</span>
                <span>₹{it.amount?.toFixed?.(2)}</span>
              </div>
            )) : <p className="text-gray-600">No items yet.</p>}
          </div>
        </div>
      </section>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-3">Receipts</h2>
        <ReceiptUpload reportId={id} />
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {report?.receipts?.map(r => (
            <a key={r.key} href={r.url} target="_blank" rel="noreferrer"
               className="border rounded p-2 text-sm hover:bg-gray-50 truncate">{r.filename}</a>
          ))}
        </div>
      </section>
    </div>
  );
}

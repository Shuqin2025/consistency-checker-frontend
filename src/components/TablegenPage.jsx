import React, { useState } from "react";
import { apiFetch } from "@/api/apiBase";

const TablegenPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiFetch("/api/tablegen", {
        method: "POST",
        body: JSON.stringify({ text: inputValue }),
      });
      setResult(data);
    } catch (err) {
      console.error("❌ API fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Table Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="请输入需要生成表格的内容"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "⏳ 正在生成..." : "生成表格"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 mt-4">❌ 出错啦: {error}</p>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">✅ 生成结果</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-x-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TablegenPage;

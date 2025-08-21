// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import TablegenPage from "./components/TablegenPage";

function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 调用后端 /health 接口做健康检查
    const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
    fetch(apiBase.replace("/api", "/health"))
      .then((res) => res.json())
      .then((data) => {
        setBackendStatus(data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Backend check failed:", err);
        setBackendStatus("unreachable");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>🔄 正在检查后端服务是否可用...</div>;
  }

  if (backendStatus !== "ok") {
    return (
      <div>
        ❌ 后端不可达，请检查 Render 部署或 API_BASE 设置。
        <br />
        当前状态: {backendStatus}
      </div>
    );
  }

  return (
    <div>
      <h1>✅ Consistency Checker</h1>
      <TablegenPage />
    </div>
  );
}

export default App;

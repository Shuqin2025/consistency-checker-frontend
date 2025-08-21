// src/api/apiBase.js

// 统一 API 基础地址：优先读取环境变量
// - 本地开发：走 http://localhost:5000
// - 部署生产：用 .env.production 里的 VITE_API_BASE
const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

// 封装 fetch，默认带上 JSON 处理
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const mergedOptions = {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`
      );
    }

    // 自动尝试解析 JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (err) {
    console.error("❌ apiFetch 出错:", err);
    throw err;
  }
}

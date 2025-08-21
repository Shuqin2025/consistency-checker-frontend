// src/api/apiBase.js

// 默认后端 API 地址（用于兜底）
const DEFAULT_API_BASE = "http://localhost:5000";

// 使用环境变量（优先），否则用默认值
export const API_BASE =
  import.meta.env.VITE_API_BASE || DEFAULT_API_BASE;

// 封装一个通用 fetch
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

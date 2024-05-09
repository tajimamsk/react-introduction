/**
 * 非同期関数
 * 引数に応じてamountの値が変化
 * 500msc待機後にamountの値を返す
 */
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

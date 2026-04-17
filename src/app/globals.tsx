@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 2, 6, 23; /* 深い紺色 */
}

/* じんわり動く背景グラデーション */
body {
  background: linear-gradient(135deg, #020617, #0f172a, #1e1b4b);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
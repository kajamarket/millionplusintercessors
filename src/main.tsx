import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// Guard global animation frame methods for Node/JSDOM SSG build
if (typeof globalThis !== 'undefined') {
  if (!globalThis.cancelAnimationFrame) {
    globalThis.cancelAnimationFrame = (id) => clearTimeout(id as any);
  }
  if (!globalThis.requestAnimationFrame) {
    globalThis.requestAnimationFrame = (fn) => setTimeout(fn, 16) as any;
  }
}

export const createRoot = ViteReactSSG({ routes });

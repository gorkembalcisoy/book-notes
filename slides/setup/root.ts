import { useNav } from '@slidev/client';
import { onMounted, onUnmounted, watch } from 'vue';

// Slidev 0.50 only enables its built-in embed messaging in development.
// Keep the same bridge available in the statically built presentations.
export default function setupEmbeddedNavigation() {
  if (import.meta.env.DEV || window.parent === window) return;
  const nav = useNav();
  const receive = (event: MessageEvent) => {
    if (event.origin !== location.origin || event.source !== window.parent) return;
    const data = event.data;
    if (data?.target !== 'slidev' || data.type !== 'navigate') return;
    if (Number.isInteger(data.no) && data.no >= 1 && data.no <= nav.total.value) nav.go(data.no);
    else if (data.operation === 'next') nav.next();
    else if (data.operation === 'prev') nav.prev();
  };
  const publish = () => window.parent.postMessage({ target: 'slidev', navState: { no: nav.currentSlideNo.value } }, location.origin);
  window.addEventListener('message', receive);
  watch([nav.currentSlideNo, nav.clicks], publish);
  onMounted(publish);
  onUnmounted(() => window.removeEventListener('message', receive));
}

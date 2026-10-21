import './style.css';
import { createChapter } from './markdown.js';

const sources = import.meta.glob('../slides/*.md', { query: '?raw', import: 'default', eager: true });
const chapters = Object.entries(sources).sort(([a], [b]) => a.localeCompare(b))
  .map(([path, source]) => createChapter(path.split('/').pop().replace('.md', ''), source));
const frame = document.querySelector('#slide-frame');
const contents = document.querySelector('#contents');
const menuToggle = document.querySelector('#menu-toggle');
const backdrop = document.querySelector('#backdrop');
let currentChapter;
let currentSlide = 1;
let requestedSlide = null;
let frameLoaded = false;

function link(label, href, className) {
  const element = document.createElement('a');
  element.textContent = label;
  element.href = href;
  if (className) element.className = className;
  return element;
}

document.querySelector('#chapter-count').textContent = chapters.length;
for (const chapter of chapters) {
  const group = document.createElement('details');
  group.dataset.chapter = chapter.id;
  const summary = document.createElement('summary');
  const chapterLink = link(chapter.title, `#${chapter.id}`, 'chapter-link');
  const number = document.createElement('span');
  number.className = 'chapter-number';
  number.textContent = chapter.id.slice(0, 2);
  chapterLink.prepend(number);
  summary.append(chapterLink);
  group.append(summary);
  const list = document.createElement('ul');
  const stack = [{ level: 2, list }];
  let previousItem;
  for (const heading of chapter.headings.slice(1)) {
    while (stack.length > 1 && heading.level < stack.at(-1).level) stack.pop();
    if (previousItem && heading.level > stack.at(-1).level) {
      const nested = document.createElement('ul');
      previousItem.append(nested);
      stack.push({ level: heading.level, list: nested });
    }
    const item = document.createElement('li');
    item.append(link(heading.title, `#${chapter.id}/${heading.slug}`, 'section-link'));
    stack.at(-1).list.append(item);
    previousItem = item;
  }
  group.append(list);
  contents.append(group);
}

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'İçindekileri kapat' : 'İçindekileri aç');
  document.body.classList.toggle('menu-open', open);
  backdrop.hidden = !open;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
  if (event.target.closest('button, input, textarea, select, summary, a') || event.altKey || event.ctrlKey || event.metaKey) return;
  if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) {
    event.preventDefault();
    navigate(1);
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    navigate(-1);
  }
});
contents.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  setMenu(false);
  // Selecting the current link should still restore that slide's initial state.
  if (event.target.closest('a').hash === location.hash) showRoute();
  if (window.matchMedia('(max-width: 800px)').matches) document.querySelector('main').focus({ preventScroll: true });
});

function markActive(slug) {
  for (const anchor of contents.querySelectorAll('a')) {
    const active = anchor.hash === `#${currentChapter.id}${slug ? `/${slug}` : ''}`;
    if (active) anchor.setAttribute('aria-current', 'location');
    else anchor.removeAttribute('aria-current');
  }
}

function sendNavigation(data) {
  frame.contentWindow?.postMessage({ target: 'slidev', type: 'navigate', ...data }, location.origin);
}

function updateControls() {
  document.querySelector('#slide-position').textContent = `${currentSlide} / ${currentChapter.total}`;
  document.querySelector('#previous-slide').disabled = currentSlide === 1 && currentChapter === chapters[0];
  document.querySelector('#next-slide').disabled = currentSlide === currentChapter.total && currentChapter === chapters.at(-1);
}

function showRoute() {
  const [id, slug] = location.hash.slice(1).split('/');
  const chapter = chapters.find(item => item.id === id) || chapters[0];
  const heading = chapter.headings.find(item => item.slug === slug);
  const numericSlide = /^slide-\d+$/.test(slug || '') ? Number(slug.slice(6)) : 1;
  currentSlide = heading?.slide || Math.max(1, Math.min(numericSlide, chapter.total));
  requestedSlide = currentSlide;
  if (id !== chapter.id || (slug && !heading && numericSlide === 1)) history.replaceState(null, '', `#${chapter.id}`);
  if (currentChapter !== chapter) {
    currentChapter = chapter;
    frameLoaded = false;
    frame.src = `${import.meta.env.BASE_URL}decks/${chapter.id}/?embedded=true`;
    frame.title = `${chapter.title} — Slayt sunumu`;
    document.title = `${chapter.title} · DDIA Okuma Notları`;
    document.querySelector('#document-name').textContent = chapter.title;
    for (const group of contents.querySelectorAll('details')) {
      group.open = group.dataset.chapter === chapter.id;
      group.classList.toggle('selected', group.open);
    }
  } else if (frameLoaded) sendNavigation({ no: currentSlide });
  markActive(currentSlide === 1 ? '' : heading?.slug || chapter.headings.find(item => item.slide === currentSlide)?.slug);
  updateControls();
}

frame.addEventListener('load', () => {
  frameLoaded = true;
  sendNavigation({ no: requestedSlide || currentSlide });
});

window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== frame.contentWindow || event.data?.target !== 'slidev') return;
  const no = Number(event.data.navState?.no);
  if (!Number.isInteger(no) || no < 1 || no > currentChapter.total) return;
  if (requestedSlide !== null && no !== requestedSlide) {
    if (frameLoaded) sendNavigation({ no: requestedSlide });
    return;
  }
  requestedSlide = null;
  currentSlide = no;
  const heading = currentChapter.headings.find(item => item.slide === no);
  const slug = no === 1 ? '' : heading?.slug || `slide-${no}`;
  // Slidev's own keyboard navigation also keeps the menu and shared URL in sync.
  const routeHeading = currentChapter.headings.find(item => item.slug === location.hash.split('/')[1]);
  if (routeHeading?.slide !== no || no === 1) history.replaceState(null, '', `#${currentChapter.id}${slug ? `/${slug}` : ''}`);
  markActive(no === 1 ? '' : routeHeading?.slide === no ? routeHeading.slug : slug);
  updateControls();
});

function navigate(direction) {
  const chapterIndex = chapters.indexOf(currentChapter);
  if (direction > 0 && currentSlide === currentChapter.total && chapterIndex < chapters.length - 1) {
    location.hash = chapters[chapterIndex + 1].id;
  } else if (direction < 0 && currentSlide === 1 && chapterIndex > 0) {
    const previous = chapters[chapterIndex - 1];
    location.hash = `${previous.id}/slide-${previous.total}`;
  } else if (frameLoaded) sendNavigation({ operation: direction > 0 ? 'next' : 'prev' });
}

document.querySelector('#previous-slide').addEventListener('click', () => navigate(-1));
document.querySelector('#next-slide').addEventListener('click', () => navigate(1));
window.addEventListener('hashchange', showRoute);
showRoute();

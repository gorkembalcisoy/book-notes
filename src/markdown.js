import MarkdownIt from 'markdown-it';

export function splitSlides(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const slides = [];
  let content = [];
  let fence;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
    }
    if (!fence && line === '---') {
      if (content.join('\n').trim()) slides.push(content.join('\n'));
      content = [];
      if (/^\w[\w-]*:/.test(lines[i + 1] || '')) {
        const end = lines.indexOf('---', i + 1);
        if (end !== -1) i = end;
      }
    } else content.push(line);
  }
  if (content.join('\n').trim()) slides.push(content.join('\n'));
  return slides;
}

export function createChapter(id, source) {
  const md = new MarkdownIt({ html: true });
  const slides = splitSlides(source);
  const headings = [];
  const slugs = new Map();
  slides.forEach((source, index) => {
    // Layout wrappers do not affect the headings listed in the menu.
    const tokens = md.parse(source.replace(/<\/?(?:div|span)\b[^>]*>/g, ''), {});
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'heading_open') continue;
      const title = tokens[i + 1].children
        .filter(child => ['text', 'code_inline'].includes(child.type))
        .map(child => child.content).join('');
      const base = title.toLocaleLowerCase('tr').normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'baslik';
      const count = (slugs.get(base) || 0) + 1;
      slugs.set(base, count);
      headings.push({ title, slug: count === 1 ? base : `${base}-${count}`,
        level: headings.length === 0 ? 1 : Number(tokens[i].tag.slice(1)) + 1, slide: index + 1 });
    }
  });
  return { id, title: headings[0]?.title || id, headings, total: slides.length };
}

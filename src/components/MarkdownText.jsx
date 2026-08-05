/**
 * MarkdownText — tiny dependency-free Markdown renderer.
 *
 * Turns model output (headings, **bold**, *italic*, `code`, ```blocks```,
 * bullet/numbered lists, hr) into styled React elements so AI answers look
 * like ChatGPT instead of raw `**` symbols. Everything is built with React
 * elements (never dangerouslySetInnerHTML), so content is escaped by React
 * automatically — XSS-safe by construction.
 */
const INLINE_RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(__[^_\n]+__)|(\*[^*\n]+\*)/g;

function inline(text) {
  const nodes = [];
  let last = 0;
  let key = 0;
  let m;

  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];

    if (token.startsWith("`")) {
      nodes.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }

    last = m.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const isCodeFence = (line) => /^```/.test(line.trim());
const isHeading = (line) => /^\s*(#{1,6})\s+/.test(line);
const isHr = (line) => /^\s*(---|\*\*\*|___)\s*$/.test(line);
const isUl = (line) => /^\s*[-*•]\s+/.test(line);
const isOl = (line) => /^\s*\d+[.)]\s+/.test(line);

export default function MarkdownText({ text }) {
  const lines = String(text || "").split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (isCodeFence(line)) {
      const buf = [];
      i++;
      while (i < lines.length && !isCodeFence(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre className="markdown-code" key={blocks.length}>
          <code>{buf.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Horizontal rule
    if (isHr(line)) {
      blocks.push(<hr key={blocks.length} />);
      i++;
      continue;
    }

    // Heading
    if (isHeading(line)) {
      const match = line.match(/^\s*(#{1,6})\s+(.*)$/);
      const level = Math.min(match[1].length, 6);
      const Tag = `h${level}`;
      blocks.push(<Tag key={blocks.length}>{inline(match[2])}</Tag>);
      i++;
      continue;
    }

    // Bullet list
    if (isUl(line)) {
      const items = [];
      while (i < lines.length && isUl(lines[i])) {
        items.push(
          <li key={items.length}>
            {inline(lines[i].replace(/^\s*[-*•]\s+/, ""))}
          </li>,
        );
        i++;
      }
      blocks.push(<ul key={blocks.length}>{items}</ul>);
      continue;
    }

    // Numbered list
    if (isOl(line)) {
      const items = [];
      while (i < lines.length && isOl(lines[i])) {
        items.push(
          <li key={items.length}>
            {inline(lines[i].replace(/^\s*\d+[.)]\s+/, ""))}
          </li>,
        );
        i++;
      }
      blocks.push(<ol key={blocks.length}>{items}</ol>);
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph — collect consecutive plain lines
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isCodeFence(lines[i]) &&
      !isHeading(lines[i]) &&
      !isHr(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(<p key={blocks.length}>{inline(para.join(" "))}</p>);
  }

  return <div className="markdown-body">{blocks}</div>;
}

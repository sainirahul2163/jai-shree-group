import type { ReactNode } from "react";
import Link from "next/link";

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseInlineLinks(text: string) {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    parts.push(
      isExternal ? (
        <a
          key={`${match.index}-${href}`}
          href={href}
          className="text-[#E8521A] underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="text-[#E8521A] underline-offset-2 hover:underline"
        >
          {label}
        </Link>
      )
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell, index, arr) => !(index === 0 && cell === "") && !(index === arr.length - 1 && cell === ""));
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s\-:|]+\|?$/.test(line.trim());
}

function parseContent(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      const headers = parseTableRow(line);
      i++;
      if (i < lines.length && isTableSeparator(lines[i])) {
        i++;
      }
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(parseTableRow(lines[i].trim()));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraphLines: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith("#") && !lines[i].trim().startsWith("|")) {
      paragraphLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: paragraphLines.join(" ") });
  }

  return blocks;
}

type BlogArticleContentProps = {
  content: string;
};

export function BlogArticleContent({ content }: BlogArticleContentProps) {
  const blocks = parseContent(content);

  return (
    <article className="prose prose-invert mt-8 max-w-none text-base leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="mb-4 mt-10 text-2xl font-bold first:mt-0"
                style={{ color: "#FFFFFF" }}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="mb-3 mt-8 text-xl font-semibold"
                style={{ color: "#FFFFFF" }}
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="mb-4" style={{ color: "#A0A0A0" }}>
                {parseInlineLinks(block.text)}
              </p>
            );
          case "table":
            return (
              <div key={index} className="mb-6 overflow-x-auto">
                <table
                  className="w-full min-w-[320px] border-collapse text-sm"
                  style={{ color: "#A0A0A0" }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2A2A2A" }}>
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "#FFFFFF" }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        style={{ borderBottom: "1px solid #1A1A1A" }}
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}

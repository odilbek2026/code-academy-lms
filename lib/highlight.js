const KEYWORDS = {
  javascript: ["const", "let", "var", "function", "return", "if", "else", "async", "await", "import", "export", "from", "new", "class", "for", "of", "try", "catch", "throw"],
  python: ["def", "return", "if", "else", "for", "in", "import", "from", "class", "try", "except", "with", "as", "lambda"],
  css: [],
  html: [],
  sql: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "JOIN", "ON", "DESC", "ASC"],
  bash: [],
};

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlight(code, language = "javascript") {
  let escaped = escapeHtml(code);

  // Strings
  escaped = escaped.replace(/(&quot;.*?&quot;|'.*?'|`[^`]*`)/g, '<span style="color:#4ADE80">$1</span>');
  // Comments (language-aware, to avoid matching CSS hex colors like #e5e7eb)
  if (language === "python" || language === "bash") {
    escaped = escaped.replace(/(#.*$)/gm, '<span style="color:#6B7280">$1</span>');
  } else if (language === "javascript") {
    escaped = escaped.replace(/(\/\/.*$)/gm, '<span style="color:#6B7280">$1</span>');
  }

  const keywords = KEYWORDS[language] || [];
  if (keywords.length) {
    const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    escaped = escaped.replace(pattern, '<span style="color:#F5A623">$1</span>');
  }

  return escaped;
}

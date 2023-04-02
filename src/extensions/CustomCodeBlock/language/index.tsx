import { KEYWORD_SEQUENCE, KEYWORD_CLASS } from "./keyword-mermaid"

const type = () => {
  const typeSequence =  KEYWORD_SEQUENCE.type;
  const typeClass = KEYWORD_CLASS.type.join("|");
  
  return `\\b(${typeSequence}|${typeClass})\\b`
}

const block = () => {
  const blockSequence = KEYWORD_SEQUENCE.block.join("|");
  const blockClass = KEYWORD_CLASS.block;
  
  return `\\b(${blockSequence}|${blockClass})\\b`
}

const keyword = () => {
  const keywordSequence = KEYWORD_SEQUENCE.keyword.join("|");
  const keywordClass = KEYWORD_CLASS.keyword.join("|");

  return `\\b(${keywordSequence}|${keywordClass})\\b`
}

export const mermaid = (hljs: any) => {
  return {
    name: "mermaid",
    aliases: ["mermaid", "mermaid"],
    contains: [
      {
        className: "type",
        begin: type(),
        relevance: 10,
      },
      {
        className: "block",
        begin: block(),
        relevance: 10,
      },
      {
        className: "keyword",
        begin: keyword(),
        relevance: 10,
      },
      hljs.HASH_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        // eslint-disable-next-line
        begin: `(:\s*(.*)$)|(<|--\s*(.*)$)|(-\s*(.*)$)`,
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0,
      },
    ],
  }
}
//\+\s*(.*?)$

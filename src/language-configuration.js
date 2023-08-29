const indentationRules = require('./indentation-rules');
module.exports = {
  comments: {
    blockComment: ['{% comment %}', '{% endcomment %}'],
  },
  brackets: [
    ['<', '>'],
    ['{{-', '-}}'],
    ['{{-', '}}'],
    ['{{', '-}}'],
    ['{{', '}}'],
    ['{%-', '-%}'],
    ['{%-', '%}'],
    ['{%', '-%}'],
    ['{%', '%}'],
    ['[', ']'],
    ['(', ')'],
  ],
  colorizedBracketPairs: [
    ['{{-', '-}}'],
    ['{{-', '}}'],
    ['{{', '-}}'],
    ['{{', '}}'],
    ['{%', '%}'],
    ['{%-', '-%}'],
    ['{%-', '%}'],
    ['{%', '-%}'],
    ['[', ']'],
    ['(', ')'],
    ['{', '}'],
  ],
  autoClosingPairs: [
    ['{', '}'],
    ['{{', '}}'],
    ['{%', '%}'],
    ['[', ']'],
    ['(', ')'],
    ['"', '"'],
    ["'", "'"],
    ['<', '>'],
  ],
  autoCloseBefore: '%-:.,=}])>\'"` \n\t',
  surroundingPairs: [
    ['-', '-'],
    ['<', '>'],
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    ["'", "'"],
    ['"', '"'],
    ['`', '`'],
  ],
  indentationRules,
};

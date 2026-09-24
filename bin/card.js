#!/usr/bin/env node
'use strict';

// Set NO_COLOR=1 to turn colors off.
const useColor = process.stdout.isTTY && !('NO_COLOR' in process.env);
const paint = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const accent = (s) => paint('38;2;255;138;101', s);
const muted = (s) => paint('38;2;176;149;144', s);
const bold = (s) => paint('1', s);

const title = 'Nathan Hawley III';
const rows = [
  ['focus', 'Testing, LLM agents, evals, CI/CD infrastructure', false],
  ['builds', 'test suites · eval suites · mobile apps · release pipelines', false],
  ['code', 'https://github.com/nhawley', true],
  ['web', 'https://nhawley.github.io', true],
  ['linkedin', 'https://linkedin.com/in/nate-hawley-iii', true],
];

const labelWidth = 10;
const padding = 3;
const inner = Math.max(title.length, ...rows.map(([, value]) => labelWidth + value.length));
const edge = '─'.repeat(inner + padding * 2);

const line = (plain = '', colored = plain) =>
  muted('│') + ' '.repeat(padding) + colored + ' '.repeat(inner - plain.length + padding) + muted('│');

const output = [
  '',
  muted(`╭${edge}╮`),
  line(),
  line(title, bold(accent(title))),
  line(),
  ...rows.map(([label, value, isLink]) => {
    const key = label.padEnd(labelWidth);
    return line(key + value, muted(key) + (isLink ? accent(value) : value));
  }),
  line(),
  muted(`╰${edge}╯`),
  '',
];

console.log(output.join('\n'));

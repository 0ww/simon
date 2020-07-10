import { SimonLangContext } from './context';

export function detectType(input: string): 'string' | 'number' | 'boolean' {
  if (!isNaN(parseFloat(input))) {
      return 'number';
  } else if (input === 'yes' || input === 'no') {
      return 'boolean';
  } else {
      return 'string';
  }
}

export function parse(input: string) {
  switch(detectType(input)) {
      case 'number':
          return parseFloat(input);
      case 'boolean':
          return input === 'yes';
      default:
      case 'string':
          return input;
  }
}

export function toJSOutput(input: any, context: SimonLangContext) {
  if (context.variables.indexOf(input) >= 0) { return input.split(' ').join('_'); }
  const parsed = parse(input);
  switch(typeof parsed) {
      default:
          return "" + parsed;
      case 'string':
          return `"${parsed}"`;
  }
}
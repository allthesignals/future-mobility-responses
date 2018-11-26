import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function safeStyle([styleObject]) {
  return htmlSafe(
    Object.keys(styleObject).reduce((acc, key) => {
      console.log(`${key}:${styleObject[key]};`)
      return acc.concat(`${key}:${styleObject[key]};`);
    }, '')
  );
}

export default helper(safeStyle);

import { helper } from '@ember/component/helper';

export function eq([left, right]/*, hash*/) {
  return left === right;
}

export default helper(eq);

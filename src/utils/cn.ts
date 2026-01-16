import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: classNames.ArgumentArray) => {
  const classNamesOutput = classNames(...args);

  return twMerge(classNamesOutput);
};

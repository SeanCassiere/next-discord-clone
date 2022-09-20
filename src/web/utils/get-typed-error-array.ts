type MyErrorMap = { message: string; path: string };
export function getTypedErrorArray(errors: any): MyErrorMap[] {
  const array: MyErrorMap[] = errors || [];
  return array;
}

export type InferSubstrings<
  TInput extends string,
  TDelim extends string = '.'
> = TInput extends `${infer TLeft}${TDelim}${infer TRight}`
  ? TLeft | `${TLeft}.${InferSubstrings<TRight>}`
  : TInput;

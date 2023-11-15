export type Collapsed =
  | string
  | {
      [key: string]: Collapsed
    }
  | Collapsed[]

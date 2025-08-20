declare module 'nprogress';
declare module 'nprogress' {
  export function start(): void;
  export function done(): void;
  export function set(value: number): void;
  export function inc(amount?: number): void;
}

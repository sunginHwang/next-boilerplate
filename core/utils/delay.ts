/**
 * 해당 ms 만큼 delay를 시켜줍니다.
 */

export default function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


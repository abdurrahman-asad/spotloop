export function test1(asd: number, senderTab?: chrome.tabs.Tab): number {
  console.log(senderTab);
  return asd;
}

export async function test2(test: string): Promise<string> {
  return test + test2;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(callBack: T) {
  let timeId: NodeJS.Timeout | undefined = undefined;
  return (args: Parameters<T>) => {
    clearTimeout(timeId);
    timeId = setTimeout(async () => {
      callBack.call(args);
    }, 200);
  };
}

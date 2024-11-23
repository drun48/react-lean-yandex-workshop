// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(callBack: T) {
  let timeId: NodeJS.Timeout | undefined = undefined;
  return (args: Parameters<T>) => {
    return new Promise((resolve) => {
      clearTimeout(timeId);
      timeId = setTimeout(async () => {
        return resolve(callBack.call(args));
      }, 200);
    });
  };
}

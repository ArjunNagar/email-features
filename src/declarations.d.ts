declare module 'whois' {
  const whois: {
    lookup: (
      domain: string,
      callback: (err: Error | null, data: string) => void,
    ) => void;
  };
  export = whois;
}

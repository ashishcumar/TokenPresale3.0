const weiToEth = (wei: string) => {
  return Number(wei) / 1000000000000000000;
};

const normalTokenCount = (token: bigint) => {
  return Number(token) / 1000000000000000000;
};

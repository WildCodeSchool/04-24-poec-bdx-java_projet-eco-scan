export type Deposit = {
  id: number | null;
  user: {
    id: number;
  };
  rubbish: {
    id: number;
  };
  bin: {
    id: number;
  };
  scanData: string;
};

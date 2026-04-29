export type CompanyBranch = {
  document: string;
  id: string;
  name: string;
  state: string;
};

export type CompanyBranchesResponse = {
  branches: CompanyBranch[];
};

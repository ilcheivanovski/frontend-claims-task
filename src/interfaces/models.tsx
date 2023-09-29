interface Claim {
  name: string;
  type: string;
  coverId: string;
  created: string;
  damageCost: number;
}

interface Cover {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  premium: number;
}

interface ClaimModel {
  id: string;
  name: string;
  type: { label: string; value: string };
  coverId: { label: string; value: string };
  created: string;
  damageCost: number;
}

interface CoverModel {
  id: string;
  startDate: string;
  endDate: string;
  type: { label: string; value: string };
  premium: number;
}

export type { ClaimModel, CoverModel, Cover, Claim };

export type FeatureStatus =
  | "In Progress"
  | "Not Started"
  | "Completed"
  | "Planning Done"
  | "Partial";

export type FeatureType = "Commitment" | "Stretch Goal";

export interface RequestingCustomer {
  name: string;
  arr: number;
  notionSlug?: string;
}

export interface Feature {
  id: string;
  featureName: string;
  oneLineSummary: string;
  status: FeatureStatus;
  type: FeatureType;
  ownership: string;
  requestingCustomers: RequestingCustomer[];
  strategyDocUrl?: string;
  specsUrl?: string;
  latestUpdate?: string;
  marketingMaterialsUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  features: Feature[];
}

export interface InDevelopmentView {
  products: Product[];
  lastUpdated: string;
}

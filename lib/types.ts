export type FeatureStatus =
  | "In Progress"
  | "Not Started"
  | "Completed"
  | "Planning Done"
  | "Partial";

export type FeatureType = "Commitment" | "Stretch Goal";

export interface RequestingCustomer {
  name: string;
  notionSlug?: string;
}

export interface Feature {
  id: string;
  featureName: string;
  oneLineSummary: string;
  status: FeatureStatus;
  type: FeatureType;
  ownership: string;
  arr: number;
  requestingCustomers: RequestingCustomer[];
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

import type { InDevelopmentView } from "@/lib/types";

export const inDevelopmentData: InDevelopmentView = {
  lastUpdated: "2026-05-20",
  products: [
    {
      id: "acrm",
      name: "ACRM",
      features: [
        {
          id: "acrm-1",
          featureName: "ACRM MCP Server — Phase 1",
          oneLineSummary:
            "Connect ACRM account and contact data to Claude via the MCP protocol for AI-assisted workflows",
          status: "In Progress",
          type: "Commitment",
          ownership: "Kanban",
          requestingCustomers: [
            { name: "DAW SE", arr: 850000 },
            { name: "Keune Haircosmetics", arr: 620000 },
            { name: "Trox", arr: 710000 },
            { name: "Scope", arr: 38327 },
            { name: "Habasit", arr: 972076 },
          ],
          strategyDocUrl: "https://www.notion.so/acrm-mcp-server-strategy",
          specsUrl: "https://www.notion.so/acrm-mcp-server-phase-1",
          latestUpdate:
            "May 2026: MCP server scaffolding complete. Authentication handshake with Claude API working in staging. Phase 1 covers read-only account + contact endpoints. Phase 2 (write, bulk ops) scoped for Q3.",
        },
        {
          id: "acrm-2",
          featureName: "Bulk Contact Import",
          oneLineSummary:
            "CSV and spreadsheet import for large contact lists with deduplication and field mapping",
          status: "Planning Done",
          type: "Commitment",
          ownership: "Kanban",
          requestingCustomers: [
            { name: "Metso", arr: 890000 },
            { name: "Bystronic", arr: 750000 },
            { name: "Swissbit", arr: 340000 },
          ],
          strategyDocUrl: "https://www.notion.so/acrm-bulk-import-strategy",
          specsUrl: "https://www.notion.so/acrm-bulk-contact-import",
          latestUpdate:
            "April 2026: Spec signed off. Engineering kick-off scheduled for June 2. Deduplication strategy agreed — match on email domain + name similarity score above 0.85. Dev work begins after MCP Phase 1 ships.",
        },
        {
          id: "acrm-3",
          featureName: "AI-Powered Contact Scoring",
          oneLineSummary:
            "Automatically rank contacts by engagement likelihood using activity signals and firmographic data",
          status: "Not Started",
          type: "Stretch Goal",
          ownership: "Product",
          requestingCustomers: [
            { name: "DAW SE", arr: 850000 },
            { name: "Habasit", arr: 972076 },
          ],
          strategyDocUrl: "https://www.notion.so/acrm-contact-scoring-strategy",
          latestUpdate:
            "Deprioritized from Q2 into Q3 pending MCP Phase 1 completion. AI scoring depends on the same contact data pipeline being built for MCP. Will revisit in July WBR.",
        },
      ],
    },
    {
      id: "tivian",
      name: "Tivian",
      features: [
        {
          id: "tivian-1",
          featureName: "Accessibility Compliance Dashboard",
          oneLineSummary:
            "Dedicated reporting module tracking WCAG compliance status across survey templates and published forms",
          status: "In Progress",
          type: "Commitment",
          ownership: "Engineering",
          requestingCustomers: [
            { name: "Scope", arr: 38327 },
            { name: "Manchester City Council", arr: 445000 },
            { name: "Greenpeace UK", arr: 95000 },
            { name: "Charity Aid Foundation", arr: 118000 },
          ],
          strategyDocUrl: "https://www.notion.so/tivian-accessibility-dashboard-strategy",
          specsUrl: "https://www.notion.so/tivian-accessibility-dashboard",
          latestUpdate:
            "May 2026: Dashboard data model finalised. Frontend build in progress — automated WCAG scan runs nightly and feeds the compliance score. On track for beta access to Scope and Manchester City Council in late June.",
        },
        {
          id: "tivian-2",
          featureName: "Survey Volume Pricing Tiers",
          oneLineSummary:
            "Flexible pricing tiers that scale with survey response volume, replacing the flat annual seat model",
          status: "Partial",
          type: "Commitment",
          ownership: "Product",
          requestingCustomers: [
            { name: "Scope", arr: 38327 },
            { name: "Charity Aid Foundation", arr: 118000 },
            { name: "Greenpeace UK", arr: 95000 },
          ],
          strategyDocUrl: "https://www.notion.so/tivian-volume-pricing-strategy",
          latestUpdate:
            "Backend pricing engine complete and tested. Front-end billing UI partially built — account settings page shows new tiers but self-serve upgrade flow is blocked on payment provider webhook work. ETA for full completion: end of June.",
        },
      ],
    },
    {
      id: "daw",
      name: "DAW",
      features: [
        {
          id: "daw-1",
          featureName: "Automated Renewal Forecasting",
          oneLineSummary:
            "Predict renewal probability and expected ARR using historical engagement, support, and usage signals",
          status: "In Progress",
          type: "Commitment",
          ownership: "Kanban",
          requestingCustomers: [
            { name: "Metso", arr: 890000 },
            { name: "Bystronic", arr: 750000 },
            { name: "Trox", arr: 710000 },
            { name: "Habasit", arr: 972076 },
            { name: "Schindler", arr: 1200000 },
          ],
          strategyDocUrl: "https://www.notion.so/daw-renewal-forecasting-strategy",
          specsUrl: "https://www.notion.so/daw-renewal-forecasting",
          latestUpdate:
            "May 2026: Model trained on 3 years of renewal data. Accuracy at 81% on holdout set — above 78% target. Integration with DAW dashboard underway. Pilot with 5 accounts planned for June before broader rollout.",
        },
        {
          id: "daw-2",
          featureName: "Custom Report Builder",
          oneLineSummary:
            "Drag-and-drop interface for building and scheduling custom account health and activity reports",
          status: "Completed",
          type: "Commitment",
          ownership: "Engineering",
          requestingCustomers: [
            { name: "DAW SE", arr: 850000 },
            { name: "Swissbit", arr: 340000 },
            { name: "Bystronic", arr: 750000 },
          ],
          strategyDocUrl: "https://www.notion.so/daw-report-builder-strategy",
          marketingMaterialsUrl: "https://www.notion.so/daw-report-builder-launch",
          latestUpdate:
            "Shipped May 8, 2026. All requesting accounts notified via in-app banner. Positive early feedback from DAW SE — they built 4 custom reports in the first week. Usage metrics in dashboard.",
        },
      ],
    },
  ],
};

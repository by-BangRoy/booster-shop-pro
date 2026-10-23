export interface CriticalFlaw {
  pillar: string;
  severity: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY';
  issue: string;
  explanation: string;
  salesImpact: string;
  quickFix: string;
}

export interface SEOTitles {
  recommendedFormula: string;
  option1_AlgorithmChamp: string;
  option2_ViralHook: string;
  option3_AdsReady: string;
  whyTheseWork: string;
}

export interface OptimizedDescription {
  attentionHook: string;
  problemAgitation: string;
  bulletBenefits: string[];
  riskReversalGuarantee: string;
  urgentCallToAction: string;
  shopeeTags: string[];
  fullFormattedText: string;
}

export interface VisualSlide {
  slideNumber: number;
  role: string;
  visualInstructions: string;
  overlayTextHook: string;
  conversionPsychology: string;
}

export interface PricingStrategy {
  suggestedCorePrice: string;
  suggestedPromoPrice: string;
  discountPercentage: string;
  bundleStrategy: string;
  voucherRecommendation: string;
}

export interface AutomationSystem {
  autoReplyGreeting: string;
  autoReplyStockQuery: string;
  abandonedCartBroadcast: string;
  packageInsertCardText: string;
  shopeeVideoHack: string;
  shopeeAdsStrategy: string;
}

export interface OrdersForecast {
  dailyImpressionsNeeded: number;
  targetCTR: string;
  targetConversionRate: string;
  projectedDailyOrders: number;
  projectedMonthlyOrders: number;
  roadmapTo1000Orders: string[];
}

export interface AuditResult {
  productName: string;
  category: string;
  thumbnailUrl?: string;
  auditScore: number;
  healthGrade: 'S' | 'A' | 'B' | 'C' | 'F';
  statusLabel: string;
  executiveSummary: string;
  criticalFlaws: CriticalFlaw[];
  seoTitles: SEOTitles;
  optimizedDescription: OptimizedDescription;
  visualBlueprint: VisualSlide[];
  pricingStrategy: PricingStrategy;
  automationSystem: AutomationSystem;
  ordersForecast: OrdersForecast;
  originalLink?: string;
}

export interface Master1000Recipe {
  productName: string;
  category: string;
  recipeTitle: string;
  lossLeaderVariant: {
    variantName: string;
    baitPrice: string;
    corePrice: string;
    howItTriggersCTR: string;
  };
  pricingAndDiscounts: {
    originalStrikePrice: string;
    promoSellingPrice: string;
    discountPercent: string;
    comboDeal: string;
    followPrizeVoucher: string;
    extraStoreVoucher: string;
  };
  coverPhotoHook: {
    stickerHeadline: string;
    badges: string[];
    visualLayoutTip: string;
  };
  copywritingDescription: {
    hook: string;
    bodyText: string;
    hashtags: string[];
  };
  liveStreamOpeningScript: string;
  chatAutomation: {
    greeting: string;
    abandonedCart: string;
    fiveStarThankYouCard: string;
  };
  adsTargetKeywords: Array<{
    keyword: string;
    recommendedBid: string;
    matchType: string;
  }>;
  dailySopActionSteps: string[];
  fullMasterExportText: string;
}

export interface ShopeeAdsKeyword {
  keyword: string;
  matchType: string;
  recommendedBid: string;
  searchVolume: string;
  intent: string;
}

export interface ShopeeAdsPlacementSetting {
  placementName: string;
  recommendedBidOrPremium: string;
  strategyTip: string;
}

export interface ShopeeAdsRoasAnalysis {
  productName: string;
  category: string;
  detectedPrice: string;
  estimatedMarginPercent: string;
  bestTargetRoas: string;
  breakEvenRoas: string;
  recommendedCir: string;
  maxSafeCpc: string;
  roasVerdictSummary: string;
  searchAdsSettings: {
    budgetType: string;
    campaignDuration: string;
    biddingMode: string;
    keywords: ShopeeAdsKeyword[];
  };
  discoveryAdsSettings: {
    recommendedDailyBudget: string;
    placements: ShopeeAdsPlacementSetting[];
    keyTactic: string;
  };
  antiBoncosRules: string[];
  defaultDailyBudget: number;
  estimatedDailyClicks: number;
  projectedOrdersPerDay: number;
  projectedDailyRevenue: number;
  projectedDailyProfit: number;
  fullAdsConfigExportText: string;
}


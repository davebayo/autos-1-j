export interface LandedCostComponents {
  basePriceCAD: number;
  exchangeRateCADtoNGN: number;
  inspectionAndTowingCAD: number;
  freightCAD: number;
  customsDutyAndLevyNGN: number;
  portClearingNGN: number;
  sourcingFeeNGN: number;
}

export interface LandedCostEstimate {
  totalCAD: number;
  totalNGN: number;
  components: LandedCostComponents;
  dateStamped: string;
  isVerified: boolean;
}

export function calculateLandedCost(
  components: LandedCostComponents,
  isVerified: boolean = false
): LandedCostEstimate {
  const {
    basePriceCAD,
    exchangeRateCADtoNGN,
    inspectionAndTowingCAD,
    freightCAD,
    customsDutyAndLevyNGN,
    portClearingNGN,
    sourcingFeeNGN,
  } = components;

  const totalCADComponents = basePriceCAD + inspectionAndTowingCAD + freightCAD;
  const cadToNGN = totalCADComponents * exchangeRateCADtoNGN;

  const totalNGN = cadToNGN + customsDutyAndLevyNGN + portClearingNGN + sourcingFeeNGN;

  return {
    totalCAD: totalCADComponents,
    totalNGN,
    components,
    dateStamped: new Date().toISOString(),
    isVerified
  };
}

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

export function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

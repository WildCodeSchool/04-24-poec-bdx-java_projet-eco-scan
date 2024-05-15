export enum WasteType {
    GLASS = "Glass",
    PLASTIC = "Plastic",
    BATTERY = "Battery",
    PAPER = "Paper",
    WASTE = "Waste"
}

export function getWasteTypeString(type: WasteType): string {
    switch (type) {
        case WasteType.GLASS:
          return "Glass";
        case WasteType.PLASTIC:
          return "Plastic";
        case WasteType.BATTERY:
          return "Battery";
        case WasteType.PAPER:
          return "Paper";
        case WasteType.WASTE:
          return "Waste";
        default:
          return "";
      }
  }

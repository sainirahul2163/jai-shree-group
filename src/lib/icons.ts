import {
  AlignJustify,
  Building2,
  Car,
  Circle,
  ClipboardList,
  Cog,
  Diamond,
  Factory,
  Flame,
  FlaskConical,
  Grid3X3,
  Hash,
  Landmark,
  Layers,
  LayoutGrid,
  Newspaper,
  PenTool,
  Pickaxe,
  Ruler,
  Settings2,
  Truck,
  UtensilsCrossed,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Grid3X3,
  Zap,
  Diamond,
  LayoutGrid,
  Hash,
  Circle,
  Layers,
  AlignJustify,
  Ruler,
  Settings2,
};

export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Car,
  Building2,
  UtensilsCrossed,
  FlaskConical,
  Flame,
  Landmark,
  Factory,
  Pickaxe,
  Newspaper,
  Wheat,
};

export const PROCESS_ICONS: Record<string, LucideIcon> = {
  ClipboardList,
  PenTool,
  Layers,
  Cog,
  Truck,
};

export function getProductIcon(iconName: string): LucideIcon {
  return PRODUCT_ICONS[iconName] ?? Grid3X3;
}

export function getIndustryIcon(iconName: string): LucideIcon {
  return INDUSTRY_ICONS[iconName] ?? Factory;
}

export function getProcessIcon(iconName: string): LucideIcon {
  return PROCESS_ICONS[iconName] ?? ClipboardList;
}

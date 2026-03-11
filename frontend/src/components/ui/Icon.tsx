import {
  Construction, Truck, Forklift, Cog, Building2, Factory, Wrench, Clock,
  Flame, Zap, HardHat, Ship, Radio, Music, Shield, Users,
  CheckCircle2, Star, MapPin, Phone, Award, Target, Eye, Hammer,
  ArrowRight, ChevronRight, ChevronDown, Menu, X, Mail,
  MessageCircle, Calendar, Upload, FileText, Camera, AlertTriangle,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  crane: Construction,
  truck: Truck,
  weight: Forklift,
  cog: Cog,
  building: Building2,
  factory: Factory,
  wrench: Wrench,
  clock: Clock,
  flame: Flame,
  zap: Zap,
  'hard-hat': HardHat,
  ship: Ship,
  radio: Radio,
  music: Music,
  shield: Shield,
  users: Users,
  check: CheckCircle2,
  star: Star,
  'map-pin': MapPin,
  phone: Phone,
  award: Award,
  target: Target,
  eye: Eye,
  hammer: Hammer,
  'arrow-right': ArrowRight,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  menu: Menu,
  x: X,
  mail: Mail,
  'message-circle': MessageCircle,
  calendar: Calendar,
  upload: Upload,
  'file-text': FileText,
  camera: Camera,
  'alert-triangle': AlertTriangle,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || CheckCircle2;
}

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = '' }: IconProps) {
  const LucideIcon = getIcon(name);
  return <LucideIcon size={size} className={className} />;
}

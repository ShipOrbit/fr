export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_email_verified: boolean;
  company?: Company;
  shipping_needs?: ShippingNeeds;
}
export interface Company {
  name: string;
  location: string;
  primary_ships_country: string;
}
export interface ShippingNeeds {
  mode: string[];
  average_ftl: string;
  trailer_type: string[];
}
export interface RegisterStepOneData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  company_name: string;
  primary_ships_country: string;
}

export interface ShippingNeedsData {
  company_location: string;
  mode: string[];
  average_ftl: string;
  trailer_type: string[];
}
export interface SearchCitiesData {
  name_prefix: string;
}
export interface CountryRegionsData {
  search_Term: string;
}
export interface DistancePriceData {
  pickup_location: number;
  dropoff_location: number;
  equipment: string;
}

export interface GeoDBCity {
  id: 489;
  wikiDataId: string;
  name: string;
  countryCode: string;
  fipsCode: string;
  isoCode: string;
  type: string;
}

export interface PriceCalculation {
  pickup_location: string;
  dropoff_location: string;
  equipment: string;
  miles: number;
  base_price: number;
  min_transit_time: number;
  driver_assist_fee: number;
  total_price_with_assist: number;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface PasswordResetData {
  email: string;
}
export interface PasswordResetConfirmData {
  token: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
export interface FormErrors {
  [key: string]: string | string[];
}
export interface RegistrationState {
  step: number;
  userData: Partial<RegisterStepOneData>;
  shippingData: Partial<ShippingNeedsData>;
  isLoading: boolean;
  errors: FormErrors;
}

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
  pickup_location: GeoDBCity;
  dropoff_location: GeoDBCity;
  equipment: string;
}

export interface GeoDBCity {
  id: number;
  name: string;
  city: string;
  country_code: string;
  region_code: string;
  latitude: number;
  longitude: number;
}
export interface GeoDBRegion {
  id: number;
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
export interface CreateShipmentData {
  equipment: string;
  pickup: { city: number; date: string };
  dropoff: { city: number; date: string };
}

export interface Shipment {
  id: string;
  status: "unfinished" | "inprogress" | "upcoming" | "past";
  finalizeDate: string;
  pickup: {
    city: GeoDBCity;
    state: string;
    date: string;
  };
  dropoff: {
    city: GeoDBCity;
    state: string;
    date: string;
  };
}

export type Facility = Pick<
  Location,
  | "facility_name"
  | "facility_address"
  | "scheduling_preference"
  | "zip_code"
  | "email"
  | "phone_number"
  | "contact_name"
>;

export interface updateFinalizingData {
  reference_number?: string;
  weight?: number;
  commodity?: string;
  packaging?: number;
  packaging_type?: string;
  pickup_number?: string;
  pickup_notes?: string;
  dropoff_number?: string;
  dropoff_notes?: string;
}
export interface UpdateAppointmentData {
  pickup?: Facility;
  dropoff?: Facility;
  driver_assist?: boolean;
}

export interface GetShipmentsResult {
  results: Shipment[];
  count: number;
}

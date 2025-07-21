import type { AxiosResponse } from "axios";
import api from ".";
import type {
  CountryRegionsData,
  DistancePriceData,
  GeoDBCity,
  GeoDBRegion,
  PriceCalculation,
  SearchCitiesData,
  ShippingNeedsData,
} from "../../types";

export const shipperApi = {
  // Create shipping needs
  createShippingNeeds: async (data: ShippingNeedsData) => {
    const response: AxiosResponse<{
      message: string;
      redirect_to_verification: boolean;
    }> = await api.post("/shipper/shipping-needs/", data);
    return response.data;
  },

  //Search cities
  searchCities: async (data: SearchCitiesData) => {
    const response: AxiosResponse<GeoDBCity[]> = await api.get(
      `/shipper/cities?name_prefix=${data.name_prefix}`
    );
    return response.data;
  },

  //Get country Regions
  getCountryRegions: async (data: CountryRegionsData) => {
    const response: AxiosResponse<GeoDBRegion[]> = await api.get(
      `/shipper/country-regions?namePrefix=${data.search_Term}`
    );
    return response.data;
  },

  //Get distance price
  getDistancePrice: async (data: DistancePriceData) => {
    const response: AxiosResponse<PriceCalculation> = await api.post(
      "/shipper/distance-price/",
      data
    );
    return response.data;
  },
};

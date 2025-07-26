import { Loader2, MapPin, Search } from "lucide-react";
import {
  memo,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../utils/cn";
import type { GeoDBCity } from "../types";

type LocationSearchInputProps = {
  onSelect: (city: GeoDBCity) => void;
  getCities: (search: string) => Promise<GeoDBCity[]>;
  errors?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onSelect">;

export const LocationSearchInput = memo(
  ({
    onSelect,
    getCities,
    errors,
    className,
    ...props
  }: LocationSearchInputProps) => {
    const [value, setValue] = useState("");
    const [cities, setCities] = useState<GeoDBCity[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false); // Track if user is selecting from dropdown

    // Fetch cities when value changes (but not when selecting from dropdown)
    useEffect(() => {
      // Don't fetch if user is selecting from dropdown
      if (isSelecting) {
        setIsSelecting(false);
        return;
      }

      const fetchCities = async (value: string) => {
        try {
          setLoading(true);
          const result = await getCities(value);
          setCities(result);
        } finally {
          setLoading(false);
        }
      };

      const debounceTimer = setTimeout(() => {
        if (value) {
          fetchCities(value);
        } else {
          setCities([]);
        }
      }, 1000);

      return () => clearTimeout(debounceTimer);
    }, [value]);

    // Close dropdown if clicked outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={value}
            onInput={(e) => {
              setValue(e.currentTarget.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className={cn(
              "block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              errors ? "border-red-300" : "border-gray-300",
              className
            )}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {loading ? (
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && cities.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {cities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => {
                  setIsSelecting(true); // Flag that user is selecting from dropdown
                  onSelect(city);
                  setValue(
                    `${city.name}, ${city.region_code || city.country_code}`
                  );
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-500">
                  {city.name}, {city.region_code || city.country_code}
                </div>
              </button>
            ))}
          </div>
        )}

        {errors && <p className="mt-1 text-sm text-red-600">{errors}</p>}
      </div>
    );
  }
);

import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

// Define interfaces
interface Vehicle {
  id: number;
  category_id: number;
  name: string;
  number_plate_no: string;
  image: string;
  condition_vehicle: string;
  location_id: number;
  rent_per_day: string;
  availability_status: string;
}

interface Location {
  id: number;
  name: string;
}

// API URLs
const VEHICLES_API_URL = "http://localhost:8080/";
const LOCATIONS_API_URL = "http://localhost:8080/locations";

const VehicleSearch: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const response = await fetch(LOCATIONS_API_URL);
        const data = await response.json();
        setLocations(data.result || []); // Ensure data.result exists
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  // Fetch vehicles when a location is selected
  useEffect(() => {
    if (!selectedLocation) return;

    const fetchVehicles = async () => {
      setLoadingVehicles(true);
      try {
        const response = await fetch(`${VEHICLES_API_URL}?location_id=${selectedLocation.id}`);
        const data = await response.json();
        setVehicles(data.vehicles || []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoadingVehicles(false);
      }
    };

    fetchVehicles();
  }, [selectedLocation]);

  return (
    <div className="p-4">
      {/* Location Autocomplete */}
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedLocation(newValue)}
        loading={loadingLocations}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Location"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingLocations ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Search Results */}
      {loadingVehicles ? (
        <p>Loading vehicles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <div key={vehicle.id} className="border p-4 rounded-lg shadow">
                <img
                  src={`http://localhost:8080/${vehicle.image}`}
                  alt={vehicle.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-bold">{vehicle.name}</h3>
                <p>Number Plate: {vehicle.number_plate_no}</p>
                <p>Condition: {vehicle.condition_vehicle}</p>
                <p>Rent per day: <span className="font-bold">{vehicle.rent_per_day} LKR</span></p>
                <p>
                  Status: 
                  <span className={`ml-2 px-2 py-1 rounded-lg ${
                    vehicle.availability_status === "available"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                    {vehicle.availability_status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No vehicles found for this location.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;

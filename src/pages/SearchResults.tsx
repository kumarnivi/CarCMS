import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Button, CircularProgress } from "@mui/material";

// Interface for location & category options
interface Option {
  id: number;
  name: string;
}

// Interface for vehicle details
interface Vehicle {
  id: number;
  name: string;
  rent_per_day: string;
  number_plate_no: string;
  condition_vehicle: string;
  image: string;
  availability_status: string;
}

const SearchVehicle: React.FC = () => {
  const [locations, setLocations] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Option | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch Locations
  useEffect(() => {
    axios.get("http://localhost:8080/locations")
      .then((res) => {
        console.log("Locations API Response:", res.data);  // Debugging
  
        const data = res.data.locations; // Adjust based on API response
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          console.error("Invalid data format for locations:", data);
          setLocations([]); // Set empty array to avoid errors
        }
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
        setLocations([]); // Ensure it's always an array
      });
  }, []);

  // ✅ Fetch Categories
  useEffect(() => {
    axios.get("http://localhost:8080/getCategory")
      .then((res) => {
        console.log("Categories API Response:", res.data);  // Debugging
        const data = res.data.categories;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // ✅ Handle Search Request
  const handleSearch = () => {
    if (!selectedLocation || !selectedCategory) {
      alert("Please select both a location and category");
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:8080/search?category_id=${selectedCategory.id}&location_id=${selectedLocation.id}`)
      .then((res) => {
        console.log("Vehicles API Response:", res.data);  // Debugging
        setVehicles(res.data.vehicles || []);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: "20px" }}>
      <h2>Search Vehicles</h2>

      {/* ✅ Location Search Field */}
       <Autocomplete
        options={locations}
        getOptionLabel={(option) => option?.name ?? ""}
        value={selectedLocation}
        onChange={(event, newValue) => setSelectedLocation(newValue)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Search Location" variant="outlined" />}
        noOptionsText="No locations available"
      />

      <br />

      {/* ✅ Category Search Field */}
      <Autocomplete
  options={locations || []} // Ensure it's an array
  getOptionLabel={(option) => option?.name || ""}
  value={selectedLocation}
  onChange={(event, newValue) => setSelectedLocation(newValue)}
  isOptionEqualToValue={(option, value) => option.id === value.id}
  renderInput={(params) => (
    <TextField {...params} label="Search Location" variant="outlined" />
  )}
  noOptionsText="No locations available"
/>

      <br />

      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Search"}
      </Button>

      {/* ✅ Display Search Results */}
      {vehicles.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <strong>{vehicle.name}</strong> - {vehicle.rent_per_day} LKR/day <br />
                <img src={`http://localhost:8080/${vehicle.image}`} alt={vehicle.name} width="100" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchVehicle;

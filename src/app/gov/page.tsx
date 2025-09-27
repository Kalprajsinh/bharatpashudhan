"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, BarChart3, Users, TrendingUp, Calendar, FileText, Shield } from "lucide-react"

interface GovernmentDashboardProps {
  onBack: () => void
}

const mockLivestockData = [
  {
    id: 1,
    species: "Cow",
    breed: "Gir",
    lat: 23.0225,
    lng: 72.5714,
    district: "Ahmedabad",
    state: "Gujarat",
    owner: "Ramesh Patel",
  },
  {
    id: 2,
    species: "Buffalo",
    breed: "Banni",
    lat: 28.7041,
    lng: 77.1025,
    district: "Delhi",
    state: "Delhi",
    owner: "Suresh Kumar",
  },
  {
    id: 3,
    species: "Cow",
    breed: "Kankrej",
    lat: 26.9124,
    lng: 75.7873,
    district: "Jaipur",
    state: "Rajasthan",
    owner: "Lakshmi Devi",
  },
  {
    id: 4,
    species: "Cow",
    breed: "Gir",
    lat: 26.2389,
    lng: 73.0243,
    district: "Jodhpur",
    state: "Rajasthan",
    owner: "Mohan Singh",
  },
  {
    id: 5,
    species: "Cow",
    breed: "Kankrej",
    lat: 19.076,
    lng: 72.8777,
    district: "Mumbai",
    state: "Maharashtra",
    owner: "Priya Sharma",
  },
  {
    id: 6,
    species: "Buffalo",
    breed: "Banni",
    lat: 30.7333,
    lng: 76.7794,
    district: "Chandigarh",
    state: "Punjab",
    owner: "Harpreet Singh",
  },
  // {
  //   id: 7,
  //   species: "Cow",
  //   breed: "Gir",
  //   lat: 13.0827,
  //   lng: 80.2707,
  //   district: "Chennai",
  //   state: "Tamil Nadu",
  //   owner: "Rajesh Kumar",
  // },
  // {
  //   id: 8,
  //   species: "Cow",
  //   breed: "Sahiwal",
  //   lat: 22.5726,
  //   lng: 88.3639,
  //   district: "Kolkata",
  //   state: "West Bengal",
  //   owner: "Amit Das",
  // },
]

const regionStats = [
  { 
    state: "Gujarat", 
    totalAnimals: 32, 
    cows: 20, 
    Banni: 12, 
    gir: 11, 
    Kankrej: 9, 
  },
]

const breedDistribution = [
  { breed: "Gir", count: 16, percentage: 42 },
  { breed: "Kankrej", count: 9, percentage: 24 },
  { breed: "Banni", count: 13, percentage: 34 },
]

const IndiaMap = ({ data }: { data: typeof mockLivestockData }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const stateColors: { [key: string]: string } = {
    Gujarat: "#3B82F6",
    Punjab: "#10B981",
    Rajasthan: "#F59E0B",
    Maharashtra: "#8B5CF6",
    "Tamil Nadu": "#EF4444",
    Delhi: "#06B6D4",
    "West Bengal": "#F97316",
  }

  const getStateData = (state: string) => {
    return data.filter((item) => item.state === state)
  }

  return (
    <div className="relative">
      <svg viewBox="0 0 800 600" className="w-full h-96 border rounded-lg bg-blue-50">
 
        <path
          d="M200 100 L600 100 L650 200 L600 500 L200 500 L150 200 Z"
          fill="#e5e7eb"
          stroke="#9ca3af"
          strokeWidth="2"
        />

        <g>
          {/* Gujarat */}
          <rect
            x="150"
            y="200"
            width="120"
            height="100"
            fill={stateColors.Gujarat}
            opacity={selectedState === "Gujarat" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Gujarat" ? null : "Gujarat")}
          />
          <text x="210" y="250" textAnchor="middle" className="text-xs fill-white font-semibold">
            Gujarat
          </text>

          {/* Punjab */}
          <rect
            x="250"
            y="120"
            width="100"
            height="80"
            fill={stateColors.Punjab}
            opacity={selectedState === "Punjab" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Punjab" ? null : "Punjab")}
          />
          <text x="300" y="160" textAnchor="middle" className="text-xs fill-white font-semibold">
            Punjab
          </text>

          {/* Rajasthan */}
          <rect
            x="200"
            y="180"
            width="140"
            height="120"
            fill={stateColors.Rajasthan}
            opacity={selectedState === "Rajasthan" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Rajasthan" ? null : "Rajasthan")}
          />
          <text x="270" y="240" textAnchor="middle" className="text-xs fill-white font-semibold">
            Rajasthan
          </text>

          {/* Maharashtra */}
          <rect
            x="300"
            y="300"
            width="120"
            height="100"
            fill={stateColors.Maharashtra}
            opacity={selectedState === "Maharashtra" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Maharashtra" ? null : "Maharashtra")}
          />
          <text x="360" y="350" textAnchor="middle" className="text-xs fill-white font-semibold">
            Maharashtra
          </text>

          {/* Tamil Nadu */}
          <rect
            x="400"
            y="400"
            width="100"
            height="80"
            fill={stateColors["Tamil Nadu"]}
            opacity={selectedState === "Tamil Nadu" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Tamil Nadu" ? null : "Tamil Nadu")}
          />
          <text x="450" y="440" textAnchor="middle" className="text-xs fill-white font-semibold">
            Tamil Nadu
          </text>

          {/* Delhi */}
          <circle
            cx="320"
            cy="160"
            r="15"
            fill={stateColors.Delhi}
            opacity={selectedState === "Delhi" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "Delhi" ? null : "Delhi")}
          />
          <text x="320" y="165" textAnchor="middle" className="text-xs fill-white font-semibold">
            Delhi
          </text>

          {/* West Bengal */}
          <rect
            x="500"
            y="250"
            width="80"
            height="100"
            fill={stateColors["West Bengal"]}
            opacity={selectedState === "West Bengal" ? 1 : 0.7}
            className="cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedState(selectedState === "West Bengal" ? null : "West Bengal")}
          />
          <text x="540" y="300" textAnchor="middle" className="text-xs fill-white font-semibold">
            W. Bengal
          </text>
        </g>

        {data.map((item) => {
          const x =
            item.state === "Gujarat"
              ? 210
              : item.state === "Punjab"
                ? 300
                : item.state === "Rajasthan"
                  ? 270
                  : item.state === "Maharashtra"
                    ? 360
                    : item.state === "Tamil Nadu"
                      ? 450
                      : item.state === "Delhi"
                        ? 320
                        : 540
          const y =
            item.state === "Gujarat"
              ? 250
              : item.state === "Punjab"
                ? 160
                : item.state === "Rajasthan"
                  ? 240
                  : item.state === "Maharashtra"
                    ? 350
                    : item.state === "Tamil Nadu"
                      ? 440
                      : item.state === "Delhi"
                        ? 160
                        : 300

          return (
            <circle
              key={item.id}
              cx={x + (Math.random() - 0.5) * 40}
              cy={y + (Math.random() - 0.5) * 30}
              r="4"
              fill="#ffffff"
              stroke="#10597d"
              strokeWidth="2"
              className="cursor-pointer"
            />
          )
        })}
      </svg>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        {Object.entries(stateColors).map(([state, color]) => (
          <div key={state} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
            <span className="text-gray-700">{state}</span>
          </div>
        ))}
      </div>

      {selectedState && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
          <h4 className="font-semibold text-[#10597d] mb-2">{selectedState} - Livestock Data</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {getStateData(selectedState).map((item) => (
              <div key={item.id} className="bg-white p-2 rounded border">
                <p className="font-medium">
                  {item.species} - {item.breed}
                </p>
                <p className="text-gray-600">{item.district}</p>
                <p className="text-gray-500 text-xs">Owner: {item.owner}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const MapVisualization = () => {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  function getRandomOffset() {
    return (Math.random()) * 0.3;
  }

  const districtData: { district: string, position: [number, number], breed: string }[] = [
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Gir" },
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Kankrej" },
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Banni" },
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Gir" },
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Kankrej" },
    { district: "AHMADABAD", position: [23.0225 + getRandomOffset(), 72.5714 + getRandomOffset()], breed: "Banni" },

    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Gir" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Kankrej" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Banni" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Gir" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Kankrej" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Banni" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Gir" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Kankrej" },
    { district: "PANCH MAHALS", position: [23.0535 + getRandomOffset(), 73.6042 + getRandomOffset()], breed: "Banni" },

    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Gir" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Kankrej" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Banni" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Gir" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Kankrej" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Banni" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Gir" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Kankrej" },
    { district: "SURAT", position: [21.1702 + getRandomOffset(), 72.8311 + getRandomOffset()], breed: "Banni" },

    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Gir" },
    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Kankrej" },
    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Banni" },
    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Gir" },
    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Kankrej" },
    { district: "VADODARA", position: [22.3072 + getRandomOffset(), 73.1812 + getRandomOffset()], breed: "Banni" },

    { district: "BHARUCH", position: [21.7051 + getRandomOffset(), 73.0635 + getRandomOffset()], breed: "Gir" },
    { district: "BHARUCH", position: [21.7051 + getRandomOffset(), 73.0635 + getRandomOffset()], breed: "Kankrej" },
    { district: "BHARUCH", position: [21.7051 + getRandomOffset(), 73.0635 + getRandomOffset()], breed: "Banni" }
  ];

  const [filterBreed, setFilterBreed] = useState<string>("All")
  const [filterDistrict, setFilterDistrict] = useState<string>("All")

  const allBreeds = Array.from(new Set(districtData.map(animal => animal.breed))).sort()
  const allDistricts = Array.from(new Set(districtData.map(animal => animal.district))).sort()

  const filteredAnimals = districtData.filter(animal =>
    (filterBreed === "All" || animal.breed === filterBreed) &&
    (filterDistrict === "All" || animal.district === filterDistrict)
  )

  const breedColors: { [key: string]: string } = {
    "Gir": "#0000ff", 
    "Kankrej": "#0000ff",
    "Banni": "#0000ff",
  }

  return (
    <div className="flex h-full">
      <div className="w-80 bg-gradient-to-b from-white to-blue-50 border-r border-blue-200 p-6 shadow-lg">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">Filter by Breed & Region</h3>
          <p className="text-sm text-blue-600">Select breed and district to filter livestock data on the map</p>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-blue-700 mb-3">Select District</h4>
          <select 
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full text-blue-800 p-3 border border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Districts</option>
            {allDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-blue-700 mb-3">Select Breed</h4>
          <select 
            value={filterBreed}
            onChange={(e) => setFilterBreed(e.target.value)}
            className="w-full text-blue-800 p-3 border border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Breeds</option>
            {allBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-blue-700 mb-3">Breed Legend</h4>
          <div className="space-y-2">
            {allBreeds.map(breed => (
              <div key={breed} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: breedColors[breed] || "#9CA3AF" }}
                ></div>
                <span className="text-sm font-medium text-blue-800">{breed}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-3">Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">Total Animals:</span>
              <span className="font-semibold text-blue-800">{filteredAnimals.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Districts:</span>
              <span className="font-semibold text-blue-800">
                {new Set(filteredAnimals.map(a => a.district)).size}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Breeds:</span>
              <span className="font-semibold text-blue-800">
                {new Set(filteredAnimals.map(a => a.breed)).size}
              </span>
            </div>
          </div>
        </div> */}
      </div>
      
      <div className="flex-1 relative">
        <Map animals={filteredAnimals} breedColors={breedColors} />
      </div>
    </div>
  )
}

export default function GovernmentDashboard({ onBack }: GovernmentDashboardProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    setIsMapLoaded(true)
  }, [])

  const totalAnimals = 32
  const totalOwners = 18

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
  
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b-4 border-[#145378] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#145378] mb-2">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#145378] to-[#145378] rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group bg-gradient-to-br from-[#145378] to-[#145378] text-white hover:shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total Animals</p>
                  <p className="text-3xl font-bold">{totalAnimals.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs mt-1">+12% from last month</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-[#145378] to-[#145378] text-white hover:shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Total Owners</p>
                  <p className="text-3xl font-bold">{totalOwners.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs mt-1">+8% from last month</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-[#145378] to-[#145378] text-white hover:shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Cattle Breeds</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-blue-200 text-xs mt-1">Gir, Deshi, Kankrej</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-[#145378] to-[#145378] text-white hover:shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-semibold mb-1">Buffalo Breeds</p>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-blue-200 text-xs mt-1">Banni, Deshi</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#145378] to-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                Live Breed Distribution Map
              </CardTitle>
              <p className="text-white/80 text-sm mt-2">Interactive map showing livestock distribution across Gujarat districts</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[600px]">
                <MapVisualization />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                Region-wise Cattle Breeds
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {regionStats.map((region, index) => (
                  <div key={region.state} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-[#145378] text-lg">{region.state}</h4>
                      <div className="bg-blue-100 text-[#145378] px-3 py-1 rounded-full text-sm font-semibold">
                        {region.cows.toLocaleString()} Cows
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-[#145378] text-xs font-medium mb-1">Gir</p>
                        <p className="font-bold text-[#145378] text-lg">{region.gir.toLocaleString()}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-[#145378] text-xs font-medium mb-1">Other</p>
                        <p className="font-bold text-[#145378] text-lg">{(region.cows - region.gir).toLocaleString()}</p>
                      </div>
                    </div>
                    {index < regionStats.length - 1 && <div className="border-b border-blue-200 mt-4"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                Top Breed Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {breedDistribution.map((breed, index) => (
                  <div key={breed.breed} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#145378]">{breed.breed}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#145378]">{breed.count}</span>
                        <span className="bg-blue-100 text-[#145378] px-2 py-1 rounded-full text-xs font-semibold">{breed.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-[#145378] h-3 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${breed.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="bg-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                Vaccination Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#145378] mb-2 group-hover:scale-110 transition-transform duration-300">87.5%</div>
                <p className="text-sm text-[#145378] mb-4">Animals vaccinated this year</p>
                <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-[#145378] h-4 rounded-full transition-all duration-2000 ease-out" style={{ width: "87.5%" }}></div>
                </div>
                <p className="text-xs text-[#145378] mt-2 font-semibold">+5.2% from last year</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="bg-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                Health Issues Reported
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#145378] mb-2 group-hover:scale-110 transition-transform duration-300">14</div>
                <p className="text-sm text-[#145378] mb-4">Cases this month</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-[#145378] font-semibold">Resolved</p>
                    <p className="text-[#145378] text-lg font-bold">12</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-[#145378] font-semibold">Pending</p>
                    <p className="text-[#145378] text-lg font-bold">2</p>
                  </div>
                </div>
                <p className="text-xs text-[#145378] mt-2 font-semibold">-12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="bg-[#145378] text-white">
              <CardTitle className="flex items-center gap-3 text-white text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                Breeding Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#145378] mb-2 group-hover:scale-110 transition-transform duration-300">92.3%</div>
                <p className="text-sm text-[#145378] mb-4">Successful breeding attempts</p>
                <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-[#145378] h-4 rounded-full transition-all duration-2000 ease-out" style={{ width: "92.3%" }}></div>
                </div>
                <p className="text-xs text-[#145378] mt-2 font-semibold">+3.1% from last quarter</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, Heart, Syringe, Baby, AlertTriangle, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface OwnerDashboardProps {
  onBack: () => void
}

// Mock data for demonstration
const mockAnimals = [
  {
    id: "AN001",
    species: "Cow",
    breed: "Gir",
    gender: "Female",
    dateOfBirth: "15/03/2020",
    color: "Brown",
    ownerAadhaar: "1234-5678-9012",
    timeline: [
      {
        date: "15/03/2020",
        event: "Birth Registration",
        type: "birth",
        details: "Born healthy, weight 28kg, registered by FLW Rajesh Kumar",
      },
      {
        date: "20/04/2020",
        event: "First Vaccination - FMD",
        type: "vaccination",
        details: "Foot & Mouth Disease vaccine administered by Dr. Sharma",
      },
      {
        date: "10/08/2020",
        event: "Health Checkup",
        type: "health",
        details: "Routine health examination - All parameters normal",
      },
      {
        date: "15/06/2021",
        event: "First Breeding - AI",
        type: "breeding",
        details: "Artificial Insemination with Jersey Bull semen, ID: JB-2021-78",
      },
      {
        date: "18/03/2022",
        event: "Calving",
        type: "calving",
        details: "Female calf born, weight 25kg, both mother and calf healthy",
      },
      {
        date: "25/03/2022",
        event: "Post-Calving Checkup",
        type: "health",
        details: "Post-partum examination - Recovery excellent",
      },
      {
        date: "10/07/2022",
        event: "Vaccination - Annual Booster",
        type: "vaccination",
        details: "Annual FMD booster dose administered",
      }
    ],
  },
  {
    id: "AN002",
    species: "Buffalo",
    breed: "Murrah",
    gender: "Male",
    dateOfBirth: "10/08/2019",
    color: "Black",
    ownerAadhaar: "1234-5678-9012",
    timeline: [
      {
        date: "10/08/2019",
        event: "Birth Registration",
        type: "birth",
        details: "Born healthy, weight 35kg, registered by FLW Priya Patel",
      },
      {
        date: "15/09/2019",
        event: "First Vaccination - HS",
        type: "vaccination",
        details: "Haemorrhagic Septicaemia vaccine, batch no: HS2019-32",
      },
      {
        date: "20/10/2019",
        event: "Vaccination - BQ",
        type: "vaccination",
        details: "Black Quarter vaccine administered",
      },
      {
        date: "05/01/2020",
        event: "Health Checkup",
        type: "health",
        details: "Growth assessment - Weight 85kg, normal development",
      },
      {
        date: "15/06/2020",
        event: "Vaccination - FMD",
        type: "vaccination",
        details: "Foot & Mouth Disease vaccine, annual dose",
      },
      {
        date: "10/12/2021",
        event: "First Breeding Service",
        type: "breeding",
        details: "Used for natural breeding service, excellent performance",
      },
    ],
  },
  {
    id: "AN003",
    species: "Goat",
    breed: "Jamunapari",
    gender: "Female",
    dateOfBirth: "22/01/2021",
    color: "White with brown patches",
    ownerAadhaar: "1234-5678-9012",
    timeline: [
      {
        date: "22/01/2021",
        event: "Birth Registration",
        type: "birth",
        details: "Born healthy, weight 2.5kg, twin birth, registered by FLW Amit Singh",
      },
      {
        date: "15/02/2021",
        event: "First Vaccination - PPR",
        type: "vaccination",
        details: "Peste des Petits Ruminants vaccine administered",
      },
      {
        date: "20/03/2021",
        event: "Vaccination - FMD",
        type: "vaccination",
        details: "Foot & Mouth Disease vaccine for small ruminants",
      },
      {
        date: "10/08/2021",
        event: "Health Checkup",
        type: "health",
        details: "6-month health assessment - Weight 18kg, excellent growth",
      },
      {
        date: "05/03/2022",
        event: "First Breeding",
        type: "breeding",
        details: "Natural breeding with Jamunapari buck, supervised mating",
      },
      {
        date: "10/08/2022",
        event: "Post-Kidding Care",
        type: "health",
        details: "Post-partum examination - Mother and kids in excellent health",
      },
      {
        date: "15/01/2023",
        event: "Second Breeding",
        type: "breeding",
        details: "Second mating cycle, natural breeding",
      },

    ],
  },
  {
    id: "AN004",
    species: "Sheep",
    breed: "Marwari",
    gender: "Male",
    dateOfBirth: "18/11/2020",
    color: "Brown",
    ownerAadhaar: "1234-5678-9012",
    timeline: [
      {
        date: "18/11/2020",
        event: "Birth Registration",
        type: "birth",
        details: "Born healthy, weight 3kg, registered by FLW Sunita Devi",
      },
      {
        date: "25/12/2020",
        event: "First Vaccination - PPR",
        type: "vaccination",
        details: "PPR vaccine administered, batch no: PPR2020-67",
      },
      {
        date: "15/01/2021",
        event: "Vaccination - Enterotoxaemia",
        type: "vaccination",
        details: "Enterotoxaemia vaccine for protection against clostridial diseases",
      },
      {
        date: "20/06/2021",
        event: "Health Checkup",
        type: "health",
        details: "6-month assessment - Weight 25kg, normal wool growth",
      },
      {
        date: "10/12/2021",
        event: "First Breeding Service",
        type: "breeding",
        details: "Used for breeding with local ewes, good fertility",
      },
      {
        date: "15/08/2022",
        event: "Wool Shearing",
        type: "health",
        details: "Annual wool harvest - 2.5kg wool collected, good quality",
      },
      {
        date: "20/12/2022",
        event: "Health Issue - Parasites",
        type: "health",
        details: "Treated for internal parasites, deworming completed",
      }
    ],
  },
  {
    id: "AN005",
    species: "Cow",
    breed: "Holstein Friesian",
    gender: "Female",
    dateOfBirth: "08/07/2019",
    color: "Black and White",
    ownerAadhaar: "1234-5678-9012",
    timeline: [
      {
        date: "08/07/2019",
        event: "Birth Registration",
        type: "birth",
        details: "Born healthy, weight 32kg, high-yield breed, registered by FLW Mohan Lal",
      },
      {
        date: "15/08/2019",
        event: "First Vaccination - FMD",
        type: "vaccination",
        details: "FMD vaccine administered, imported vaccine used",
      },
      {
        date: "20/09/2019",
        event: "Vaccination - HS",
        type: "vaccination",
        details: "HS vaccine, batch no: HS2019-89",
      },
      {
        date: "10/02/2020",
        event: "Health Checkup",
        type: "health",
        details: "6-month health assessment - Excellent growth, weight 180kg",
      },
      {
        date: "25/08/2020",
        event: "First Breeding - AI",
        type: "breeding",
        details: "AI with Holstein Friesian bull semen, high genetic merit",
      },
    ],
  },
]

const subsidies = [
  {
    name: "National Dairy Development Programme",
    amount: "₹75,000",
    status: "Eligible",
    description: "For dairy infrastructure and cattle purchase",
  },
  {
    name: "Artificial Insemination Subsidy",
    amount: "₹500",
    status: "Applied",
    description: "Per AI service under NLBP scheme",
  },
  {
    name: "Vaccination Support Scheme",
    amount: "₹300",
    status: "Received",
    description: "Annual vaccination cost reimbursement",
  },
  {
    name: "Pashu Kisan Credit Card",
    amount: "₹1,60,000",
    status: "Eligible",
    description: "Credit facility for livestock activities",
  },
  {
    name: "Fodder Development Scheme",
    amount: "₹25,000",
    status: "Applied",
    description: "For fodder cultivation and storage",
  },
]

export default function OwnerDashboard({ onBack }: OwnerDashboardProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const handleLogin = () => {
    if (aadhaarNumber.length === 14) {
      // Format: 1234-5678-9012
      setIsLoggedIn(true)
    }
  }

  const filteredAnimals = mockAnimals.filter((animal) => animal.ownerAadhaar === aadhaarNumber)

  const getEventIcon = (type: string) => {
    switch (type) {
      case "birth":
        return <Baby className="w-4 h-4" />
      case "vaccination":
        return <Syringe className="w-4 h-4" />
      case "breeding":
        return <Heart className="w-4 h-4" />
      case "calving":
        return <Baby className="w-4 h-4" />
      case "health":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "birth":
        return "bg-green-100 text-green-800"
      case "vaccination":
        return "bg-blue-100 text-blue-800"
      case "breeding":
        return "bg-pink-100 text-pink-800"
      case "calving":
        return "bg-purple-100 text-purple-800"
      case "health":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex flex-col">
        <header className="bg-white shadow-sm border-b-4 border-blue-200">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">Owner Dashboard</h1>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Card className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 w-full max-w-md mx-auto p-0 overflow-hidden">
            <div className="flex flex-col items-center justify-center pt-10 pb-2 bg-gradient-to-br from-blue-50 via-white to-blue-100">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-lg mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#3B82F6"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" fill="#60A5FA"/></svg>
              </div>
              <CardTitle className="text-center text-blue-800 text-2xl font-bold mb-2">Owner Login</CardTitle>
              <p className="text-blue-700 text-sm mb-6">Access your livestock dashboard</p>
            </div>
            <CardContent className="space-y-6 px-8 pb-10 pt-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-b-3xl">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  placeholder="1234-5678-9012"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  maxLength={14}
                  className="mt-1"
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-600 hover:scale-105 transition-all py-3 text-lg"
                disabled={aadhaarNumber.length !== 14}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex flex-col">
      <header className="bg-white shadow-sm border-b-4 border-blue-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">My Livestock Dashboard</h1>
              <p className="text-sm text-gray-600">Aadhaar: {aadhaarNumber}</p>
            </div>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline" className="text-blue-700 border-blue-600 hover:bg-blue-50">
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Animals List */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center text-xl font-bold">
                  <Search className="w-5 h-5 mr-2" />
                  My Animals ({filteredAnimals.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAnimals.map((animal) => (
                  <Card
                    key={animal.id}
                    className={`cursor-pointer rounded-2xl transition-all border-2 ${
                      selectedAnimal === animal.id ? "bg-blue-50 border-blue-400 scale-105 shadow-lg" : "hover:bg-blue-50 border-transparent"
                    }`}
                    onClick={() => setSelectedAnimal(animal.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800 text-base">{animal.id}</h4>
                        <Badge variant="outline">{animal.species}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {animal.breed} • {animal.gender}
                      </p>
                      <p className="text-sm text-gray-500">Born: {animal.dateOfBirth}</p>
                    </CardContent>
                  </Card>
                ))}
                {filteredAnimals.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No animals found for this Aadhaar number</p>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Animal Timeline */}
          <div className="lg:col-span-2">
            {selectedAnimal ? (
              <Card className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-xl font-bold">
                    Animal Timeline - {filteredAnimals.find((a) => a.id === selectedAnimal)?.id}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAnimals
                      .find((a) => a.id === selectedAnimal)
                      ?.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 rounded-xl shadow-sm">
                          <div className={`p-2 rounded-full ${getEventColor(event.type)} shadow`}>
                            {getEventIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-gray-800">{event.event}</h4>
                              <span className="text-sm text-gray-500">{event.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
                <CardContent className="p-16 text-center">
                  <Search className="w-16 h-16 text-blue-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select an Animal</h3>
                  <p className="text-gray-500">Choose an animal from the list to view its complete timeline</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Subsidies Section */}
        <div className="mt-10">
          <Card className="bg-white rounded-3xl shadow-xl border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center text-xl font-bold">
                <Gift className="w-5 h-5 mr-2" />
                Eligible Subsidies & Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {subsidies.map((subsidy, index) => (
                  <Card key={index} className="border-l-4 border-blue-300 rounded-2xl shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{subsidy.name}</h4>
                        <Badge
                          variant={
                            subsidy.status === "Eligible"
                              ? "default"
                              : subsidy.status === "Applied"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {subsidy.status}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-blue-700 mb-1">{subsidy.amount}</p>
                      <p className="text-xs text-gray-600">{subsidy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

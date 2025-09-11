'use client';

import React, { useState } from 'react';
import { Plus, Syringe, Heart, AlertCircle, LogOut, X } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

type ModalType = 'animalRegistration' | 'vaccination' | 'breeding' | 'healthIssue' | null;

interface HomePageProps {
  user: User;
  onLogout: () => void;
}

export default function HomePage({ user, onLogout }: HomePageProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  const [animalRegistration, setAnimalRegistration] = useState<{
    breed: string;
    gender: string;
    dob: string;
    color: string;
    physicalMarks: string;
    photo: File | null;
    aadhaar: string;
  }>({
    breed: '',
    gender: '',
    dob: '',
    color: '',
    physicalMarks: '',
    photo: null,
    aadhaar: ''
  });
  
  const [vaccination, setVaccination] = useState<{
    animalId: string;
    vaccineName: string;
    dateAdministered: string;
    batchNumber: string;
    notes: string;
    aadhaar: string;
    vaccineType: string;
    nextDueDate: string;
    veterinarian: string;
  }>({
    animalId: '',
    vaccineName: '',
    dateAdministered: '',
    batchNumber: '',
    notes: '',
    aadhaar: '',
    vaccineType: '',
    nextDueDate: '',
    veterinarian: ''
  });
  
  const [breeding, setBreeding] = useState<{
    femaleAnimalId: string;
    maleAnimalId: string;
    breedingDate: string;
    veterinarian: string;
    notes: string;
    aadhaar: string;
    breedingMethod: string;
    expectedDeliveryDate: string;
    aiDetails: string;
  }>({
    femaleAnimalId: '',
    maleAnimalId: '',
    breedingDate: '',
    veterinarian: '',
    notes: '',
    aadhaar: '',
    breedingMethod: '',
    expectedDeliveryDate: '',
    aiDetails: ''
  });
  
  const [healthIssue, setHealthIssue] = useState<{
    animalId: string;
    issueType: string;
    dateReported: string;
    symptoms: string;
    treatment: string;
    veterinarian: string;
    notes: string;
  }>({
    animalId: '',
    issueType: '',
    dateReported: '',
    symptoms: '',
    treatment: '',
    veterinarian: '',
    notes: ''
  });

  const cards: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText: string;
    onClick: () => void;
  }> = [
    {
      title: 'Animal Registration',
      description: 'Register new animals with AI-powered breed identification and complete owner information.',
      icon: <Plus className="h-8 w-8 text-blue-600" />,
      buttonText: 'Start Registration',
      onClick: () => setActiveModal('animalRegistration'),
    },
    {
      title: 'Vaccinations',
      description: 'Track and schedule vaccinations for your livestock to ensure their health and safety.',
      icon: <Syringe className="h-8 w-8 text-blue-600" />,
      buttonText: 'Manage Vaccinations',
      onClick: () => setActiveModal('vaccination'),
    },
    {
      title: 'Breeding',
      description: 'Manage breeding records and schedules to enhance productivity and genetic improvement.',
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      buttonText: 'Manage Breeding',
      onClick: () => setActiveModal('breeding'),
    },
    {
      title: 'Health Issues',
      description: 'Report and track health problems to ensure proper treatment and care for animals.',
      icon: <AlertCircle className="h-8 w-8 text-blue-600" />,
      buttonText: 'Report Health Issues',
      onClick: () => setActiveModal('healthIssue'),
    },
  ];

  const handleSubmit = (formType: ModalType) => {
    console.log(`Submitting ${formType} form`);
    setActiveModal(null);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter((prev: any) => ({ ...prev, [field]: file }));
    }
  };

  const modalAnim = "";

  const renderModal = () => {
    switch(activeModal) {
      case 'animalRegistration':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-200 ${modalAnim}`}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-black text-black">Animal Registration</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-b-3xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed *</label>
                  <input
                    type="text"
                    placeholder="e.g., Gir, Murrah, Jamunapari"
                    className="w-full p-2 border text-gray-700 rounded-md text-gray-700"
                    value={animalRegistration.breed}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, breed: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={animalRegistration.gender}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, gender: e.target.value})}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={animalRegistration.dob}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, dob: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color of Animal *</label>
                  <input
                    type="text"
                    placeholder="e.g., Brown, White, Black"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={animalRegistration.color}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, color: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physical Marks (Optional)</label>
                  <textarea
                    placeholder="Distinguishing marks for identification"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={animalRegistration.physicalMarks}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, physicalMarks: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photograph of Animal *</label>
                  <input
                    type="file"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    onChange={(e) => handleFileUpload(e, setAnimalRegistration, 'photo')}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Aadhaar Number *</label>
                  <input
                    type="text"
                    placeholder="12-digit Aadhaar number"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={animalRegistration.aadhaar}
                    onChange={(e) => setAnimalRegistration({...animalRegistration, aadhaar: e.target.value})}
                    maxLength={12}
                  />
                </div>
              </div>
              <div className="flex justify-end p-6 border-t space-x-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit('animalRegistration')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Register Animal
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'vaccination':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-200 ${modalAnim}`}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-black">Vaccination Record</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-b-3xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID/Tag Number *</label>
                  <input
                    type="text"
                    placeholder="Enter animal ID"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.animalId}
                    onChange={(e) => setVaccination({...vaccination, animalId: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., FMD, Anthrax, HS"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.vaccineName}
                    onChange={(e) => setVaccination({...vaccination, vaccineName: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Administered *</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.dateAdministered}
                    onChange={(e) => setVaccination({...vaccination, dateAdministered: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    placeholder="Vaccine batch number"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.batchNumber}
                    onChange={(e) => setVaccination({...vaccination, batchNumber: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    placeholder="Any additional observations or notes"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.notes}
                    onChange={(e) => setVaccination({...vaccination, notes: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Aadhaar Number *</label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.aadhaar}
                    onChange={(e) => setVaccination({...vaccination, aadhaar: e.target.value})}
                    maxLength={12}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Type *</label>
                  <select
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.vaccineType}
                    onChange={(e) => setVaccination({...vaccination, vaccineType: e.target.value})}
                  >
                    <option value="">Select vaccine type</option>
                    <option value="fmd">FMD</option>
                    <option value="anthrax">Anthrax</option>
                    <option value="hs">HS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Due Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.nextDueDate}
                    onChange={(e) => setVaccination({...vaccination, nextDueDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian Name</label>
                  <input
                    type="text"
                    placeholder="Administering veterinarian"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={vaccination.veterinarian}
                    onChange={(e) => setVaccination({...vaccination, veterinarian: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end p-6 border-t space-x-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit('vaccination')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Vaccination Record
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'breeding':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-200 ${modalAnim}`}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-black">Breeding Record</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-b-3xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Female Animal ID *</label>
                  <input
                    type="text"
                    placeholder="Enter female animal ID"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.femaleAnimalId}
                    onChange={(e) => setBreeding({...breeding, femaleAnimalId: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Male Animal ID / Sire Details</label>
                  <input
                    type="text"
                    placeholder="Enter male animal ID or sire details"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.maleAnimalId}
                    onChange={(e) => setBreeding({...breeding, maleAnimalId: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breeding Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.breedingDate}
                    onChange={(e) => setBreeding({...breeding, breedingDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian/Technician Name</label>
                  <input
                    type="text"
                    placeholder="Name of attending professional"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.veterinarian}
                    onChange={(e) => setBreeding({...breeding, veterinarian: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breeding Notes</label>
                  <textarea
                    placeholder="Any observations, complications, or additional notes"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.notes}
                    onChange={(e) => setBreeding({...breeding, notes: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Aadhaar Number *</label>
                  <input
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.aadhaar}
                    onChange={(e) => setBreeding({...breeding, aadhaar: e.target.value})}
                    maxLength={12}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breeding Method *</label>
                  <select
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.breedingMethod}
                    onChange={(e) => setBreeding({...breeding, breedingMethod: e.target.value})}
                  >
                    <option value="">Select breeding method</option>
                    <option value="natural">Natural Mating</option>
                    <option value="ai">Artificial Insemination</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.expectedDeliveryDate}
                    onChange={(e) => setBreeding({...breeding, expectedDeliveryDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AI Details (if applicable)</label>
                  <textarea
                    placeholder="Semen batch, bull ID, etc."
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={breeding.aiDetails}
                    onChange={(e) => setBreeding({...breeding, aiDetails: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end p-6 border-t space-x-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit('breeding')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Breeding Record
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'healthIssue':
        return (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-200 ${modalAnim}`}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}>
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-black">Health Issue Report</h2>
                <button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-b-3xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID/Tag Number *</label>
                  <input
                    type="text"
                    placeholder="Enter animal ID"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.animalId}
                    onChange={(e) => setHealthIssue({...healthIssue, animalId: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Issue Type *</label>
                  <select
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.issueType}
                    onChange={(e) => setHealthIssue({...healthIssue, issueType: e.target.value})}
                  >
                    <option value="">Select issue type</option>
                    <option value="fever">Fever</option>
                    <option value="injury">Injury</option>
                    <option value="digestive">Digestive Issues</option>
                    <option value="respiratory">Respiratory Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Reported *</label>
                  <input
                    type="date"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.dateReported}
                    onChange={(e) => setHealthIssue({...healthIssue, dateReported: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms Observed *</label>
                  <textarea
                    placeholder="Describe the symptoms observed in detail"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.symptoms}
                    onChange={(e) => setHealthIssue({...healthIssue, symptoms: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Given</label>
                  <textarea
                    placeholder="Describe treatment provided or recommended"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.treatment}
                    onChange={(e) => setHealthIssue({...healthIssue, treatment: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian Name</label>
                  <input
                    type="text"
                    placeholder="Consulting veterinarian name"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.veterinarian}
                    onChange={(e) => setHealthIssue({...healthIssue, veterinarian: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    placeholder="Any additional observations or recommendations"
                    className="w-full p-2 border text-gray-700 rounded-md"
                    value={healthIssue.notes}
                    onChange={(e) => setHealthIssue({...healthIssue, notes: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end p-6 border-t space-x-4">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit('healthIssue')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Health Report
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">Welcome, {user.name || user.email}</h1>
        <button
          onClick={onLogout}
          className="flex items-center bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-xl shadow hover:from-red-600 hover:to-red-800 transition-all space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow group border border-gray-100 cursor-pointer"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{card.description}</p>
            <button
              onClick={card.onClick}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center space-x-2 shadow"
            >
              <Plus className="h-5 w-5" />
              <span>{card.buttonText}</span>
            </button>
          </div>
        ))}
      </div>
      {activeModal && renderModal()}
    </div>
  );
}
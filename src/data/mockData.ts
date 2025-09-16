export const statesAndDistricts = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Karnataka": ["Bagalkot", "Ballary", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "SAS Nagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"]
};

export const crops = [
  "Rice/Paddy", "Wheat", "Maize", "Sugarcane", "Cotton", "Soybean", "Groundnut", 
  "Sunflower", "Mustard", "Bajra", "Jowar", "Barley", "Gram", "Tur/Arhar", 
  "Urad", "Moong", "Masoor", "Sesame", "Niger", "Safflower", "Castor", "Linseed"
];

export const cropRecommendations = [
  {
    id: 1,
    name: "Rice/Paddy",
    icon: "🌾",
    profitPerAcre: 42000,
    badges: ["High Demand", "Water Intensive"],
    description: "Best for water-rich areas with good irrigation",
    bestSeedVariety: "Basmati 1121",
    seedRequired: "25 kg/acre",
    bestFertilizer: "NPK 20:20:0",
    fertilizerRequired: "100 kg/acre",
    economics: {
      seedCostPerAcre: 2500,
      fertilizerCostPerAcre: 3500,
      grossIncome: 48000,
      netProfit: 42000
    },
    varieties: [
      { name: "Basmati 1121", yield: 20, seedRequired: 25, premium: 2400 },
      { name: "IR-64", yield: 22, seedRequired: 30, premium: 2200 },
      { name: "Swarna", yield: 24, seedRequired: 28, premium: 2000 }
    ],
    fertilizers: [
      { name: "NPK 20:20:0", quantity: 100, costPerKg: 35 },
      { name: "Urea + DAP", quantity: 120, costPerKg: 28 },
      { name: "Organic Compost", quantity: 200, costPerKg: 15 }
    ]
  },
  {
    id: 2,
    name: "Sunflower",
    icon: "🌻",
    profitPerAcre: 38000,
    badges: ["Soil Friendly", "Less Water"],
    description: "Suitable for semi-arid regions with moderate water",
    bestSeedVariety: "KBSH-44",
    seedRequired: "2.5 kg/acre",
    bestFertilizer: "NPK 10:30:20",
    fertilizerRequired: "75 kg/acre",
    economics: {
      seedCostPerAcre: 1200,
      fertilizerCostPerAcre: 2800,
      grossIncome: 42000,
      netProfit: 38000
    },
    varieties: [
      { name: "KBSH-44", yield: 15, seedRequired: 2.5, premium: 2800 },
      { name: "PAC-36", yield: 14, seedRequired: 3, premium: 2700 },
      { name: "Bhima", yield: 13, seedRequired: 2.8, premium: 2600 }
    ],
    fertilizers: [
      { name: "NPK 10:30:20", quantity: 75, costPerKg: 38 },
      { name: "Single Super Phosphate", quantity: 100, costPerKg: 25 },
      { name: "Bio-fertilizer", quantity: 50, costPerKg: 45 }
    ]
  },
  {
    id: 3,
    name: "Cotton",
    icon: "🌱",
    profitPerAcre: 35000,
    badges: ["High Demand", "Export Potential"],
    description: "Suitable for black cotton soil with moderate rainfall",
    bestSeedVariety: "Bt Cotton",
    seedRequired: "800 grams/acre",
    bestFertilizer: "NPK 17:17:17",
    fertilizerRequired: "125 kg/acre",
    economics: {
      seedCostPerAcre: 3500,
      fertilizerCostPerAcre: 4500,
      grossIncome: 43000,
      netProfit: 35000
    },
    varieties: [
      { name: "Bt Cotton", yield: 18, seedRequired: 0.8, premium: 2400 },
      { name: "Hybrid Cotton", yield: 16, seedRequired: 1, premium: 2300 },
      { name: "Desi Cotton", yield: 12, seedRequired: 1.2, premium: 2100 }
    ],
    fertilizers: [
      { name: "NPK 17:17:17", quantity: 125, costPerKg: 36 },
      { name: "Calcium Nitrate", quantity: 100, costPerKg: 42 },
      { name: "Potash", quantity: 80, costPerKg: 48 }
    ]
  },
  {
    id: 4,
    name: "Soybean",
    icon: "🫘",
    profitPerAcre: 32000,
    badges: ["Nitrogen Fixing", "Protein Rich"],
    description: "Excellent for crop rotation and soil health",
    bestSeedVariety: "JS-335",
    seedRequired: "30 kg/acre",
    bestFertilizer: "DAP + Potash",
    fertilizerRequired: "90 kg/acre",
    economics: {
      seedCostPerAcre: 2400,
      fertilizerCostPerAcre: 3200,
      grossIncome: 37600,
      netProfit: 32000
    },
    varieties: [
      { name: "JS-335", yield: 16, seedRequired: 30, premium: 2350 },
      { name: "RKS-18", yield: 15, seedRequired: 32, premium: 2300 },
      { name: "MACS-1407", yield: 17, seedRequired: 28, premium: 2400 }
    ],
    fertilizers: [
      { name: "DAP + Potash", quantity: 90, costPerKg: 35 },
      { name: "Single Super Phosphate", quantity: 120, costPerKg: 25 },
      { name: "Rhizobium Culture", quantity: 200, costPerKg: 12 }
    ]
  }
];
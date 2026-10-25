const fs = require('fs');
const path = require('path');

const statesWithCities = {
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar", "Solapur", "Kolhapur",
    "Navi Mumbai", "Amravati", "Nanded", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar",
    "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Bhiwandi", "Panvel", "Satara", "Beed",
    "Yavatmal", "Gondia", "Wardha", "Achalpur", "Osmanabad", "Nandurbar", "Hinganghat", "Miraj",
    "Baramati", "Ulhasnagar", "Kalyan-Dombivli", "Mira-Bhayandar", "Vasai-Virar", "Badlapur", "Ambarnath",
    "Ratnagiri", "Palghar", "Bhandara", "Gadchiroli", "Sindhudurg"
  ],
  "Delhi NCR": [
    "New Delhi", "Central Delhi", "South Delhi", "North Delhi", "West Delhi", "East Delhi",
    "Noida", "Greater Noida", "Gurugram", "Faridabad", "Ghaziabad", "Meerut"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere",
    "Ballari", "Shivamogga", "Tumakuru", "Vijayapura", "Raichur", "Bidar", "Hosapete", "Gadag",
    "Hassan", "Udupi", "Bhadravati", "Chitradurga", "Kolar", "Mandya", "Chikkamagaluru", "Gangawati",
    "Bagalkot", "Ranebennur", "Karwar", "Chamarajanagar", "Yadgir", "Robertsonpet"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore",
    "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur",
    "Nagercoil", "Kanchipuram", "Kumbakonam", "Tirunelveli", "Cuddalore", "Tiruvannamalai", "Pollachi",
    "Rajapalayam", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Namakkal", "Pernampattu"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar",
    "Anand", "Navsari", "Morbi", "Nadiad", "Surendranagar", "Bharuch", "Vapi", "Mehsana", "Bhuj",
    "Porbandar", "Palanpur", "Valsad", "Gondal", "Veraval", "Godhra", "Patan", "Kalol", "Dahod",
    "Botad", "Amreli", "Deesa", "Jetpur", "Anjar", "Sanand", "Modasa", "Mahuva"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Bareilly", "Aligarh", "Moradabad",
    "Saharanpur", "Gorakhpur", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur",
    "Shahjahanpur", "Ayodhya", "Farrukhabad", "Budaun", "Maunath Bhanjan", "Hapur", "Etawah",
    "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai",
    "Sitapur", "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda",
    "Pilibhit", "Barabanki", "Mughalsarai", "Gonda", "Kasganj", "Basti", "Deoria", "Lalitpur"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Kharagpur",
    "Haldia", "Baharampur", "Habra", "Jalpaiguri", "Balurghat", "Bankura", "Darjeeling", "Shantipur",
    "Krishnanagar", "Ranaghat", "Medinipur", "Purulia", "Raiganj", "Cooch Behar", "Alipurduar", "Kalyani"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur",
    "Sikar", "Pali", "Sri Ganganagar", "Hanumangarh", "Beawar", "Kishangarh", "Tonk", "Jhunjhunu",
    "Baran", "Bundi", "Chittorgarh", "Nagaur", "Churu", "Hindaun", "Gangapur", "Sawai Madhopur",
    "Dholpur", "Sujangarh", "Bhiwadi", "Neemrana", "Barmer", "Jaisalmer"
  ],
  "Kerala": [
    "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha",
    "Kannur", "Kottayam", "Malappuram", "Kasaragod", "Thalassery", "Ponnani", "Vatakara",
    "Kanhangad", "Payyanur", "Tirur", "Koyilandy", "Neyyattinkara", "Kayamkulam", "Guruvayur"
  ],
  "Madhya Pradesh": [
    "Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam",
    "Rewa", "Katni", "Singrauli", "Burhanpur", "Khandwa", "Morena", "Bhind", "Chhindwara",
    "Guna", "Shivpuri", "Vidisha", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur",
    "Hoshangabad", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Batala",
    "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala",
    "Rajpura", "Firozpur", "Kapurthala", "Sunam", "Fazilka", "Mansa", "Sangrur", "Nakodar", "Nangal"
  ],
  "Haryana": [
    "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula",
    "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal",
    "Hansi", "Narnaul", "Fatehabad", "Gohana", "Tohana", "Narwana", "Charkhi Dadri", "Kurukshetra"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah",
    "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Bettiah", "Saharsa", "Sasaram",
    "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj",
    "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Lakhisarai", "Madhubani", "Samastipur"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati",
    "Kakinada", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam",
    "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram", "Madanapalle", "Guntakal",
    "Dharmavaram", "Gudivada", "Srikakulam", "Tadepalligudem"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar",
    "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet", "Jagtial", "Mancherial",
    "Nirmal", "Sircilla", "Kamareddy", "Kothagudem", "Bodhan", "Palwancha", "Vikarabad"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak",
    "Baripada", "Jharsuguda", "Jeypore", "Bargarh", "Rayagada", "Bolangir", "Bhawanipatna", "Angul",
    "Dhenkanal", "Kendrapara", "Paradeep"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh",
    "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Chaibasa", "Gumla", "Dumka", "Godda",
    "Sahibganj", "Chatra", "Simdega"
  ],
  "Assam & North East": [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Agartala",
    "Shillong", "Imphal", "Aizawl", "Kohima", "Itanagar", "Gangtok", "Dimapur", "Bongaigaon",
    "Dhubri", "Diphu", "North Lakhimpur", "Karimganj", "Sivasagar", "Goalpara", "Barpeta"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur",
    "Dhamtari", "Mahasamund", "Durg", "Champa", "Bhatapara", "Kanker"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital",
    "Pithoragarh", "Kotdwar", "Almora"
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Solan", "Mandi", "Baddi", "Kullu", "Palampur", "Bilaspur", "Paonta Sahib", "Nahan"
  ],
  "Jammu & Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua", "Sopore"
  ],
  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"
  ],
  "Union Territories": [
    "Chandigarh", "Puducherry", "Port Blair", "Daman", "Silvassa", "Leh"
  ],
  "Global Tech Hubs": [
    "Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Doha", "London", "Manchester", "Birmingham",
    "New York", "San Francisco", "Los Angeles", "Chicago", "Austin", "Toronto", "Vancouver",
    "Montreal", "Sydney", "Melbourne", "Brisbane", "Singapore", "Berlin", "Frankfurt", "Amsterdam",
    "Paris", "Tokyo"
  ]
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const locations = [];

// 1. Add States as State Locations
for (const stateName of Object.keys(statesWithCities)) {
  const isGlobal = stateName === "Global Tech Hubs";
  const stateSlug = slugify(stateName);
  const citiesInState = statesWithCities[stateName];
  
  locations.push({
    slug: stateSlug,
    name: stateName,
    type: isGlobal ? 'region' : 'state',
    state: stateName,
    country: isGlobal ? 'Global' : 'India',
    title: `Best Digital Marketing & Web Development Agency in ${stateName}`,
    metaDescription: `Accelerate your revenue with award-winning Web Development, SEO, App Development, and PPC Services across ${stateName}. Partner with top-rated tech experts.`,
    h1: `Digital Marketing & Web Development Agency in ${stateName}`,
    citiesCount: citiesInState.length,
    cities: citiesInState.map(c => slugify(c)),
    avgGrowth: "320% ROI",
    businessesScaled: "1,200+",
    rating: "4.9/5",
    reviewsCount: 384
  });

  // 2. Add Each City
  for (const city of citiesInState) {
    const citySlug = slugify(city);
    locations.push({
      slug: citySlug,
      name: city,
      type: 'city',
      state: stateName,
      country: isGlobal ? 'Global' : 'India',
      title: `Best Web Development & SEO Agency in ${city}, ${stateName} | Afwan Tech`,
      metaDescription: `Looking for top-tier Web Development, Custom Software & SEO in ${city}? We engineer high-converting digital solutions and rank brands on Google page 1.`,
      h1: `Web Development & Digital Growth Agency in ${city}`,
      avgGrowth: "285% Organic Growth",
      businessesScaled: "85+",
      rating: "4.9/5",
      reviewsCount: 120 + Math.floor(Math.random() * 80),
      parentSlug: stateSlug
    });
  }
}

console.log(`Total Locations Compiled: ${locations.length}`);

const code = `// Automatically Generated Programmatic SEO Location Directory
// Total Locations: ${locations.length} (States, Regions & Cities)

export const locationsData = ${JSON.stringify(locations, null, 2)};

export const getAllLocations = () => locationsData;

export const getLocationBySlug = (slug) => {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return locationsData.find(loc => loc.slug === clean) || null;
};

export const getLocationsByType = (type) => {
  return locationsData.filter(loc => loc.type === type);
};

export const getNearbyLocations = (slug, limit = 8) => {
  const current = getLocationBySlug(slug);
  if (!current) return locationsData.slice(0, limit);
  
  // Return locations in same state first
  const sameState = locationsData.filter(loc => loc.state === current.state && loc.slug !== slug);
  if (sameState.length >= limit) return sameState.slice(0, limit);
  
  const others = locationsData.filter(loc => loc.state !== current.state && loc.slug !== slug);
  return [...sameState, ...others].slice(0, limit);
};

export const searchLocations = (query, limit = 12) => {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return locationsData
    .filter(loc => loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q))
    .slice(0, limit);
};
`;

const targetDir = path.join(__dirname, 'next-frontend', 'src', 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
fs.writeFileSync(path.join(targetDir, 'locationsData.js'), code);
console.log('Successfully generated next-frontend/src/data/locationsData.js');

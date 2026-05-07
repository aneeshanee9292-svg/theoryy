/**
 * Comprehensive mapping of Indian states/UTs to their major cities.
 * Used in the Checkout page for cascading State → City dropdowns.
 */
export const INDIAN_STATES_AND_CITIES: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
    "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur",
    "Eluru", "Ongole", "Srikakulam", "Chittoor", "Machilipatnam"
  ],
  "Arunachal Pradesh": [
    "Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro",
    "Bomdila", "Along", "Tezu", "Roing", "Namsai"
  ],
  "Assam": [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon",
    "Tinsukia", "Tezpur", "Bongaigaon", "Karimganj", "Goalpara"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia",
    "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar",
    "Munger", "Chapra", "Sasaram", "Hajipur", "Samastipur"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg",
    "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"
  ],
  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
    "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
    "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad",
    "Morbi", "Mehsana", "Bharuch", "Navsari", "Valsad"
  ],
  "Haryana": [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal",
    "Hisar", "Sonipat", "Rohtak", "Yamunanagar", "Panchkula",
    "Bhiwani", "Sirsa", "Jind", "Rewari", "Kurukshetra"
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Manali", "Solan", "Mandi",
    "Kullu", "Bilaspur", "Hamirpur", "Una", "Nahan",
    "Palampur", "Kangra", "Chamba", "Dalhousie", "Kasauli"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh",
    "Deoghar", "Giridih", "Ramgarh", "Phusro", "Dumka"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Dharwad",
    "Belagavi", "Kalaburagi", "Davangere", "Ballari", "Tumkur",
    "Shimoga", "Udupi", "Hassan", "Raichur", "Bidar"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam",
    "Kannur", "Alappuzha", "Palakkad", "Malappuram", "Kottayam",
    "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad", "Ernakulam"
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain",
    "Sagar", "Dewas", "Satna", "Ratlam", "Rewa",
    "Katni", "Singrauli", "Burhanpur", "Morena", "Khandwa"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Thane", "Nashik",
    "Aurangabad", "Solapur", "Kolhapur", "Navi Mumbai", "Amravati",
    "Sangli", "Malegaon", "Jalgaon", "Akola", "Latur",
    "Ahmednagar", "Dhule", "Ichalkaranji", "Chandrapur", "Parbhani"
  ],
  "Manipur": [
    "Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching",
    "Senapati", "Ukhrul", "Chandel", "Tamenglong", "Jiribam"
  ],
  "Meghalaya": [
    "Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar",
    "Resubelpara", "Baghmara", "Nongpoh", "Mairang", "Mawkyrwat"
  ],
  "Mizoram": [
    "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib",
    "Lawngtlai", "Mamit", "Saiha", "Saitual", "Khawzawl"
  ],
  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha",
    "Zunheboto", "Mon", "Phek", "Kiphire", "Longleng"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur",
    "Puri", "Balasore", "Baripada", "Bhadrak", "Jharsuguda"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda",
    "Mohali", "Hoshiarpur", "Pathankot", "Batala", "Moga",
    "Firozpur", "Abohar", "Malerkotla", "Khanna", "Muktsar"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner",
    "Ajmer", "Bhilwara", "Alwar", "Bharatpur", "Sikar",
    "Sri Ganganagar", "Pali", "Tonk", "Kishangarh", "Beawar"
  ],
  "Sikkim": [
    "Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo",
    "Singtam", "Jorethang", "Ravangla", "Pelling", "Lachung"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
    "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi",
    "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam",
    "Mahbubnagar", "Ramagundam", "Nalgonda", "Adilabad", "Suryapet",
    "Miryalaguda", "Siddipet", "Mancherial", "Jagtial", "Bhongir"
  ],
  "Tripura": [
    "Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia",
    "Ambassa", "Khowai", "Teliamura", "Sabroom", "Bishramganj"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut",
    "Allahabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur",
    "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar",
    "Mathura", "Budaun", "Rampur", "Shahjahanpur", "Ghaziabad"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Roorkee",
    "Rudrapur", "Kashipur", "Nainital", "Mussoorie", "Pithoragarh",
    "Almora", "Kotdwar", "Ramnagar", "Srinagar", "Pauri"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur",
    "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur",
    "Haldia", "Raiganj", "Krishnanagar", "Chandannagar", "Darjeeling"
  ],
  // Union Territories
  "Andaman and Nicobar Islands": [
    "Port Blair", "Diglipur", "Rangat", "Mayabunder", "Car Nicobar",
    "Hut Bay", "Wandoor", "Bamboo Flat", "Garacharma", "Prothrapur"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Silvassa", "Daman", "Diu", "Amli", "Naroli"
  ],
  "Delhi": [
    "New Delhi", "Central Delhi", "South Delhi", "North Delhi", "East Delhi",
    "West Delhi", "Dwarka", "Rohini", "Saket", "Lajpat Nagar"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore",
    "Kathua", "Udhampur", "Pulwama", "Kupwara", "Rajouri"
  ],
  "Ladakh": [
    "Leh", "Kargil", "Diskit", "Padum", "Nyoma"
  ],
  "Lakshadweep": [
    "Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott"
  ],
  "Puducherry": [
    "Puducherry", "Karaikal", "Mahe", "Yanam"
  ]
};

/**
 * Returns sorted list of all Indian state names.
 */
export const getStates = (): string[] => {
  return Object.keys(INDIAN_STATES_AND_CITIES).sort();
};

/**
 * Returns sorted list of cities for a given state.
 * Returns empty array if state not found.
 */
export const getCitiesByState = (state: string): string[] => {
  return (INDIAN_STATES_AND_CITIES[state] || []).sort();
};

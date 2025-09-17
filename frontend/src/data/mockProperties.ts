export interface PropertyItem {
  id: string;
  name: string;
  type: 'LODGE' | 'BUS' | 'MASJID' | 'OTHER';
  state: string;
  location: string;
  capacity?: number;
  condition?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  manager?: string;
  status: 'ACTIVE' | 'UNDER_MAINTENANCE' | 'UNAVAILABLE';
  ownership: 'MCAN' | 'LEASED' | 'DONATED';
  lastUpdated: string;
  description?: string;
  amenities?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export const mockProperties: PropertyItem[] = [
  {
    id: '1',
    name: 'MCAN Lagos Lodge',
    type: 'LODGE',
    state: 'Lagos',
    location: 'Victoria Island, Lagos',
    capacity: 50,
    condition: 'EXCELLENT',
    manager: 'Ahmad Ibrahim',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-15',
    description: 'Modern accommodation facility for corps members in Lagos State.',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Prayer Room'],
    contactInfo: {
      phone: '+234-801-234-5678',
      email: 'lagos.lodge@mcan.org.ng'
    }
  },
  {
    id: '2',
    name: 'MCAN Abuja Central Lodge',
    type: 'LODGE',
    state: 'FCT',
    location: 'Garki, Abuja',
    capacity: 75,
    condition: 'GOOD',
    manager: 'Fatima Yusuf',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-10',
    description: 'Central accommodation facility in the Federal Capital Territory.',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Library'],
    contactInfo: {
      phone: '+234-802-345-6789',
      email: 'abuja.lodge@mcan.org.ng'
    }
  },
  {
    id: '3',
    name: 'MCAN Kano Transport Bus 1',
    type: 'BUS',
    state: 'Kano',
    location: 'Kano State',
    capacity: 45,
    condition: 'GOOD',
    manager: 'Muhammad Ali',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-12',
    description: 'Primary transport vehicle for Kano State MCAN activities.',
    amenities: ['Air Conditioning', 'First Aid Kit', 'Prayer Mat'],
    contactInfo: {
      phone: '+234-803-456-7890',
      email: 'kano.transport@mcan.org.ng'
    }
  },
  {
    id: '4',
    name: 'MCAN Kaduna Masjid',
    type: 'MASJID',
    state: 'Kaduna',
    location: 'Kaduna North',
    capacity: 200,
    condition: 'EXCELLENT',
    manager: 'Umar Hassan',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-08',
    description: 'Main prayer facility for MCAN members in Kaduna State.',
    amenities: ['Sound System', 'Air Conditioning', 'Library', 'Parking'],
    contactInfo: {
      phone: '+234-804-567-8901',
      email: 'kaduna.masjid@mcan.org.ng'
    }
  },
  {
    id: '5',
    name: 'MCAN Rivers Lodge',
    type: 'LODGE',
    state: 'Rivers',
    location: 'Port Harcourt',
    capacity: 40,
    condition: 'FAIR',
    manager: 'Aisha Mohammed',
    status: 'UNDER_MAINTENANCE',
    ownership: 'LEASED',
    lastUpdated: '2024-01-05',
    description: 'Accommodation facility in Port Harcourt, currently under renovation.',
    amenities: ['WiFi', 'Kitchen'],
    contactInfo: {
      phone: '+234-805-678-9012',
      email: 'rivers.lodge@mcan.org.ng'
    }
  },
  {
    id: '6',
    name: 'MCAN Lagos Transport Bus 2',
    type: 'BUS',
    state: 'Lagos',
    location: 'Lagos State',
    capacity: 50,
    condition: 'GOOD',
    manager: 'Ibrahim Abdullahi',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-14',
    description: 'Secondary transport vehicle for Lagos State MCAN activities.',
    amenities: ['Air Conditioning', 'First Aid Kit', 'WiFi'],
    contactInfo: {
      phone: '+234-806-789-0123',
      email: 'lagos.transport2@mcan.org.ng'
    }
  },
  {
    id: '7',
    name: 'MCAN Oyo Masjid',
    type: 'MASJID',
    state: 'Oyo',
    location: 'Ibadan',
    capacity: 150,
    condition: 'GOOD',
    manager: 'Khadija Ogunlade',
    status: 'ACTIVE',
    ownership: 'DONATED',
    lastUpdated: '2024-01-11',
    description: 'Community prayer facility donated to MCAN in Ibadan.',
    amenities: ['Sound System', 'Library', 'Parking'],
    contactInfo: {
      phone: '+234-807-890-1234',
      email: 'oyo.masjid@mcan.org.ng'
    }
  },
  {
    id: '8',
    name: 'MCAN Kano Lodge',
    type: 'LODGE',
    state: 'Kano',
    location: 'Kano Central',
    capacity: 60,
    condition: 'EXCELLENT',
    manager: 'Yusuf Bello',
    status: 'ACTIVE',
    ownership: 'MCAN',
    lastUpdated: '2024-01-13',
    description: 'Modern accommodation facility in Kano State.',
    amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Prayer Room', 'Gym'],
    contactInfo: {
      phone: '+234-808-901-2345',
      email: 'kano.lodge@mcan.org.ng'
    }
  }
];

export const getFilteredProperties = (
  properties: PropertyItem[],
  state?: string,
  type?: string,
  search?: string
): PropertyItem[] => {
  return properties.filter(property => {
    const matchesState = !state || property.state.toLowerCase().includes(state.toLowerCase());
    const matchesType = !type || property.type === type;
    const matchesSearch = !search || 
      property.name.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase()) ||
      property.description?.toLowerCase().includes(search.toLowerCase());
    
    return matchesState && matchesType && matchesSearch;
  });
};

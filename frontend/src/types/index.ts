// User and Authentication Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  stateCode?: string;
  nyscNumber?: string;
  deploymentState?: string;
  serviceYear?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profilePicture?: string;
  biometricData?: BiometricData;
}

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'NATIONAL_ADMIN'
  | 'STATE_AMEER'
  | 'STATE_SECRETARY'
  | 'MCLO_AMEER'
  | 'MEMBER';

export interface BiometricData {
  fingerprint?: string;
  faceId?: string;
  signature?: string;
}

// Authentication Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  stateCode?: string;
  nyscNumber?: string;
  deploymentState?: string;
  serviceYear?: string;
  role?: UserRole;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Member Management Types
export interface Member {
  id: string;
  user: User;
  stateCode: string;
  nyscNumber: string;
  deploymentState: string;
  serviceYear: string;
  registrationDate: string;
  membershipStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'EXPIRED';
  paymentStatus: 'CURRENT' | 'OVERDUE' | 'EXEMPT';
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  eidCard?: EIDCard;
}

export interface EIDCard {
  id: string;
  memberId: string;
  cardNumber: string;
  qrCode: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  downloadUrl?: string;
}

// Payment Types
export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  currency: 'NGN';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentMethod: 'BANK_TRANSFER' | 'CARD' | 'USSD' | 'ALLOWANCE_DEDUCTION';
  transactionReference: string;
  flutterwaveReference?: string;
  paymentDate: string;
  description: string;
  consentGiven: boolean;
  consentDate?: string;
}

export interface PaymentConsent {
  id: string;
  memberId: string;
  monthlyAmount: number;
  consentGiven: boolean;
  consentDate: string;
  paymentMethod: string;
  bankDetails?: BankDetails;
  autoDeduction: boolean;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

// Property Management Types
export interface Property {
  id: string;
  name: string;
  description: string;
  type: 'MOSQUE' | 'OFFICE' | 'HALL' | 'SCHOOL' | 'OTHER';
  location: PropertyLocation;
  photos: string[];
  ownershipDocument: string;
  status: 'ACTIVE' | 'UNDER_MAINTENANCE' | 'AVAILABLE' | 'OCCUPIED';
  stateChapter: string;
  addedBy: string;
  addedDate: string;
  lastUpdated: string;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  gpsCoordinates: {
    latitude: number;
    longitude: number;
  };
}

// Marketplace Types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  currency: 'NGN';
  images: string[];
  stock: number;
  isAvailable: boolean;
  vendor: string;
  rating: number;
  reviews: ProductReview[];
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'FOOD_PACKAGES'
  | 'BASIC_ITEMS'
  | 'ISLAMIC_BOOKS'
  | 'CLOTHING'
  | 'ELECTRONICS'
  | 'OTHER';

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  memberId: string;
  items: OrderItem[];
  totalAmount: number;
  currency: 'NGN';
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  shippingAddress: ShippingAddress;
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  propertiesCount: number;
  ordersCount: number;
  pendingOrders: number;
}

export interface StateStats {
  stateCode: string;
  stateName: string;
  memberCount: number;
  revenue: number;
  propertiesCount: number;
  lastUpdated: string;
}

// Islamic Content Types
export interface PrayerTime {
  id: string;
  state: string;
  city: string;
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface IslamicEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'HOLIDAY' | 'LECTURE' | 'PROGRAM' | 'COMMUNITY_SERVICE';
  location?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'file' | 'date';
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// File Upload Types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'UPLOADING' | 'COMPLETED' | 'ERROR';
  url?: string;
  error?: string;
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'agent' | 'admin' | 'super_admin'
  phone?: string
  trecLicense?: string
  isActive: boolean
}

export interface Deal {
  id: string
  dealNumber: string
  dealType: 'listing' | 'buyer_rep' | 'lease'
  status: 'draft' | 'submitted' | 'in_review' | 'changes_requested' | 'approved' | 'closed' | 'cancelled'
  propertyAddress: string
  city: string
  state: string
  zip: string
  mlsNumber?: string
  listPrice?: number
  salePrice?: number
  leasePrice?: number
  closingDate?: string
  contractDate?: string
  earnestMoney?: number
  optionFee?: number
  titleCompany?: string
  lenderName?: string
  buyerName?: string
  sellerName?: string
  tenantName?: string
  jointlyDealUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
  agent?: User
  complianceItems?: ComplianceItem[]
}

export interface ComplianceItem {
  id: string
  dealId: string
  documentType: string
  label: string
  required: boolean
  status: 'pending' | 'uploaded' | 'approved' | 'rejected' | 'waived'
  rejectionReason?: string
  reviewedAt?: string
  reviewedBy?: {
    firstName: string
    lastName: string
    email: string
  }
  documents?: Array<{
    id: string
    filename: string
    fileSize: number
    createdAt: string
  }>
}

export type Page =
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'new-deal' }
  | { name: 'deal-detail'; dealId: string }
  | { name: 'admin-deals' }
  | { name: 'admin-deal-detail'; dealId: string }

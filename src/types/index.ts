/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInfo {
  id: string;
  fname: string | null;
  lname: string | null;
  email?: string;
  emailAddresses: Array<{
    id: string;
    emailAddress: string;
    verification: {
      status: string;
    };
  }>;
  hasCompletedOnboarding: boolean;
  role?: string;
  avatar?: string;
  onboarding: boolean;
  plaidUserToken?: string;
  imageUrl: string;
  company?: string;
  plan?: string;
}
export interface CompanySettings {
  id: string;
  trackDownloads: boolean;
  p2proom: {
    fileSizeLimit: number;
    userLimit: number;
  };
  datavaultroom: {
    fileSizeLimit: number;
    encryptFiles: boolean;
    userLimit: number;
  };
  roomAccess: number;
  roomActions: number;
  roomLimit: number;
}

export interface LogsType{
  id: number, 
  email: string, 
  filename: string, 
  date: string, 
  type: string, 
  size: string, 
  receivers: any[];
}
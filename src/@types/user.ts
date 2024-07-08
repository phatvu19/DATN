interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  phones?: PhoneNumber[];
  addresses?: Address[];
  createdAt: Date;
  updatedAt: Date;
}

interface PhoneNumber {
  number: string;
  shippingAddresses: Address[];
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

type UserRole = "customer" | "admin";

export type { Address, PhoneNumber, User, UserRole };

export interface GuestProfile {
  allowUnmarriedCouples: boolean;
  showCoupleFriendlyTag: boolean;
  allowGuestsBelow18: boolean;
  allowMaleGroups: boolean;
  allowSameCityIds: boolean;
}

export interface AcceptableIdentityProofs {
  selectedProofs: string[];
}

export interface PropertyRestrictions {
  isSmokingAllowed: boolean;
  allowPrivateParties: boolean;
  allowOutsideVisitors: boolean;
  isWheelchairAccessible: boolean;
}

export interface PetPolicy {
  arePetsAllowed: boolean;
  isPetFoodAvailable: boolean;
  allowedPetTypes: string[];
  hasResidentPets: boolean;
}

export interface CheckinPolicy {
  has24HourCheckin: boolean;
  checkinTime: string;
  checkoutTime: string;
  cancellationPolicy: 'free-until-checkin' | 'free-24h' | 'free-48h' | 'free-72h' | 'non-refundable';
}

export interface ExtraBedPolicy {
  provideBedToExtraAdults: 'no' | 'yes' | 'subject-to-availability';
  extraAdultBedTypes: string[];
  extraAdultCharges: {
    cot: number;
    mattress: number;
    sofaBed: number;
  };
  provideBedToExtraKids: boolean;
  extraKidBedTypes: string[];
  extraKidCharges: {
    cot: number;
    mattress: number;
    sofaBed: number;
    crib: number;
  };
}

export interface MealPrices {
  breakfast: number;
  lunch: number;
  dinner: number;
}

export interface PropertyPolicies {
  guestProfile: GuestProfile;
  acceptableIdentityProofs: AcceptableIdentityProofs;
  propertyRestrictions: PropertyRestrictions;
  petPolicy: PetPolicy;
  checkinPolicy: CheckinPolicy;
  extraBedPolicy: ExtraBedPolicy;
  mealPrices: MealPrices;
} 
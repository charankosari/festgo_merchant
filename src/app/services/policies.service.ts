import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PropertyPolicies } from '../interfaces/policies.interface';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  getMockPolicies(): Observable<PropertyPolicies> {
    const mockData: PropertyPolicies = {
      guestProfile: {
        allowUnmarriedCouples: true,
        showCoupleFriendlyTag: true,
        allowGuestsBelow18: false,
        allowMaleGroups: true,
        allowSameCityIds: true
      },
      acceptableIdentityProofs: {
        selectedProofs: ['Aadhar Card', 'Driving License', 'Passport', 'Voter ID']
      },
      propertyRestrictions: {
        isSmokingAllowed: true,
        allowPrivateParties: true,
        allowOutsideVisitors: true,
        isWheelchairAccessible: true
      },
      petPolicy: {
        arePetsAllowed: true,
        isPetFoodAvailable: false,
        allowedPetTypes: ['Dogs', 'Cats', 'Birds'],
        hasResidentPets: true
      },
      checkinPolicy: {
        has24HourCheckin: false,
        checkinTime: '12:00 pm (noon)',
        checkoutTime: '11:00 am',
        cancellationPolicy: 'free-48h'
      },
      extraBedPolicy: {
        provideBedToExtraAdults: 'subject-to-availability',
        extraAdultBedTypes: ['Cot', 'Mattress', 'Sofa Bed'],
        extraAdultCharges: {
          cot: 800,
          mattress: 800,
          sofaBed: 800
        },
        provideBedToExtraKids: true,
        extraKidBedTypes: ['Cot', 'Mattress', 'Sofa Bed', 'Crib'],
        extraKidCharges: {
          cot: 1000,
          mattress: 1000,
          sofaBed: 1000,
          crib: 1000
        }
      },
      mealPrices: {
        breakfast: 799,
        lunch: 999,
        dinner: 999
      }
    };

    return of(mockData);
  }

  savePolicies(policies: PropertyPolicies): Observable<boolean> {
    // Simulate API call
    console.log('Saving policies:', policies);
    return of(true);
  }
} 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResortService {

  constructor(public httpClient: HttpClient) { }

  saveBasicInfo(data: any) {
    this.httpClient.post('/api/resorts', data).subscribe({
      next: (response) => {
        console.log('Basic info saved successfully:', response);
        return response;
      },
      error: (error) => {
        console.error('Error saving basic info:', error);
        throw error;
      }
    });
  }
  getBasicInfo(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}`).subscribe({
      next: (response) => {
        console.log('Basic info retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving basic info:', error);
        throw error;
      }
    });
  }
  saveLocationDetails(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/location`, data).subscribe({
      next: (response) => {
        console.log('Location details saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving location details:', error);
        throw error;
      }
    }); 
  }
  getLocationDetails(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/location`).subscribe({
      next: (response) => {
        console.log('Location details retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving location details:', error);
        throw error;
      }
    });
  }
  getAmenitiesInfo(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/amenities`).subscribe({
      next: (response) => {
        console.log('Amenities info retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving amenities info:', error);
        throw error;
      }
    });
  }
  postAmenitiesInfo(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/amenities`, data).subscribe({
      next: (response) => {
        console.log('Amenities info saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving amenities info:', error);
        throw error;
      }
    });
  }
  postRoomsData(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/rooms`, data).subscribe({
      next: (response) => {
        console.log('Rooms data saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving rooms data:', error);
        throw error;
      }
    });
  }
  getRoomsData(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/rooms`).subscribe({
      next: (response) => {
        console.log('Rooms data retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving rooms data:', error);
        throw error;
      }
    });
  }
  getRoomsList(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/rooms/list`).subscribe({
      next: (response) => {
        console.log('Rooms list retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving rooms list:', error);
        throw error;
      }
    });
  }
  postPhotosTag(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/photos`, data).subscribe({
      next: (response) => {
        console.log('Photos tagged successfully:', response);
        return response;
      }
      ,
      error: (error) => { 
        console.error('Error tagging photos:', error);
        throw error;
      }
    });
  }
  getPhotosTag(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/photos`).subscribe({
      next: (response) => {
        console.log('Photos tags retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving photos tags:', error);
        throw error;
      }
    });
  }
  getPolicies(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/policies`).subscribe({
      next: (response) => {
        console.log('Policies retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving policies:', error);
        throw error;
      }
    });
  }
  postPolicies(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/policies`, data).subscribe({
      next: (response) => {
        console.log('Policies saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving policies:', error);
        throw error;
      }
    });
  }
  getFinanceLegal(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/finance-legal`).subscribe({
      next: (response) => {
        console.log('Finance and legal info retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving finance and legal info:', error);
        throw error;
      }
    });
  }
  postFinanceLegal(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/finance-legal`, data).subscribe({
      next: (response) => {
        console.log('Finance and legal info saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving finance and legal info:', error);
        throw error;
      }
    });
  }
  saveDraft(resortId: string, data: any) {
    return this.httpClient.post(`/api/resorts/${resortId}/drafts`, data).subscribe({
      next: (response) => {
        console.log('Draft saved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error saving draft:', error);
        throw error;
      }
    });
  }
  getDrafts(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/drafts`).subscribe({
      next: (response) => {
        console.log('Drafts retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving drafts:', error);
        throw error;
      }
    });
  }
  getDraft(resortId: string, draftId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/drafts/${draftId}`).subscribe({
      next: (response) => {
        console.log('Draft retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving draft:', error);
        throw error;
      }
    });
  }
  deleteDraft(resortId: string, draftId: string) {
    return this.httpClient.delete(`/api/resorts/${resortId}/drafts/${draftId}`).subscribe({
      next: (response) => {
        console.log('Draft deleted successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error deleting draft:', error);
        throw error;
      }
    });
  }
  getPropertyById(resortId: string) {
    return this.httpClient.get(`/api/resorts/${resortId}/property`).subscribe({
      next: (response) => {
        console.log('Property retrieved successfully:', response);
        return response;
      }
      ,
      error: (error) => {
        console.error('Error retrieving property:', error);
        throw error;
      }
    });
  }
}

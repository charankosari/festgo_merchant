import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiLinks } from '../core/apiLink';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(public httpClient: HttpClient) { }

  saveBasicInfo(data: any){
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` }
    this.httpClient.post(apiLinks.properties.saveBasicInfo, data, { headers }).subscribe({
      next: (response) => {
      console.log('Basic info saved successfully:', response);
      return response; // Return the response if needed
      },
      error: (error) => {
      console.error('Error saving basic info:', error);
      }
    });
  }

  getBasicInfo(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getBasicInfo}/${propertyId}`);
  }

  saveLocation(data: any) {
    this.httpClient.post(apiLinks.properties.saveLocationDetails, data).subscribe({
      next: (response) => {
        console.log('Location saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving location:', error);
      }
    });
  }

  getLocation(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getLocationDetails}/${propertyId}`);
  }

  saveAmenities(data: any) {
    this.httpClient.post(apiLinks.properties.postAmenitiesInfo, data).subscribe({
      next: (response) => {
        console.log('Amenities saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving amenities:', error);
      }
    });
  }

  getAmenities(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getAmenitiesInfo}/${propertyId}`);
  }

  saveRooms(data: any) {
    this.httpClient.post(apiLinks.properties.postRoomsData, data).subscribe({
      next: (response) => {
        console.log('Rooms saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving rooms:', error);
      }
    });
  }

  getRooms(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getRoomsData}/${propertyId}`);
  }

  getRoomsList(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getRoomsList}/${propertyId}`);
  }

  savePhotos(data: any) {
    this.httpClient.post(apiLinks.properties.postPhotosTag, data).subscribe({
      next: (response) => {
        console.log('Photos saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving photos:', error);
      }
    });
  }

  getPhotos(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getPhotosTag}/${propertyId}`);
  }

  savePolicies(data: any) {
    this.httpClient.post(apiLinks.properties.postPolicies, data).subscribe({
      next: (response) => {
        console.log('Policies saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving policies:', error);
      }
    });
  }

  getPolicies(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getPolicies}/${propertyId}`);
  }

  saveFinance(data: any) {
    this.httpClient.post(apiLinks.properties.postFinanceLegal, data).subscribe({
      next: (response) => {
        console.log('Finance saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving finance:', error);
      }
    });
  }

  getFinance(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getFinanceLegal}/${propertyId}`);
  }

  // savePropertyType(data: any) {
  //   this.httpClient.post(apiLinks.properties.savePropertyType, data).subscribe({
  //     next: (response) => {
  //       console.log('Property type saved successfully:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error saving property type:', error);
  //     }
  //   });
  // }

  // getPropertyType(propertyId: string) {
  //   return this.httpClient.get(`${apiLinks.properties.getPropertyType}/${propertyId}`);
  // }

  /**
   * Saves a draft of the property form.
   * @param data The data to save as a draft.
   */
  saveDraft(data: any) {  
    this.httpClient.post(apiLinks.properties.saveDraft, data).subscribe({
      next: (response) => {
        console.log('Draft saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving draft:', error);
      }
    });
  }

  /**
   * Gets a draft by ID.
   * @param draftId The ID of the draft to retrieve.
   * @returns An observable that emits the draft data.
   */
  getDraft(draftId: string) {
    return this.httpClient.get(`${apiLinks.properties.getDraft}/${draftId}`);
  }

  /**
   * Gets all drafts.
   * @returns An observable that emits the list of drafts.
   */
  getDrafts() {
    return this.httpClient.get(apiLinks.properties.getDrafts);
  }

  /**
   * Deletes a draft by ID.
   * @param draftId The ID of the draft to delete.
   */
  deleteDraft(draftId: string) {
    return this.httpClient.delete(`${apiLinks.properties.deleteDraft}/${draftId}`).subscribe({
      next: (response) => {
        console.log('Draft deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error deleting draft:', error);
      }
    });
  }

  /**
   * Gets property details by ID.
   * @param propertyId The ID of the property.
   * @returns An observable that emits the property details.
   */
  getPropertyById(propertyId: string) {
    return this.httpClient.get(`${apiLinks.properties.getPropertyById}/${propertyId}`);
  }

  /**
   * Gets a presigned URL for uploading a file.
   * @param fileName The name of the file to upload.
   * @returns An observable that emits the presigned URL as a string.
   */
  getPresignedUrl(fileName: string) {
    return this.httpClient.get(`${apiLinks.properties.getPhotosTag}/presigned-url?fileName=${fileName}`, { responseType: 'text' });
  }

  /**
   * Uploads a file to a presigned URL.
   * @param file The file to upload.
   * @param presignedUrl The presigned URL to upload the file to.
   * @returns An observable that emits the upload progress and response.
   */
  uploadFile(file: File, presignedUrl: string) {
    return this.httpClient.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type
      },
      reportProgress: true,
      observe: 'events'
    });
  }

}

import { environment } from '../../environments/environment';

export var apiLinks = {
    users:{
        login: `${environment.apiUrl}/login`,
        otpLogin: `${environment.apiUrl}/verify-login-otp`,
        signUp: `${environment.apiUrl}/vendor/register`,
        forgotPassword: `${environment.apiUrl}/forgotPassword`,
        changePassword: `${environment.apiUrl}/changePassword`,
        requestLoginOtp: `${environment.apiUrl}/login-via-otp`,
        getMobileOtp: `${environment.apiUrl}/send-mobile-otp`,
        verifyMobileOtp: `${environment.apiUrl}/verify-mobile-otp`,
        getUserDetails: `${environment.apiUrl}/me`,
        updateProfile: `${environment.apiUrl}/update-profile`
    },
    home: {
        propertyList: `${environment.apiUrl}/properties/vendor/`,
        // propertyList:/properties/vendor/d3492c99-a635-4733-bea9-f1d82fbc5cae
    },
    properties: {
        saveBasicInfo: `${environment.apiUrl}/properties`,
        getBasicInfo: `${environment.apiUrl}/basicInfo`,
        saveLocationDetails: `${environment.apiUrl}/properties`,
        getLocationDetails: `${environment.apiUrl}/getLocationDetails`,
        getAmenitiesInfo: `${environment.apiUrl}/getAmenitiesInfo`,
        postAmenitiesInfo: `${environment.apiUrl}/postAmenitiesInfo`,
        postRoomsData: `${environment.apiUrl}/getLocationDetails`,
        getRoomsData: `${environment.apiUrl}/getLocationDetails`,
        getRoomsList: `${environment.apiUrl}/getLocationDetails`,
        postPhotosTag: `${environment.apiUrl}/getLocationDetails`,
        getPhotosTag: `${environment.apiUrl}/getLocationDetails`,
        getPolicies: `${environment.apiUrl}/getLocationDetails`,
        postPolicies: `${environment.apiUrl}/getLocationDetails`,
        getFinanceLegal: `${environment.apiUrl}/getLocationDetails`, 
        postFinanceLegal: `${environment.apiUrl}/getLocationDetails`,
        saveDraft: `${environment.apiUrl}/saveDraft`,
        getDrafts: `${environment.apiUrl}/getDrafts`,
        getDraft: `${environment.apiUrl}/getDraft`,
        deleteDraft: `${environment.apiUrl}/deleteDraft`,
        getPropertyById: `${environment.apiUrl}/getPropertyById`,
        uploadAndGetImageUrl: `${environment.apiUrl}/upload/public`,
    }
}
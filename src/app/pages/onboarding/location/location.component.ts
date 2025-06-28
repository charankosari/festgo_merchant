import { Component,  OnInit } from "@angular/core"
import {  FormBuilder, FormGroup, Validators } from "@angular/forms"
import  { Router, ActivatedRoute } from "@angular/router"
import  { ThemeService } from "../../../services/theme.service"
import  { MessageService } from "primeng/api"
import { apiLinks } from "src/app/core/apiLink"
import { CommonService } from "src/app/services/common.service"

declare var google: any

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit {
  locationForm: FormGroup
  propertyId: string | null = null
  draftId: string | null = null
  isSubmitting = false

  // Map properties
  map: any
  marker: any
  geocoder: any
  autocomplete: any
  mapInitialized = false

  // Form data from JSON
  formData = {
    sectionTitle: "Property Location Details",
    sectionSubtitle: "Please fill in the location details of your property.",
    fields: [
      {
        key: "searchLocation",
        label: "",
        type: "search",
        placeholder: "Search here",
        value: "",
      },
      {
        key: "useCurrentLocation",
        label: "Or Use My Current Location",
        type: "button",
        action: "getCurrentLocation",
      },
      {
        key: "houseNumber",
        label: "House/Building/Apartment No.",
        type: "text",
        placeholder: "Enter house/building/apartment no.",
        required: true,
        value: "",
      },
      {
        key: "locality",
        label: "Locality/Area/Street/Sector",
        type: "text",
        placeholder: "Enter area/street/locality",
        required: true,
        value: "",
      },
      {
        key: "pincode",
        label: "Pincode",
        type: "text",
        placeholder: "Enter pincode",
        required: true,
        value: "",
      },
      {
        key: "country",
        label: "Country",
        type: "text",
        placeholder: "Enter country",
        required: true,
        value: "",
      },
      {
        key: "state",
        label: "State",
        type: "text",
        placeholder: "Enter state",
        required: true,
        value: "",
      },
      {
        key: "city",
        label: "City",
        type: "text",
        placeholder: "Enter city",
        required: true,
        value: "",
      },
      {
        key: "acceptTerms",
        label:
          "I agree to the terms and conditions and confirm the address provided here is as per the registration or lease document.",
        type: "checkbox",
        required: true,
        value: false,
        link: {
          text: "terms and conditions",
          url: "/terms",
        },
      },
      {
        key: "mapLocation",
        label: "Map Location",
        type: "map",
        value: {
          lat: 17.4716,
          lng: 78.4991,
        },
      },
    ],
    actions: [
      {
        label: "Back",
        type: "button",
        variant: "text",
      },
      {
        label: "Save And Continue",
        type: "button",
        variant: "primary",
      },
    ],
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public themeService: ThemeService,
    private messageService: MessageService,
    public commonService: CommonService
  ) {
    // Initialize form
    this.locationForm = this.fb.group({
      searchLocation: [""],
      houseNumber: ["", Validators.required],
      locality: ["", Validators.required],
      pincode: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      mapLocation: this.fb.group({
        lat: [17.4716],
        lng: [78.4991],
      }),
    })
  }

  ngOnInit(): void {
    // Get route parameters
    this.route.queryParams.subscribe((params) => {
      console.log("params in location", params)
      this.propertyId = params["id"] || null
      this.draftId = params["draft_id"] || null
    })

    // Load saved data if available
    this.loadSavedData()

    // Initialize Google Maps after the view is initialized
    setTimeout(() => {
      this.initializeMap()
    }, 500)
  }

  loadSavedData(): void {
    // In a real app, you would fetch saved data from a service
    // For now, we'll use the values from the JSON
    const formValues: any = {}

    this.formData.fields.forEach((field: any) => {
      if (field.key !== "useCurrentLocation" && field.key !== "searchLocation") {
        if (field.key === "mapLocation") {
          formValues["mapLocation"] = {
            lat: field.value.lat,
            lng: field.value.lng,
          }
        } else {
          formValues[field.key] = field.value
        }
      }
    })

    this.locationForm.patchValue(formValues)
  }

  initializeMap(): void {
    // Check if Google Maps API is loaded
    if (typeof google === "undefined" || typeof google.maps === "undefined") {
      console.error("Google Maps API not loaded")
      return
    }

    // Get map container
    const mapElement = document.getElementById("map")
    if (!mapElement) {
      console.error("Map element not found")
      return
    }

    // Get initial coordinates from form
    const mapLocationValue = this.locationForm.get("mapLocation")?.value
    const initialLat = mapLocationValue?.lat || 17.4716
    const initialLng = mapLocationValue?.lng || 78.4991

    // Initialize map
    this.map = new google.maps.Map(mapElement, {
      center: { lat: initialLat, lng: initialLng },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    // Initialize marker
    this.marker = new google.maps.Marker({
      position: { lat: initialLat, lng: initialLng },
      map: this.map,
      draggable: true,
      title: "Property Location",
    })

    // Initialize geocoder
    this.geocoder = new google.maps.Geocoder()

    // Initialize autocomplete
    const searchInput = document.getElementById("searchLocation") as HTMLInputElement
    if (searchInput) {
      this.autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ["geocode"],
      })

      // Add listener for place selection
      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace()
        if (!place.geometry) {
          console.error("Place has no geometry")
          return
        }

        // Update map and marker
        this.map.setCenter(place.geometry.location)
        this.marker.setPosition(place.geometry.location)

        // Update form with place details
        this.updateFormWithPlaceDetails(place)
      })
    }

    // Add listener for marker drag end
    google.maps.event.addListener(this.marker, "dragend", () => {
      const position = this.marker.getPosition()
      this.updateFormWithCoordinates(position.lat(), position.lng())
    })

    // Add listeners for form field changes to update map
    this.locationForm.get("locality")?.valueChanges.subscribe((value) => {
      if (value && this.locationForm.get("city")?.value) {
        this.updateMapFromAddress()
      }
    })

    this.locationForm.get("city")?.valueChanges.subscribe((value) => {
      if (value && this.locationForm.get("locality")?.value) {
        this.updateMapFromAddress()
      }
    })

    this.mapInitialized = true
  }

  updateFormWithPlaceDetails(place: any): void {
    // Reset form fields
    const addressComponents: any = {
      street_number: "",
      route: "",
      locality: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
    }

    // Extract address components
    for (const component of place.address_components) {
      const type = component.types[0]
      if (type in addressComponents) {
        addressComponents[type] = component.long_name
      } else if (type === "sublocality_level_1" && !addressComponents.locality) {
        addressComponents.locality = component.long_name
      } else if (type === "administrative_area_level_2" && !addressComponents.locality) {
        addressComponents.locality = component.long_name
      }
    }

    // Update form values
    this.locationForm.patchValue({
      houseNumber: addressComponents.street_number,
      locality: `${addressComponents.route} ${addressComponents.locality}`.trim(),
      city: place.address_components.find((c: any) => c.types.includes("locality"))?.long_name || "",
      state: addressComponents.administrative_area_level_1,
      country: addressComponents.country,
      pincode: addressComponents.postal_code,
      mapLocation: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
    })
  }

  updateFormWithCoordinates(lat: number, lng: number): void {
    // Update form with coordinates
    this.locationForm.patchValue({
      mapLocation: {
        lat: lat,
        lng: lng,
      },
    })

    // Reverse geocode to get address details
    this.geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
      if (status === "OK" && results[0]) {
        this.updateFormWithPlaceDetails(results[0])
      }
    })
  }

  updateMapFromAddress(): void {
    // Build address string from form values
    const address = [
      this.locationForm.get("locality")?.value,
      this.locationForm.get("city")?.value,
      this.locationForm.get("state")?.value,
      this.locationForm.get("country")?.value,
      this.locationForm.get("pincode")?.value,
    ]
      .filter(Boolean)
      .join(", ")

    // Geocode address to get coordinates
    if (address && this.geocoder) {
      this.geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location

          // Update map and marker
          this.map.setCenter(location)
          this.marker.setPosition(location)

          // Update form with coordinates
          this.locationForm.patchValue({
            mapLocation: {
              lat: location.lat(),
              lng: location.lng(),
            },
          })
        }
      })
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          // Update map and marker
          this.map.setCenter({ lat, lng })
          this.marker.setPosition({ lat, lng })

          // Update form with coordinates
          this.updateFormWithCoordinates(lat, lng)
        },
        (error) => {
          console.error("Error getting current location:", error)
          this.messageService.add({
            severity: "error",
            summary: "Location Error",
            detail: "Unable to get your current location. Please check your browser permissions.",
            life: 3000,
          })
        },
      )
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Location Error",
        detail: "Geolocation is not supported by this browser.",
        life: 3000,
      })
    }
  }

  onBack(): void {
    // Navigate to previous step
    this.router.navigate(["/onboarding/basic-info"], {
      queryParams: {
        id: this.propertyId,
        draft_id: this.draftId,
      },
    })
  }

  onSubmit(): void {
    if (this.locationForm.valid) {
      this.isSubmitting = true
      this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.locationForm.value).subscribe((res: any) => {
        console.log("result", res);
        this.messageService.add({
          severity: "success",
          summary: "Baic Info Saved",
          detail: "Your basic info has been saved",
          life: 3000,
        });
        // Navigate back to dashboard
        this.router.navigate([`/onboarding/amenities`], {
          queryParams: {
            id: this.propertyId,
            // draft_id: this.draftId,
          },
        })
      })

      // In a real app, you would save the form data to a service
      // console.log("Form data:", this.locationForm.value)

      // // Simulate API call delay
      // setTimeout(() => {
      //   this.isSubmitting = false

      //   // Navigate to next step
      //   this.router.navigate([`/onboarding/amenities`], {
      //     queryParams: {
      //       id: this.propertyId,
      //       // draft_id: this.draftId,
      //     },
      //   })
      // }, 1000)
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.locationForm.controls).forEach((key) => {
        const control = this.locationForm.get(key)
        control?.markAsTouched()

        // If it's a FormGroup, mark all its controls as touched
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach((nestedKey) => {
            control.get(nestedKey)?.markAsTouched()
          })
        }
      })

      this.messageService.add({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill in all required fields correctly.",
        life: 3000,
      })
    }
  }
}

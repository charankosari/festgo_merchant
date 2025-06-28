import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormBuilder, FormGroup, FormArray } from "@angular/forms"

interface SubAmenity {
  otaCode: number
  otaName: string
  mmtCode: number
  selectType: string
  subAmenities: SubAmenity[] | null
}

interface Amenity {
  amenityId: number
  otaCode: number
  otaName: string
  mmtCode: number
  subAmenities: SubAmenity[] | null
  isAvailable: boolean
  chargeType: number
  category: string
  selectType: string
}

interface AmenitiesData {
  categories: string[]
  amenitiesMapping: { [key: string]: Amenity[] }
}

interface CategoryGroup {
  name: string
  amenities: Amenity[]
  count: number
}

@Component({
  selector: "app-room-amenities",
  templateUrl: "./room-amenities.component.html",
  styleUrls: ["./room-amenities.component.scss"],
})
export class RoomAmenitiesComponent implements OnInit {
  @Input() roomData: any = null
  @Output() save = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  amenitiesForm: FormGroup
  activeCategory = "Mandatory"
  categories: CategoryGroup[] = []

  // JSON data from the provided file
  amenitiesData: AmenitiesData = {
    categories: [
      "Mandatory",
      "Popular with Guests",
      "Bathroom",
      "Room Features",
      "Media and Entertainment",
      "Food and Drinks",
      "Kitchen and Appliances",
      "Beds and Blanket",
      "Safety and Security",
      "Childcare",
      "Other Facilities",
    ],
    amenitiesMapping: {
      Mandatory: [
        {
          amenityId: 137,
          otaCode: 0,
          otaName: "Hairdryer",
          mmtCode: 50280,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Mandatory",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 138,
          otaCode: 0,
          otaName: "Hot & Cold Water",
          mmtCode: 50281,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Mandatory",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 198,
          otaCode: 0,
          otaName: "Air Conditioning",
          mmtCode: 50377,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "Centralized",
              mmtCode: 50378,
              selectType: "SINGLE_SELECT",
              subAmenities: [
                {
                  otaCode: 0,
                  otaName: "All-Weather (Hot & Cold)",
                  mmtCode: 50705,
                  selectType: "SINGLE_SELECT",
                  subAmenities: null,
                },
              ],
            },
            {
              otaCode: 0,
              otaName: "Room controlled",
              mmtCode: 50379,
              selectType: "SINGLE_SELECT",
              subAmenities: [
                {
                  otaCode: 0,
                  otaName: "All-Weather (Hot & Cold)",
                  mmtCode: 50706,
                  selectType: "SINGLE_SELECT",
                  subAmenities: null,
                },
              ],
            },
          ],
          isAvailable: true,
          chargeType: 0,
          category: "Mandatory",
          selectType: "SINGLE_SELECT",
        },
      ],
      "Popular with Guests": [
        {
          amenityId: 199,
          otaCode: 0,
          otaName: "Interconnected Room",
          mmtCode: 50383,
          subAmenities: null,
          isAvailable: false,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 200,
          otaCode: 0,
          otaName: "Heater",
          mmtCode: 50384,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "Oil Radiator Heater",
              mmtCode: 50710,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
            {
              otaCode: 0,
              otaName: "Electric heater",
              mmtCode: 50711,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
          ],
          isAvailable: true,
          chargeType: 1,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 201,
          otaCode: 0,
          otaName: "Housekeeping",
          mmtCode: 50385,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "24 hours",
              mmtCode: 50386,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
            {
              otaCode: 0,
              otaName: "Limited duration",
              mmtCode: 50387,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
          ],
          isAvailable: true,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 202,
          otaCode: 0,
          otaName: "In Room dining",
          mmtCode: 50389,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "24 hours",
              mmtCode: 50390,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
            {
              otaCode: 0,
              otaName: "Limited duration",
              mmtCode: 50391,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
          ],
          isAvailable: true,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 204,
          otaCode: 0,
          otaName: "Laundry Service",
          mmtCode: 50393,
          subAmenities: null,
          isAvailable: false,
          chargeType: 1,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 206,
          otaCode: 0,
          otaName: "Room service",
          mmtCode: 50395,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "24 hours",
              mmtCode: 50396,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
            {
              otaCode: 0,
              otaName: "Limited duration",
              mmtCode: 50397,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
          ],
          isAvailable: true,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 207,
          otaCode: 0,
          otaName: "Smoking Room",
          mmtCode: 50398,
          subAmenities: null,
          isAvailable: false,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 208,
          otaCode: 0,
          otaName: "Study Room",
          mmtCode: 50399,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 210,
          otaCode: 0,
          otaName: "Wifi",
          mmtCode: 50401,
          subAmenities: [
            {
              otaCode: 0,
              otaName: "Speed Suitable for working",
              mmtCode: 50713,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
            {
              otaCode: 0,
              otaName: "Speed Suitable for Surfing",
              mmtCode: 50714,
              selectType: "SINGLE_SELECT",
              subAmenities: null,
            },
          ],
          isAvailable: true,
          chargeType: 1,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 248,
          otaCode: 0,
          otaName: "Air Purifier",
          mmtCode: 50451,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Popular with Guests",
          selectType: "SINGLE_SELECT",
        },
      ],
      Bathroom: [
        {
          amenityId: 131,
          otaCode: 0,
          otaName: "Bathroom Phone",
          mmtCode: 50274,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Bathroom",
          selectType: "SINGLE_SELECT",
        },
        {
          amenityId: 132,
          otaCode: 0,
          otaName: "Bathtub",
          mmtCode: 50275,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Bathroom",
          selectType: "SINGLE_SELECT",
        },
      ],
      "Room Features": [
        {
          amenityId: 214,
          otaCode: 0,
          otaName: "Blackout curtains",
          mmtCode: 50405,
          subAmenities: null,
          isAvailable: true,
          chargeType: 0,
          category: "Room Features",
          selectType: "SINGLE_SELECT",
        },
      ],
      "Media and Entertainment": [],
      "Food and Drinks": [],
      "Kitchen and Appliances": [],
      "Beds and Blanket": [],
      "Safety and Security": [],
      Childcare: [],
      "Other Facilities": [],
    },
  }

  constructor(private fb: FormBuilder) {
    this.amenitiesForm = this.fb.group({
      amenities: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.initializeCategories()
    this.initForm()
  }

  initializeCategories(): void {
    this.categories = this.amenitiesData.categories
      .map((categoryName) => {
        const amenities = this.amenitiesData.amenitiesMapping[categoryName] || []
        return {
          name: categoryName,
          amenities: amenities,
          count: amenities.length,
        }
      })
      .filter((category) => category.count > 0)

    if (this.categories.length > 0) {
      this.activeCategory = this.categories[0].name
    }
  }

  initForm(): void {
    const amenitiesArray = this.amenitiesForm.get("amenities") as FormArray

    // Flatten all amenities from all categories
    const allAmenities = Object.values(this.amenitiesData.amenitiesMapping).flat()

    allAmenities.forEach((amenity) => {
      const amenityGroup = this.fb.group({
        amenityId: amenity.amenityId,
        otaName: amenity.otaName,
        isSelected: [false],
        selectedSubAmenities: this.fb.array([]),
        chargeType: amenity.chargeType,
        category: amenity.category,
      })

      amenitiesArray.push(amenityGroup)
    })
  }

  get amenitiesFormArray(): FormArray {
    return this.amenitiesForm.get("amenities") as FormArray
  }

  setActiveCategory(categoryName: string): void {
    this.activeCategory = categoryName
  }

  getActiveCategory(): CategoryGroup | undefined {
    return this.categories.find((cat) => cat.name === this.activeCategory)
  }

  getSelectedAmenitiesCount(categoryName: string): number {
    const category = this.categories.find((cat) => cat.name === categoryName)
    if (!category) return 0

    return category.amenities.filter((amenity) => {
      const formControl = this.getAmenityFormControl(amenity.amenityId)
      return formControl?.get("isSelected")?.value
    }).length
  }

  getAmenityFormControl(amenityId: number): FormGroup | null {
    const amenitiesArray = this.amenitiesFormArray
    const allAmenities = Object.values(this.amenitiesData.amenitiesMapping).flat()
    const index = allAmenities.findIndex((a) => a.amenityId === amenityId)
    return index >= 0 ? (amenitiesArray.at(index) as FormGroup) : null
  }

  onAmenitySelectionChange(amenityId: number, selected: boolean): void {
    const formControl = this.getAmenityFormControl(amenityId)
    if (formControl) {
      formControl.get("isSelected")?.setValue(selected)
    }
  }

  onSubAmenityChange(amenity: Amenity, subAmenity: SubAmenity, selected: any): void {
    const formControl = this.getAmenityFormControl(amenity.amenityId)
    if (formControl) {
      const subAmenitiesArray = formControl.get("selectedSubAmenities") as FormArray

      if (selected) {
        const subAmenityControl = this.fb.group({
          otaName: subAmenity.otaName,
          mmtCode: subAmenity.mmtCode,
        })
        subAmenitiesArray.push(subAmenityControl)
      } else {
        const index = subAmenitiesArray.controls.findIndex(
          (control) => control.get("mmtCode")?.value === subAmenity.mmtCode,
        )
        if (index >= 0) {
          subAmenitiesArray.removeAt(index)
        }
      }
    }
  }

  isSubAmenitySelected(amenity: Amenity, subAmenity: SubAmenity): boolean {
    const formControl = this.getAmenityFormControl(amenity.amenityId)
    if (!formControl) return false

    const subAmenitiesArray = formControl.get("selectedSubAmenities") as FormArray
    return subAmenitiesArray.controls.some((control) => control.get("mmtCode")?.value === subAmenity.mmtCode)
  }

  onSubmit(): void {
    const formData = this.amenitiesForm.value
    console.log("Room amenities form data:", formData)
    this.save.emit(formData)
  }

  onCancel(): void {
    this.cancel.emit()
  }
}

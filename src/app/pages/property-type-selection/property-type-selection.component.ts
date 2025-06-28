import { Component,  OnInit } from "@angular/core"
import  { Router } from "@angular/router"

interface PropertyType {
  id: string
  name: string
  description: string
  selected: boolean
}

interface HotelType {
  id: string
  name: string
  description: string
  image: string
  selected: boolean,
  disabled: boolean
}

@Component({
  selector: "app-property-type-selection",
  templateUrl: "./property-type-selection.component.html",
  styleUrls: ["./property-type-selection.component.scss"],
})
export class PropertyTypeSelectionComponent implements OnInit {
  propertyTypes: PropertyType[] = [
    {
      id: "hotel",
      name: "Hotel",
      description: "Accommodations with facilities like dining venues, meeting rooms & more",
      selected: true,
    },
    // More property types can be added here in the future
  ]

  hotelTypes: HotelType[] = [
    {
      id: "resort",
      name: "Resort",
      description:
        "A resort is a self-contained property offering luxurious lodging and extensive amenities, such as pools, spas, dining, and recreation...",
      image: "https://promos.makemytrip.com/images/RESORT.png",
      selected: true,
      disabled: false,
    },
    // {
    //   id: "business-hotel",
    //   name: "Business Hotel",
    //   description:
    //     "A hotel catering primarily to business travelers with amenities like meeting rooms, business centers, and high-speed internet.",
    //   image: "assets/images/business-hotel.jpg",
    //   selected: false,
    //   disabled: true,
    // },
    // {
    //   id: "boutique-hotel",
    //   name: "Boutique Hotel",
    //   description:
    //     "A small, stylish hotel typically situated in a fashionable urban location with individualized design and personalized service.",
    //   image: "assets/images/boutique-hotel.jpg",
    //   selected: false,
    //   disabled: true,
    // },
  ]

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Auto-select the first property type (Hotel)
    if (this.propertyTypes.length > 0) {
      this.selectPropertyType(this.propertyTypes[0])
    }
  }

  selectPropertyType(propertyType: PropertyType): void {
    // Deselect all property types
    this.propertyTypes.forEach((type) => (type.selected = false))

    // Select the clicked property type
    propertyType.selected = true
  }

  selectHotelType(hotelType: HotelType): void {
    // Deselect all hotel types
    this.hotelTypes.forEach((type) => (type.selected = false))

    // Select the clicked hotel type
    hotelType.selected = true
  }

  getSelectedPropertyType(): PropertyType | null {
    return this.propertyTypes.find((type) => type.selected) || null
  }

  getSelectedHotelType(): HotelType | null {
    return this.hotelTypes.find((type) => type.selected) || null
  }

  onCancel(): void {
    this.router.navigate(["/dashboard"])
  }

  onListProperty(): void {
    const selectedPropertyType = this.getSelectedPropertyType()
    const selectedHotelType = this.getSelectedHotelType()

    if (selectedPropertyType && selectedHotelType) {
      // Navigate to the onboarding flow with the selected property and hotel type
      this.router.navigate(["/onboarding/basic-info"], {
        queryParams: {
          propertyType: selectedPropertyType.id,
          hotelType: selectedHotelType.id,
        },
      })
    }
  }
}

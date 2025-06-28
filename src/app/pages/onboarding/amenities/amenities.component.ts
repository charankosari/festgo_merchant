import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, FormArray } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { ThemeService } from "../../../services/theme.service"
import { MessageService } from "primeng/api"
import { CommonService } from "src/app/services/common.service"
import { apiLinks } from "src/app/core/apiLink"

interface AmenityData {
  amenity_id: number
  ota_code: number
  amenity_name: string
  template: {
    attributes: Attribute[] | null
    type: string | null
    __typename?: string
  }
  is_selected: boolean | null
  is_recommended: boolean
  main_category: string
  tags: string[]
  selected_attributes: any
  id: number | null
  __typename?: string
  category_icon?: string | null
  category_order?: number
  icon?: string | null
  mapped_space_type: string | null
  mapped_space_ids: any | null
  mapped_spaces_status: any | null
}

interface Attribute {
  attribute_id: number
  ota_code: number | null
  attribute_name: string
  sub_template: {
    sub_attributes: string[] | null
    ota_codes: number[] | null
    type: string | null
    __typename?: string
  }
  __typename?: string
}

interface SelectedAttribute {
  attribute_name: string
  attribute_id: number
  sub_attributes: string[]
  __typename?: string
}

interface CategoryGroup {
  name: string
  amenities: AmenityData[]
}

@Component({
  selector: "app-amenities",
  templateUrl: "./amenities.component.html",
  styleUrls: ["./amenities.component.scss"],
})
export class AmenitiesComponent implements OnInit {
  amenitiesForm: FormGroup
  propertyId: string | null = null
  draftId: string | null = null
  isSubmitting = false
  activeCategory = "Mandatory"

  categories: CategoryGroup[] = []

  // JSON data from the provided file
  amenitiesData: AmenityData[] = [
    {
        "amenity_id": 2,
        "ota_code": 5,
        "amenity_name": "Air Conditioning",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50003,
                    "attribute_name": "Room controlled",
                    "sub_template": {
                        "sub_attributes": [
                            "All-Weather (Hot & Cold)"
                        ],
                        "ota_codes": [
                            50743
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50004,
                    "attribute_name": "Centralized",
                    "sub_template": {
                        "sub_attributes": [
                            "All-Weather (Hot & Cold)"
                        ],
                        "ota_codes": [
                            50744
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [
            "Work Friendly",
            "Kids Friendly"
        ],
        "selected_attributes": [
            {
                "attribute_name": "Room controlled",
                "attribute_id": 1,
                "sub_attributes": [
                    "All-Weather (Hot & Cold)"
                ],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500180,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 11,
        "ota_code": 50020,
        "amenity_name": "Laundry",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Limited Pieces of Laundry Free"
                        ],
                        "ota_codes": [
                            50745
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Limited Pieces of Laundry Free"
                        ],
                        "ota_codes": [
                            50745
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "Free",
                "attribute_id": 1,
                "sub_attributes": [
                    "Limited Pieces of Laundry Free"
                ],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500181,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 13,
        "ota_code": 50021,
        "amenity_name": "Newspaper",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50022,
                    "attribute_name": "Local Language",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50023,
                    "attribute_name": "English",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [],
        "id": 39500182,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 14,
        "ota_code": 50024,
        "amenity_name": "Parking",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Onsite",
                            "Valet",
                            "Public"
                        ],
                        "ota_codes": [
                            50746,
                            50747,
                            50748
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Onsite",
                            "Valet",
                            "Public"
                        ],
                        "ota_codes": [
                            50746,
                            50747,
                            50748
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "Paid",
                "attribute_id": 2,
                "sub_attributes": [
                    "Public"
                ],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500183,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 17,
        "ota_code": 50029,
        "amenity_name": "Room service",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50030,
                    "attribute_name": "24 hours",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50031,
                    "attribute_name": "Limited duration",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "24 hours",
                "attribute_id": 1,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500184,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 18,
        "ota_code": 50032,
        "amenity_name": "Smoke detector",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50033,
                    "attribute_name": "In Room",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50034,
                    "attribute_name": "Lobby",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "In Room",
                "attribute_id": 1,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Lobby",
                "attribute_id": 2,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500185,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 19,
        "ota_code": 50035,
        "amenity_name": "Smoking rooms",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [],
        "id": 39500186,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 20,
        "ota_code": 50036,
        "amenity_name": "Swimming Pool",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50037,
                    "attribute_name": "Common Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50038,
                    "attribute_name": "Kids Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50039,
                    "attribute_name": "Infinity Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50040,
                    "attribute_name": "Indoor Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50041,
                    "attribute_name": "Heated Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50042,
                    "attribute_name": "Roof Top Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50043,
                    "attribute_name": "Sunny Swimming",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50044,
                    "attribute_name": "Plunge Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 512,
                    "ota_code": 50045,
                    "attribute_name": "Pool cover",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 1024,
                    "ota_code": 50046,
                    "attribute_name": "Pool with a view",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2048,
                    "ota_code": 50047,
                    "attribute_name": "Saltwater pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4096,
                    "ota_code": 50048,
                    "attribute_name": "Shallow end",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8192,
                    "ota_code": 50040,
                    "attribute_name": "Indoor Pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16384,
                    "ota_code": 50050,
                    "attribute_name": "Fully secluded outdoor pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32768,
                    "ota_code": 50051,
                    "attribute_name": "Women-only pool",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "Common Pool",
                "attribute_id": 1,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Kids Pool",
                "attribute_id": 2,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Infinity Pool",
                "attribute_id": 8,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Indoor Pool",
                "attribute_id": 8192,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Heated Pool",
                "attribute_id": 32,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Roof Top Pool",
                "attribute_id": 64,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Sunny Swimming",
                "attribute_id": 128,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Plunge Pool",
                "attribute_id": 256,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Pool cover",
                "attribute_id": 512,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Pool with a view",
                "attribute_id": 1024,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Saltwater pool",
                "attribute_id": 2048,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Shallow end",
                "attribute_id": 4096,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Indoor Pool",
                "attribute_id": 8192,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Fully secluded outdoor pool",
                "attribute_id": 16384,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            },
            {
                "attribute_name": "Women-only pool",
                "attribute_id": 32768,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500187,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 25,
        "ota_code": 50059,
        "amenity_name": "Wifi",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Speed Suitable for working",
                            "Speed Suitable for Surfing",
                            "Unreliable",
                            "Available in lobby"
                        ],
                        "ota_codes": [
                            50749,
                            50750,
                            50752,
                            50753
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Speed Suitable for working",
                            "Speed Suitable for Surfing",
                            "Unreliable",
                            "Available in lobby"
                        ],
                        "ota_codes": [
                            50749,
                            50750,
                            50752,
                            50753
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [
            "Work Friendly",
            "Party Friendly"
        ],
        "selected_attributes": [
            {
                "attribute_name": "Free",
                "attribute_id": 1,
                "sub_attributes": [
                    "Speed Suitable for working"
                ],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500188,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 43,
        "ota_code": 50083,
        "amenity_name": "Lounge",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50084,
                    "attribute_name": "Cigar lounge",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50085,
                    "attribute_name": "Private",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50086,
                    "attribute_name": "Shared",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [],
        "id": 39500189,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 44,
        "ota_code": 50087,
        "amenity_name": "Reception",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50724,
                    "attribute_name": "24 hours",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50725,
                    "attribute_name": "Limited duration",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "Limited duration",
                "attribute_id": 2,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500190,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 58,
        "ota_code": 50122,
        "amenity_name": "Bar",
        "template": {
            "attributes": [
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Rooftop",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": [],
        "id": 39500191,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 64,
        "ota_code": 50132,
        "amenity_name": "Restaurant",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50133,
                    "attribute_name": "Halal",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50134,
                    "attribute_name": "Kosher",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 3,
                    "ota_code": 50727,
                    "attribute_name": "Veg food available",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50728,
                    "attribute_name": "Jain food available",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 5,
                    "ota_code": 50729,
                    "attribute_name": "Satvik food available",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 6,
                    "ota_code": null,
                    "attribute_name": "Indian",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [],
        "id": 39500192,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 72,
        "ota_code": 50154,
        "amenity_name": "Luggage assistance",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [
            "Elderly Friendly"
        ],
        "selected_attributes": [],
        "id": 39500193,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 77,
        "ota_code": 50163,
        "amenity_name": "Wheelchair",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [
            "Elderly Friendly"
        ],
        "selected_attributes": [
            {
                "attribute_name": "Free",
                "attribute_id": 1,
                "sub_attributes": [],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500194,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 85,
        "ota_code": 50173,
        "amenity_name": "Gym/ Fitness centre",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50174,
                    "attribute_name": "24-hour",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50175,
                    "attribute_name": "Personal Trainer",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": false,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [],
        "id": 39500195,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 118,
        "ota_code": 50261,
        "amenity_name": "CCTV",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": null,
        "id": 39500196,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 119,
        "ota_code": 50262,
        "amenity_name": "Fire extinguishers",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": null,
        "id": 39500197,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 126,
        "ota_code": 50269,
        "amenity_name": "Airport Transfers",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50754,
                            50755,
                            50756
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50754,
                            50755,
                            50756
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": [
            {
                "attribute_name": "Paid",
                "attribute_id": 2,
                "sub_attributes": [
                    "Private taxi",
                    "Luxury Car",
                    "Shared shuttle"
                ],
                "__typename": "SelectedAttributes"
            }
        ],
        "id": 39500198,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 238,
        "ota_code": 50439,
        "amenity_name": "First-aid services",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": true,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 1,
        "icon": "",
        "main_category": "Mandatory",
        "tags": [],
        "selected_attributes": null,
        "id": 39500199,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 1,
        "ota_code": 50001,
        "amenity_name": "Elevator/ Lift",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": null,
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 6,
        "ota_code": 50009,
        "amenity_name": "Housekeeping",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 9,
        "ota_code": 50012,
        "amenity_name": "Kitchen/Kitchenette",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50013,
                    "attribute_name": "Cooking appliances",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50014,
                    "attribute_name": "Microwave",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50015,
                    "attribute_name": "Utensils",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50016,
                    "attribute_name": "Toaster",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50017,
                    "attribute_name": "Induction",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50018,
                    "attribute_name": "Cutlery",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 10,
        "ota_code": 50019,
        "amenity_name": "LAN",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [
            "Work Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 15,
        "ota_code": 50025,
        "amenity_name": "Power backup",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50026,
                    "attribute_name": "Genset",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50027,
                    "attribute_name": "Inverter",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [
            "Work friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 16,
        "ota_code": 50028,
        "amenity_name": "Refrigerator",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": null,
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 23,
        "ota_code": 50057,
        "amenity_name": "Umbrellas",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": null,
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 24,
        "ota_code": 50058,
        "amenity_name": "Washing Machine",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": null,
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 245,
        "ota_code": 50448,
        "amenity_name": "Laundromat",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": null,
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 350,
        "ota_code": 50625,
        "amenity_name": "EV Charging Station",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 361,
        "ota_code": 50731,
        "amenity_name": "Driver's Accommodation",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 2,
        "icon": "",
        "main_category": "Basic Facilities",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 68,
        "ota_code": 50138,
        "amenity_name": "Bellboy service",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 69,
        "ota_code": 50139,
        "amenity_name": "Caretaker",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 70,
        "ota_code": 50140,
        "amenity_name": "Concierge",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 71,
        "ota_code": 50141,
        "amenity_name": "Multilingual Staff",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50142,
                    "attribute_name": "English",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50143,
                    "attribute_name": "Urdu",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50144,
                    "attribute_name": "Arabic",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50145,
                    "attribute_name": "Gujarati",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50146,
                    "attribute_name": "Bengali",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50147,
                    "attribute_name": "Tamil",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50148,
                    "attribute_name": "Telugu",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50149,
                    "attribute_name": "Kannada",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50150,
                    "attribute_name": "Malayalam",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 512,
                    "ota_code": 50151,
                    "attribute_name": "Punjabi",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 1024,
                    "ota_code": 50152,
                    "attribute_name": "Hindi",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2048,
                    "ota_code": 50153,
                    "attribute_name": "Marathi",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 73,
        "ota_code": 50155,
        "amenity_name": "Luggage storage",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 75,
        "ota_code": 50157,
        "amenity_name": "Specially abled assistance",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50158,
                    "attribute_name": "Auditory Guidance",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50159,
                    "attribute_name": "Wheelchair",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50160,
                    "attribute_name": "Braille",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50161,
                    "attribute_name": "Tactile signs",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 76,
        "ota_code": 50162,
        "amenity_name": "Wake-up Call / Service",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 80,
        "ota_code": 50166,
        "amenity_name": "Butler Services",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50167,
                    "attribute_name": "Personal",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50168,
                    "attribute_name": "For each floor",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": null,
        "main_category": "General Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 81,
        "ota_code": 50169,
        "amenity_name": "Doctor on call",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": "",
        "main_category": "General Services",
        "tags": [
            "Elderly Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 82,
        "ota_code": 50170,
        "amenity_name": "Medical centre",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 3,
        "icon": "",
        "main_category": "General Services",
        "tags": [
            "Elderly Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 288,
        "ota_code": 50543,
        "amenity_name": "Pool/ Beach towels",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 3,
        "icon": "",
        "main_category": "General Services",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 96,
        "ota_code": 50211,
        "amenity_name": "Beach",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50212,
                    "attribute_name": "Private",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50213,
                    "attribute_name": "Beachfront",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": "",
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 98,
        "ota_code": 50215,
        "amenity_name": "Bonfire",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50216,
                    "attribute_name": "On Request",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": "",
        "main_category": "Outdoor Activities and Sports",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 99,
        "ota_code": 50218,
        "amenity_name": "Golf",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 100,
        "ota_code": 50219,
        "amenity_name": "Kayaks",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 101,
        "ota_code": 50220,
        "amenity_name": "Outdoor sports",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50221,
                    "attribute_name": "Cricket",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50222,
                    "attribute_name": "Volleyball",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50223,
                    "attribute_name": "Basketball",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50224,
                    "attribute_name": "Tennis",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50225,
                    "attribute_name": "Badminton",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50226,
                    "attribute_name": "Swings",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50227,
                    "attribute_name": "Rock climbing",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50228,
                    "attribute_name": "Archery",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50229,
                    "attribute_name": "Horse Riding",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 512,
                    "ota_code": 50230,
                    "attribute_name": "Hiking",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 1024,
                    "ota_code": 50231,
                    "attribute_name": "Squash",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 103,
        "ota_code": 50233,
        "amenity_name": "Snorkelling",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 104,
        "ota_code": 50234,
        "amenity_name": "Telescope",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 105,
        "ota_code": 50235,
        "amenity_name": "Water sports",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50236,
                    "attribute_name": "Wind surfing",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50237,
                    "attribute_name": "Pedalos",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50238,
                    "attribute_name": "Water Skiing",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50239,
                    "attribute_name": "Diving",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50240,
                    "attribute_name": "Fishing",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50241,
                    "attribute_name": "Water slides",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50242,
                    "attribute_name": "Water park",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50243,
                    "attribute_name": "Trainer",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 107,
        "ota_code": 50245,
        "amenity_name": "Canoeing",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 108,
        "ota_code": 50246,
        "amenity_name": "Skiing",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50247,
                    "attribute_name": "Trainer",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50248,
                    "attribute_name": "Equipment",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 109,
        "ota_code": 50249,
        "amenity_name": "Jungle Safari",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 287,
        "ota_code": 50542,
        "amenity_name": "Cycling",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 4,
        "icon": null,
        "main_category": "Outdoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 39,
        "ota_code": 50077,
        "amenity_name": "Balcony/ Terrace",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 40,
        "ota_code": 50078,
        "amenity_name": "Fireplace",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50079,
                    "attribute_name": "Outdoor",
                    "sub_template": {
                        "sub_attributes": [
                            "Free",
                            "Paid"
                        ],
                        "ota_codes": [],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50080,
                    "attribute_name": "Indoor",
                    "sub_template": {
                        "sub_attributes": [
                            "Free",
                            "Paid"
                        ],
                        "ota_codes": [],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 3,
                    "ota_code": 50734,
                    "attribute_name": "Common",
                    "sub_template": {
                        "sub_attributes": [
                            "Free",
                            "Paid"
                        ],
                        "ota_codes": [],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 41,
        "ota_code": 50081,
        "amenity_name": "Lawn",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly",
            "Kids Friendly",
            "Pet Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 42,
        "ota_code": 50082,
        "amenity_name": "Library",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": null,
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 45,
        "ota_code": 50088,
        "amenity_name": "Seating Area",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": null,
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 46,
        "ota_code": 50089,
        "amenity_name": "Sun Deck",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 48,
        "ota_code": 50091,
        "amenity_name": "Verandah",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": null,
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 49,
        "ota_code": 50092,
        "amenity_name": "Jacuzzi",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50093,
                    "attribute_name": "For Women Only",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50094,
                    "attribute_name": "Available for couples",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 50,
        "ota_code": 50095,
        "amenity_name": "Prayer Room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 5,
        "icon": null,
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 244,
        "ota_code": 50447,
        "amenity_name": "Living Room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "NULL",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly",
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 250,
        "ota_code": 50453,
        "amenity_name": "Outdoor Furniture",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 5,
        "icon": null,
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 295,
        "ota_code": 50552,
        "amenity_name": "Picnic area",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 296,
        "ota_code": 50553,
        "amenity_name": "Game Room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [
            "Party Friendly",
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 323,
        "ota_code": 50589,
        "amenity_name": "Sitout Area",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50590,
                    "attribute_name": "Balcony",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50591,
                    "attribute_name": "Verandah",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 3,
                    "ota_code": 50592,
                    "attribute_name": "Seating Arrangement on the Lawn",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50593,
                    "attribute_name": "Poolside Sit-out-area",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 5,
                    "ota_code": 50594,
                    "attribute_name": "Patio",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 343,
        "ota_code": 50615,
        "amenity_name": "Bonfire Pit",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "null",
        "category_order": 5,
        "icon": "",
        "main_category": "Common Area",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 59,
        "ota_code": 50123,
        "amenity_name": "Barbeque",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": "",
        "main_category": "Food and Drink",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 60,
        "ota_code": 50124,
        "amenity_name": "Cafe",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50125,
                    "attribute_name": "24*7",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50126,
                    "attribute_name": "Limited Hours",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": null,
        "main_category": "Food and Drink",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 61,
        "ota_code": 50127,
        "amenity_name": "Coffee shop",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50128,
                    "attribute_name": "24*7",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50129,
                    "attribute_name": "Limited Hours",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": null,
        "main_category": "Food and Drink",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 62,
        "ota_code": 50130,
        "amenity_name": "Dining Area",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": "",
        "main_category": "Food and Drink",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 63,
        "ota_code": 50131,
        "amenity_name": "Kid's Menu",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": "",
        "main_category": "Food and Drink",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 67,
        "ota_code": 50137,
        "amenity_name": "Bakery",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": null,
        "main_category": "Food and Drink",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 358,
        "ota_code": 50735,
        "amenity_name": "Breakfast",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50736,
                    "attribute_name": "Indian veg food",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50737,
                    "attribute_name": "Jain food",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": "",
        "main_category": "Food and Drink",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 360,
        "ota_code": 50738,
        "amenity_name": "Food Options Available",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50739,
                    "attribute_name": "Veg",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50740,
                    "attribute_name": "Jain",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 3,
                    "ota_code": 50741,
                    "attribute_name": "Satvik",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 6,
        "icon": "",
        "main_category": "Food and Drink",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 84,
        "ota_code": 50172,
        "amenity_name": "Activity Centre",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 7,
        "icon": null,
        "main_category": "Health and wellness",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 86,
        "ota_code": 50176,
        "amenity_name": "Reflexology",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 7,
        "icon": null,
        "main_category": "Health and wellness",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 87,
        "ota_code": 50177,
        "amenity_name": "Yoga",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 7,
        "icon": null,
        "main_category": "Health and wellness",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 88,
        "ota_code": 50178,
        "amenity_name": "Meditation Room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 7,
        "icon": null,
        "main_category": "Health and wellness",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 33,
        "ota_code": 50071,
        "amenity_name": "Banquet",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 9,
        "icon": "",
        "main_category": "Business Center and Conferences",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 34,
        "ota_code": 50072,
        "amenity_name": "Business Center",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 9,
        "icon": "",
        "main_category": "Business Center and Conferences",
        "tags": [
            "Work Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 36,
        "ota_code": 50074,
        "amenity_name": "Conference room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 9,
        "icon": "",
        "main_category": "Business Center and Conferences",
        "tags": [
            "Work Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 37,
        "ota_code": 50075,
        "amenity_name": "Photocopying",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 9,
        "icon": null,
        "main_category": "Business Center and Conferences",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 239,
        "ota_code": 50440,
        "amenity_name": "Fax service",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "",
        "category_order": 9,
        "icon": null,
        "main_category": "Business Center and Conferences",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 240,
        "ota_code": 50441,
        "amenity_name": "Printer",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "",
        "category_order": 9,
        "icon": null,
        "main_category": "Business Center and Conferences",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 29,
        "ota_code": 50063,
        "amenity_name": "Massage",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50064,
                    "attribute_name": "Couple Massage",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50065,
                    "attribute_name": "Foot massage",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 30,
        "ota_code": 50066,
        "amenity_name": "Salon",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50067,
                    "attribute_name": "Waxing",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50068,
                    "attribute_name": "Hair Cut",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 31,
        "ota_code": 50069,
        "amenity_name": "Spa",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "For Women Only",
                            "Available for couples"
                        ],
                        "ota_codes": [
                            50757,
                            50758
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "For Women Only",
                            "Available for couples"
                        ],
                        "ota_codes": [
                            50757,
                            50758
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 32,
        "ota_code": 50070,
        "amenity_name": "Steam and Sauna",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "For Women Only",
                            "Available for couples"
                        ],
                        "ota_codes": [
                            50759,
                            50760
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "For Women Only",
                            "Available for couples"
                        ],
                        "ota_codes": [
                            50759,
                            50760
                        ],
                        "type": "radio",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 291,
        "ota_code": 50546,
        "amenity_name": "Open air bath",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 294,
        "ota_code": 50549,
        "amenity_name": "Hammam",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50550,
                    "attribute_name": "For Women Only",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50551,
                    "attribute_name": "Available for couples",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 10,
        "icon": null,
        "main_category": "Beauty and Spa",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 297,
        "ota_code": 50554,
        "amenity_name": "Security alarms",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 11,
        "icon": null,
        "main_category": "Security",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 338,
        "ota_code": 50605,
        "amenity_name": "Security Guard",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 11,
        "icon": "",
        "main_category": "Security",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 339,
        "ota_code": 50606,
        "amenity_name": "Carbon Monoxide Detector",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 11,
        "icon": "",
        "main_category": "Security",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 128,
        "ota_code": 50271,
        "amenity_name": "Shuttle Service",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 12,
        "icon": null,
        "main_category": "Transfers",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 129,
        "ota_code": 50272,
        "amenity_name": "Railway Station Transfers",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50761,
                            50762,
                            50763
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50761,
                            50762,
                            50763
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 12,
        "icon": "",
        "main_category": "Transfers",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 130,
        "ota_code": 50273,
        "amenity_name": "Bus Station transfers",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": null,
                    "attribute_name": "Free",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50764,
                            50765,
                            50766
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": null,
                    "attribute_name": "Paid",
                    "sub_template": {
                        "sub_attributes": [
                            "Private taxi",
                            "Luxury Car",
                            "Shared shuttle"
                        ],
                        "ota_codes": [
                            50764,
                            50765,
                            50766
                        ],
                        "type": "checkbox",
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 12,
        "icon": "",
        "main_category": "Transfers",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 51,
        "ota_code": 50096,
        "amenity_name": "Events",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50097,
                    "attribute_name": "Live Band",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50098,
                    "attribute_name": "Live Singer",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50099,
                    "attribute_name": "Live Ghazal",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50100,
                    "attribute_name": "Live Music",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50101,
                    "attribute_name": "Puppet Show",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50102,
                    "attribute_name": "Magic",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50103,
                    "attribute_name": "Fire Show",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50104,
                    "attribute_name": "Karaoke",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50105,
                    "attribute_name": "Movies",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 512,
                    "ota_code": 50106,
                    "attribute_name": "DJ",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 1024,
                    "ota_code": 50107,
                    "attribute_name": "Stand-up Comedy",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2048,
                    "ota_code": 50108,
                    "attribute_name": "Folk Dance",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 13,
        "icon": null,
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 52,
        "ota_code": 50109,
        "amenity_name": "Pub",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 13,
        "icon": "",
        "main_category": "Entertainment",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 54,
        "ota_code": 50111,
        "amenity_name": "Professional Photography",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 13,
        "icon": "",
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 55,
        "ota_code": 50112,
        "amenity_name": "Night Club",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 13,
        "icon": null,
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 301,
        "ota_code": 50558,
        "amenity_name": "Beach club",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 13,
        "icon": null,
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 324,
        "ota_code": 50595,
        "amenity_name": "Movie Room",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 13,
        "icon": null,
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 326,
        "ota_code": 50597,
        "amenity_name": "Music System",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 13,
        "icon": null,
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 356,
        "ota_code": 50742,
        "amenity_name": "Water Park",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 13,
        "icon": "",
        "main_category": "Entertainment",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 121,
        "ota_code": 50264,
        "amenity_name": "Book shop",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 14,
        "icon": null,
        "main_category": "Shopping",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 124,
        "ota_code": 50267,
        "amenity_name": "Souvenir shop",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 14,
        "icon": null,
        "main_category": "Shopping",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 125,
        "ota_code": 50268,
        "amenity_name": "Jewellery Shop",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 14,
        "icon": null,
        "main_category": "Shopping",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 95,
        "ota_code": 50199,
        "amenity_name": "TV",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50200,
                    "attribute_name": "LED",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50201,
                    "attribute_name": "LCD",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50202,
                    "attribute_name": "Flat screen",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50203,
                    "attribute_name": "International Channels",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50204,
                    "attribute_name": "HD Channels",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50205,
                    "attribute_name": "Satellite TV",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50206,
                    "attribute_name": "Remote controlled",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50207,
                    "attribute_name": "Cable",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50208,
                    "attribute_name": "Smart TV",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 512,
                    "ota_code": 50209,
                    "attribute_name": "Non-Smart LED TV",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 1024,
                    "ota_code": 50210,
                    "attribute_name": "Non-Smart LCD TV",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "radio",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 15,
        "icon": "",
        "main_category": "Media and technology",
        "tags": [
            "Party Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 111,
        "ota_code": 50251,
        "amenity_name": "ATM",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 16,
        "icon": null,
        "main_category": "Payment Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 112,
        "ota_code": 50252,
        "amenity_name": "Currency Exchange",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 16,
        "icon": null,
        "main_category": "Payment Services",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 90,
        "ota_code": 50180,
        "amenity_name": "Casino",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50181,
                    "attribute_name": "Free Entry",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50182,
                    "attribute_name": "Paid Entry",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 17,
        "icon": null,
        "main_category": "Indoor Activities and Sports",
        "tags": [],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 91,
        "ota_code": 50183,
        "amenity_name": "Indoor games",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50184,
                    "attribute_name": "Board Games",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50185,
                    "attribute_name": "Pool Table",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50186,
                    "attribute_name": "Air Hockey",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50187,
                    "attribute_name": "Dart",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50188,
                    "attribute_name": "Table tennis",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 32,
                    "ota_code": 50189,
                    "attribute_name": "Carrom Board",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 64,
                    "ota_code": 50190,
                    "attribute_name": "Foosball",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 128,
                    "ota_code": 50191,
                    "attribute_name": "Bowling",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 256,
                    "ota_code": 50192,
                    "attribute_name": "Puzzles",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 17,
        "icon": "",
        "main_category": "Indoor Activities and Sports",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 56,
        "ota_code": 50113,
        "amenity_name": "Childcare service",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50114,
                    "attribute_name": "Babysitting",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50115,
                    "attribute_name": "Cribs",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 18,
        "icon": "",
        "main_category": "Family and kids",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 57,
        "ota_code": 50116,
        "amenity_name": "Children's play area",
        "template": {
            "attributes": [
                {
                    "attribute_id": 1,
                    "ota_code": 50117,
                    "attribute_name": "Books",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 2,
                    "ota_code": 50118,
                    "attribute_name": "DVDs",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 4,
                    "ota_code": 50119,
                    "attribute_name": "Swings",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 8,
                    "ota_code": 50120,
                    "attribute_name": "Music",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                },
                {
                    "attribute_id": 16,
                    "ota_code": 50121,
                    "attribute_name": "Video Games",
                    "sub_template": {
                        "sub_attributes": null,
                        "ota_codes": null,
                        "type": null,
                        "__typename": "SubTemplate"
                    },
                    "__typename": "Attributes"
                }
            ],
            "type": "checkbox",
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "Null",
        "category_order": 18,
        "icon": "",
        "main_category": "Family and kids",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 284,
        "ota_code": 50539,
        "amenity_name": "Kids' Club",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 18,
        "icon": "",
        "main_category": "Family and kids",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 285,
        "ota_code": 50540,
        "amenity_name": "Strollers",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 18,
        "icon": "",
        "main_category": "Family and kids",
        "tags": [
            "Kids Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 299,
        "ota_code": 50556,
        "amenity_name": "Pet bowls",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 20,
        "icon": "",
        "main_category": "Pet essentials",
        "tags": [
            "Pet Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    },
    {
        "amenity_id": 300,
        "ota_code": 50557,
        "amenity_name": "Pet baskets",
        "template": {
            "attributes": null,
            "type": null,
            "__typename": "Template"
        },
        "is_selected": null,
        "is_recommended": false,
        "category_icon": "dummy",
        "category_order": 20,
        "icon": "",
        "main_category": "Pet essentials",
        "tags": [
            "Pet Friendly"
        ],
        "selected_attributes": null,
        "id": null,
        "mapped_space_type": null,
        "mapped_space_ids": null,
        "mapped_spaces_status": null,
        "__typename": "AmenityMappingDetail"
    }
]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public themeService: ThemeService,
    private messageService: MessageService,
    public commonService: CommonService
  ) {
    this.amenitiesForm = this.fb.group({
      amenities: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params["id"] || null
      this.draftId = params["draft_id"] || null
    })

    this.groupAmenitiesByCategory()
    this.initForm()
  }

  groupAmenitiesByCategory(): void {
    const categoryMap = new Map<string, AmenityData[]>()

    this.amenitiesData.forEach((amenity) => {
      if (!categoryMap.has(amenity.main_category)) {
        categoryMap.set(amenity.main_category, [])
      }
      categoryMap.get(amenity.main_category)!.push(amenity)
    })

    this.categories = Array.from(categoryMap.entries()).map(([name, amenities]) => ({
      name,
      amenities,
    }))

    if (this.categories.length > 0) {
      this.activeCategory = this.categories[0].name
    }
  }

  initForm(): void {
    const amenitiesArray = this.amenitiesForm.get("amenities") as FormArray

    this.amenitiesData.forEach((amenity) => {
      const initialValue = amenity.is_selected === true ? "true" : "false"

      const amenityGroup = this.fb.group({
        amenity_id: amenity.amenity_id,
        amenity_name: amenity.amenity_name,
        is_selected: [initialValue],
        selected_attributes: this.fb.array([]),
        selected_sub_attributes: this.fb.group({
          main_attribute: [null],
          checkbox_attributes: [[]],
        }),
      })

      // Add sub-attribute controls for each attribute
      if (amenity.template?.attributes) {
        const subAttrsGroup = amenityGroup.get("selected_sub_attributes") as FormGroup
        amenity.template.attributes.forEach((attr) => {
          subAttrsGroup.addControl(`sub_attribute_${attr.attribute_id}`, this.fb.control(null))
        })
      }

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
      const formControl = this.getAmenityFormControl(amenity.amenity_id)
      return formControl?.get("is_selected")?.value === "true"
    }).length
  }

  getTotalAmenitiesCount(categoryName: string): number {
    const category = this.categories.find((cat) => cat.name === categoryName)
    return category ? category.amenities.length : 0
  }

  getAmenityFormControl(amenityId: number): FormGroup | null {
    const amenitiesArray = this.amenitiesFormArray
    const index = this.amenitiesData.findIndex((a) => a.amenity_id === amenityId)
    return index >= 0 ? (amenitiesArray.at(index) as FormGroup) : null
  }

  onAmenitySelectionChange(amenity: AmenityData, selected: boolean): void {
    const formControl = this.getAmenityFormControl(amenity.amenity_id)
    if (formControl) {
      formControl.get("is_selected")?.setValue(selected)
    }
  }

  onAttributeChange(amenity: AmenityData, attribute: Attribute, value: any): void {
    const formControl = this.getAmenityFormControl(amenity.amenity_id)
    if (formControl) {
      const subAttrsControl = formControl.get("selected_sub_attributes") as FormGroup
      const attrKey = `attr_${attribute.attribute_id}`

      if (subAttrsControl.get(attrKey)) {
        subAttrsControl.get(attrKey)?.setValue(value)
      }
    }
  }

  getAttributeOptions(attribute: Attribute): any[] {
    if (!attribute.sub_template?.sub_attributes) return []

    return attribute.sub_template.sub_attributes.map((subAttr, index) => ({
      label: subAttr,
      value: subAttr,
      code: attribute.sub_template?.ota_codes?.[index] || null,
    }))
  }

  onBack(): void {
    this.router.navigate(["/onboarding/location"], {
      queryParams: {
        id: this.propertyId,
        draft_id: this.draftId,
      },
    })
  }

  onSubmit(): void {
    const formData = this.amenitiesForm.value
    if (this.amenitiesForm.valid) {
        this.isSubmitting = true
        this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.amenitiesForm.value).subscribe((res: any) => {
          console.log("result", res);
          this.messageService.add({
            severity: "success",
            summary: "Ameneties Info Saved",
            detail: "Your Ameneties info has been saved",
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
        // Object.keys(this.amenitiesForm.controls).forEach((key) => {
        //   const control = this.amenitiesForm.get(key)
        //   control?.markAsTouched()
  
        //   // If it's a FormGroup, mark all its controls as touched
        //   if (control instanceof FormGroup) {
        //     Object.keys(control.controls).forEach((nestedKey) => {
        //       control.get(nestedKey)?.markAsTouched()
        //     })
        //   }
        // })
  
        this.messageService.add({
          severity: "error",
          summary: "Validation Error",
          detail: "Please fill in all required fields correctly.",
          life: 3000,
        })
      }
    console.log("Amenities form data:", formData)

    this.isSubmitting = true

    setTimeout(() => {
      this.isSubmitting = false
      this.router.navigate(["/onboarding/policies"], {
        queryParams: {
          id: this.propertyId,
          draft_id: this.draftId,
        },
      })
    }, 1000)
  }

  getMainAttributeOptions(amenity: AmenityData): any[] {
    if (!amenity.template?.attributes) return []

    return amenity.template.attributes.map((attr) => ({
      label: attr.attribute_name,
      value: attr.attribute_id,
      attribute: attr,
    }))
  }

  getSubAttributeOptions(attribute: Attribute): any[] {
    if (!attribute.sub_template?.sub_attributes) return []

    return attribute.sub_template.sub_attributes.map((subAttr) => ({
      label: subAttr,
      value: subAttr,
    }))
  }

  getCheckboxAttributeOptions(amenity: AmenityData): any[] {
    if (!amenity.template?.attributes) return []

    return amenity.template.attributes.map((attr) => ({
      label: attr.attribute_name,
      value: attr.attribute_id,
    }))
  }

  getSelectedMainAttribute(amenity: AmenityData, formControl: FormGroup): Attribute | null {
    const selectedId = formControl.get("selected_sub_attributes")?.get("main_attribute")?.value
    if (!selectedId || !amenity.template?.attributes) return null

    return amenity.template.attributes.find((attr) => attr.attribute_id === selectedId) || null
  }

  onYesNoChange(amenityId: number, value: boolean): void {
    const formControl = this.getAmenityFormControl(amenityId)
    if (formControl) {
      formControl.get("is_selected")?.setValue(value)
    }
  }
}

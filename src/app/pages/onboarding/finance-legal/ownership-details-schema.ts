export interface OwnershipDetailsSchema {
  sectionTitle: string
  sectionSubtitle: string
  ownershipTypeQuestion: string
  ownershipTypeLabel: string
  ownershipTypes: string[]
  documentUploadTitle: string
  documentUploadSubtitle: string
  propertyAddressLabel: string
  dragDropText: string
  clickHereText: string
  uploadInfoText: string
  saveButtonText: string
}

export const ownershipDetailsSchema: OwnershipDetailsSchema = {
  sectionTitle: "Ownership details",
  sectionSubtitle: "Provide documents that proves your ownership",
  ownershipTypeQuestion: "Type of ownership does the property have?",
  ownershipTypeLabel: "Choose the ownership type",
  ownershipTypes: [
    "My Own property",
    "My Spouse owns the property",
    "My Parents / Grand Parents own the property",
    "My Sibling / Cousin owns the property",
    "My friend owns the property",
    "I have taken property for Revenue Management",
    "Lease Property",
  ],
  documentUploadTitle: "Upload the registration document of the property",
  documentUploadSubtitle: "The address on the registration document should match with the property address",
  propertyAddressLabel: "Your property address:",
  dragDropText: "Drag & Drop the Registration Document",
  clickHereText: "click here",
  uploadInfoText: "(Upload PDF/PNG/JPG/JPEG files of up to 15 MB)",
  saveButtonText: "Save",
}

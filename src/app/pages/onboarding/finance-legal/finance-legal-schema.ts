export interface OwnershipDetails {
  ownershipType: string
  ownershipDocument: string
  documentUploaded: string
}

export interface BankDetails {
  accountNumber: string
  reEnterAccountNumber: string
  ifscCode: string
  bankName: string
}

export interface TaxDetails {
  hasGSTIN: boolean
  gstin: string
  pan: string
  hasTAN: boolean
  tan: string
}

export interface FinanceLegalFormData {
  sectionTitle: string
  sectionSubtitle: string
  ownershipDetails: OwnershipDetails
  bankingDetails: {
    title: string
    subtitle: string
  }
  bankDetails: {
    title: string
    fields: {
      accountNumber: {
        label: string
        placeholder: string
      }
      reEnterAccountNumber: {
        label: string
        placeholder: string
      }
      ifscCode: {
        label: string
        placeholder: string
      }
      bankName: {
        label: string
        placeholder: string
        options: string[]
      }
    }
  }
  taxDetails: {
    gstinQuestion: string
    panFieldYes: {
      label: string
      placeholder: string
    }
    gstinField: {
      label: string
      placeholder: string
    }
    panField: {
      label: string
      placeholder: string
    }
    tanQuestion: string
    tanField: {
      label: string
      placeholder: string
    }
  }
  consentText: string
}

export const financeLegalSchema: FinanceLegalFormData = {
  sectionTitle: "Finance & Legal",
  sectionSubtitle: "Add finance & legal details for the new listing of your property.",
  ownershipDetails: {
    ownershipType: "My Own property",
    ownershipDocument: "Yes",
    documentUploaded: "Yes",
  },
  bankingDetails: {
    title: "Banking Details",
    subtitle: "Enter Bank, PAN & GST Details",
  },
  bankDetails: {
    title: "Bank Details",
    fields: {
      accountNumber: {
        label: "Account Number",
        placeholder: "Enter Account Number",
      },
      reEnterAccountNumber: {
        label: "Re-enter Account Number",
        placeholder: "Enter Account Number",
      },
      ifscCode: {
        label: "IFSC Code",
        placeholder: "Enter IFSC Code",
      },
      bankName: {
        label: "Bank Name",
        placeholder: "Select",
        options: [
          "State Bank of India",
          "HDFC Bank",
          "ICICI Bank",
          "Axis Bank",
          "Punjab National Bank",
          "Bank of Baroda",
          "Canara Bank",
          "Union Bank of India",
          "Kotak Mahindra Bank",
          "IndusInd Bank",
        ],
      },
    },
  },
  taxDetails: {
    gstinQuestion: "Do you have a GSTIN?",
    panFieldYes: {
      label: "Enter PAN",
      placeholder: "Your PAN will be filled in automatically",
    },
    gstinField: {
      label: "Enter GSTIN",
      placeholder: "Enter the 15-digit GSTIN",
    },
    panField: {
      label: "Enter PAN",
      placeholder: "Your PAN will be filled in automatically",
    },
    tanQuestion: "Do you have a TAN?",
    tanField: {
      label: "Enter TAN",
      placeholder: "Enter 12-digit TAN",
    },
  },
  consentText:
    "Final verification will be done through a third party. Please give your consent in order to initiate the process",
}

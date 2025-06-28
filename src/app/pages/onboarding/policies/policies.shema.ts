export interface PolicySchema {
  sectionTitle: string
  sectionSubtitle: string
  sections: PolicySection[]
}

export interface PolicySection {
  id: string
  title: string
  icon: string
  rulesAdded: string
  expanded: boolean
  questions: PolicyQuestion[]
}

export interface PolicyQuestion {
  id: string
  type: "radio" | "dropdown" | "price" | "text" | "info"
  question: string
  options?: string[]
  value?: any
  defaultValue?: any
  conditional?: boolean
  conditionalValue?: any
  conditionalQuestions?: PolicyQuestion[]
  placeholder?: string
  description?: string
  recommended?: boolean
}

export const policiesSchema: PolicySchema = {
  sectionTitle: "Policies",
  sectionSubtitle: "Mention all the policies applicable at your property.",
  sections: [
    {
      id: "check-in-out",
      title: "Check-in & Check-out Time",
      icon: "clock",
      rulesAdded: "",
      expanded: true,
      questions: [
        {
          id: "checkInInfo",
          type: "info",
          question: "Specify the check-in & check-out time at your property",
        },
        {
          id: "checkInTime",
          type: "dropdown",
          question: "Check-in Time",
          options: [
            "12:00 am (midnight)",
            "1:00 am",
            "2:00 am",
            "3:00 am",
            "4:00 am",
            "5:00 am",
            "6:00 am",
            "7:00 am",
            "8:00 am",
            "9:00 am",
            "10:00 am",
            "11:00 am",
            "12:00 pm (noon)",
            "1:00 pm",
            "2:00 pm",
            "3:00 pm",
            "4:00 pm",
            "5:00 pm",
            "6:00 pm",
            "7:00 pm",
            "8:00 pm",
            "9:00 pm",
            "10:00 pm",
            "11:00 pm",
          ],
          value: "12:00 pm (noon)",
        },
        {
          id: "checkOutTime",
          type: "dropdown",
          question: "Check-out Time",
          options: [
            "12:00 am (midnight)",
            "1:00 am",
            "2:00 am",
            "3:00 am",
            "4:00 am",
            "5:00 am",
            "6:00 am",
            "7:00 am",
            "8:00 am",
            "9:00 am",
            "10:00 am",
            "11:00 am",
            "12:00 pm (noon)",
            "1:00 pm",
            "2:00 pm",
            "3:00 pm",
            "4:00 pm",
            "5:00 pm",
            "6:00 pm",
            "7:00 pm",
            "8:00 pm",
            "9:00 pm",
            "10:00 pm",
            "11:00 pm",
          ],
          value: "11:00 am",
        },
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation Policy",
      icon: "calendar-x",
      rulesAdded: "",
      expanded: true,
      questions: [
        {
          id: "cancellationInfo",
          type: "info",
          question: "Offering a flexible cancellation policy helps traveller book in advance.",
        },
        {
          id: "cancellationPolicy",
          type: "radio",
          question: "",
          options: [
            "Free Cancellation till check-in",
            "Free Cancellation till 24 hours before check-in",
            "Free Cancellation till 48 hours before check-in",
            "Free Cancellation till 72 hours before check-in",
            "Non-Refundable",
          ],
          value: "Free Cancellation till 48 hours before check-in",
          description:
            "Selected policy would be applicable to 1 rateplan created. You can modify this policy after completing the listing.",
        },
      ],
    },
    {
      id: "guest-profile",
      title: "Guest Profile",
      icon: "user",
      rulesAdded: "4/4 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "allowUnmarried",
          type: "radio",
          question: "Do you allow unmarried couples?",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "showCoupleFriendly",
          type: "radio",
          question: "Do you want to show couple friendly tag on MakeMytrip & Goibibo?",
          options: ["Yes", "No"],
          value: "Yes",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "allowBelow18",
          type: "radio",
          question: "Do you allow guests below 18 years of age at your property?",
          options: ["Yes", "No"],
          value: "No",
        },
        {
          id: "allowMaleGroups",
          type: "radio",
          question: "Groups with only male guests are allowed at your property?",
          options: ["Yes", "No"],
          value: "Yes",
        },
      ],
    },
    {
      id: "identity-proofs",
      title: "Acceptable Identity Proofs",
      icon: "id-card",
      rulesAdded: "2/2 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "acceptableIds",
          type: "dropdown",
          question: "Acceptable Identity Proofs",
          options: ["Aadhar Card", "Passport", "Driving License", "Voter ID"],
          value: "4 items selected",
        },
        {
          id: "allowSameCityIds",
          type: "radio",
          question: "Are IDs of the same city as the property allowed?",
          options: ["Yes", "No"],
          value: "Yes",
        },
      ],
    },
    {
      id: "property-restrictions",
      title: "Property Restrictions",
      icon: "ban",
      rulesAdded: "0/4 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "allowSmoking",
          type: "radio",
          question:
            "Is smoking allowed anywhere within the premises? (Select 'No' if it's not permitted, even in outdoor spaces like balconies or lawns, or any designated smoking area)",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "allowParties",
          type: "radio",
          question: "Are Private parties or events allowed at the property?",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "allowVisitors",
          type: "radio",
          question: "Can guests invite any outside visitors in the room during their stay?",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "wheelchairAccessible",
          type: "radio",
          question: "Is your property accessible for guests who use a wheelchair?",
          options: ["Yes", "No"],
          value: "Yes",
        },
      ],
    },
    {
      id: "pet-policy",
      title: "Pet Policy",
      icon: "paw-print",
      rulesAdded: "2/2 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "petsAllowed",
          type: "radio",
          question: "Are Pets Allowed?",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "petFoodAvailable",
          type: "radio",
          question: "Is Pet food available at the property?",
          options: ["Yes", "No"],
          value: "No",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "allowedPets",
          type: "dropdown",
          question: "Which all pets are allowed at the property?",
          options: ["Dogs", "Cats", "Birds", "Other"],
          value: "Select",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "petCharges",
          type: "radio",
          question: "Are there any extra charges for pets?",
          options: ["Yes", "No"],
          value: "No",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "restrictedAreas",
          type: "dropdown",
          question: "Pets are restricted/not allowed in these areas?",
          options: ["Restaurant", "Pool", "Spa", "Gym", "None"],
          value: "Select",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "petsWithoutLeash",
          type: "radio",
          question: "Are pets allowed to roam around without leash?",
          options: ["Yes", "No"],
          value: "No",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "numberOfPets",
          type: "dropdown",
          question: "No. of pets allowed",
          options: ["1", "2", "3", "4", "5+"],
          value: "Select",
          conditional: true,
          conditionalValue: "Yes",
        },
        {
          id: "petsOnProperty",
          type: "radio",
          question: "Any Pet(s) living on the property?",
          options: ["Yes", "No"],
          value: "Yes",
        },
      ],
    },
    {
      id: "checkin-checkout-policies",
      title: "Checkin and Checkout Policies",
      icon: "clock",
      rulesAdded: "1/1 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "24HourCheckin",
          type: "radio",
          question: "Do you have a 24-hour check-in?",
          options: ["Yes", "No"],
          value: "No",
        },
      ],
    },
    {
      id: "extra-bed-inclusion",
      title: "Extra Bed Inclusion Policy",
      icon: "bed",
      rulesAdded: "2/2 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "extraBedInfo",
          type: "info",
          question:
            "This confirms whether extra beds are included in the extra adult/paid child rates defined for each rate plan",
        },
        {
          id: "extraBedIncluded",
          type: "radio",
          question: "Is extra bed included in extra adult/paid child rates?",
          options: ["Yes", "No"],
          value: "Yes",
        },
        {
          id: "ratesCovered",
          type: "radio",
          question: "Which of the following rates does it cover?",
          options: ["Extra adult and Extra paid child", "Extra adult only"],
          value: "Extra adult and Extra paid child",
          conditional: true,
          conditionalValue: "Yes",
        },
      ],
    },
    {
      id: "extra-bed-policies",
      title: "Extra Bed Policies",
      icon: "bed-double",
      rulesAdded: "8/8 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "bedForAdults",
          type: "radio",
          question: "Do you provide bed to extra adults?",
          options: ["Yes", "No", "Subject to availability"],
          value: "Subject to availability",
        },
        {
          id: "adultBedType",
          type: "dropdown",
          question: "Please mention the type of extra bed provided to adults",
          options: ["Cot", "Mattress", "Sofa cum bed"],
          value: "3 items selected",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "adultCotCharges",
          type: "price",
          question:
            "Extra cot charges per adult? (Please add this only if these charges are not included as part of extra adult rates. These will be paid at the property)",
          value: "800",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "adultMattressCharges",
          type: "price",
          question:
            "Extra mattress charges per adult? (Please add this only if these charges are not included as part of rates for additional guests (adults) . These will be paid at the property)",
          value: "800",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "adultSofaCharges",
          type: "price",
          question:
            "Extra sofa cum bed charges per adult?(Please add this only if these charges are not included as part of rates for additional guests (adult).These will be paid at the property)",
          value: "800",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "bedForKids",
          type: "radio",
          question: "Do you provide bed to extra kids?",
          options: ["Yes", "No", "Subject to availability"],
          value: "Yes",
        },
        {
          id: "kidBedType",
          type: "dropdown",
          question: "Please mention the type of extra bed provided to kids.",
          options: ["Cot", "Mattress", "Sofa cum bed", "Crib"],
          value: "4 items selected",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "kidCotCharges",
          type: "price",
          question:
            "Extra cot charges per child? (Please add this only if these charges are not included as part of extra child guest rates. These will be paid at the property)",
          value: "1000",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "kidMattressCharges",
          type: "price",
          question:
            "Extra mattress charges per child? (Please add this only if these charges are not included as part of extra child guest rates. These will be paid at the property)",
          value: "1000",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "kidSofaCharges",
          type: "price",
          question:
            "Extra sofa cum bed charges per child? (Please add this only if these charges are not included as part of extra child guest rates. These will be paid at the property)",
          value: "1000",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
        {
          id: "kidCribCharges",
          type: "price",
          question:
            "Extra crib charges per child? (Please add this only if these charges are not included as part of rates for additional child guests. These will be paid at the property)",
          value: "1000",
          conditional: true,
          conditionalValue: ["Yes", "Subject to availability"],
        },
      ],
    },
    {
      id: "custom-policy",
      title: "Custom Policy",
      icon: "file-text",
      rulesAdded: "0/1 RULES ADDED",
      expanded: true,
      questions: [],
    },
    {
      id: "meal-prices",
      title: "Meal rack prices",
      icon: "utensils",
      rulesAdded: "3/3 RULES ADDED",
      expanded: true,
      questions: [
        {
          id: "breakfastPrice",
          type: "price",
          question: "Breakfast",
          value: "799",
        },
        {
          id: "lunchPrice",
          type: "price",
          question: "Lunch",
          value: "999",
        },
        {
          id: "dinnerPrice",
          type: "price",
          question: "Dinner",
          value: "999",
        },
      ],
    },
  ],
}

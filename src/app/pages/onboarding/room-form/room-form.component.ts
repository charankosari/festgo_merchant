import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms"

interface Room {
  id: string
  name: string
  type: string
  view: string
  size: number
  sizeUnit: string
  numberOfRooms: number
  description: string
  capacity: number
  price: number
  amenities: string[]
  images: string[]
}

@Component({
  selector: "app-room-form",
  templateUrl: "./room-form.component.html",
  styleUrls: ["./room-form.component.scss"],
})
export class RoomFormComponent implements OnInit {
  @Input() roomData: Room | null = null
  @Output() save = new EventEmitter<Room>()
  @Output() cancel = new EventEmitter<void>()

  roomForm: FormGroup;
  isEditing = false;
  bedFormArray: FormArray;

  roomTypes = [
    { label: "Standard Room", value: "standard" },
    { label: "Deluxe Room", value: "deluxe" },
    { label: "Suite", value: "suite" },
    { label: "Family Room", value: "family" },
    { label: "Executive Room", value: "executive" },
    { label: "Presidential Suite", value: "presidential" },
  ]

  roomViews = [
    { label: "City View", value: "city" },
    { label: "Ocean View", value: "ocean" },
    { label: "Garden View", value: "garden" },
    { label: "Pool View", value: "pool" },
    { label: "Mountain View", value: "mountain" },
    { label: "Courtyard View", value: "courtyard" },
    { label: "No Specific View", value: "none" },
  ]

  bedFormats = [
    { label: "King Bed", value: "king", description: "> 6 feet by 6 feet", icon: "🛏️" },
    { label: "Queen Bed", value: "queen", description: "5 feet by 6.5 feet", icon: "🛏️" },
    { label: "Double Bed", value: "double", description: "4.5 feet by 6 feet", icon: "🛏️" },
    { label: "Single Bed", value: "single", description: "3 feet by 6 feet", icon: "🛏️" },
    { label: "Twin Bed", value: "twin", description: "3 feet by 6.25 feet", icon: "🛏️" },
    { label: "Sofa Bed", value: "sofa", description: "Convertible sofa", icon: "🛋️" },
    { label: "Bunk Bed", value: "bunk", description: "Stacked beds", icon: "🛏️" },
  ]

  mealPlans = [
    { label: "Room Only", value: "room_only" },
    { label: "FREE Breakfast", value: "free_breakfast" },
    { label: "Breakfast Only", value: "breakfast_only" },
    { label: "Half Board (Breakfast + Lunch/Dinner)", value: "half_board" },
    { label: "Full Board (All Meals)", value: "full_board" },
    { label: "All Inclusive", value: "all_inclusive" },
    { label: "Modified American Plan (MAP)", value: "map" },
    { label: "European Plan (EP)", value: "ep" },
    { label: "Continental Plan (CP)", value: "cp" },
  ]

  constructor(private fb: FormBuilder) {
    this.roomForm = this.createRoomsForms();
    this.bedFormArray = this.roomForm.get(['selectedRoomFormInfo', 'bedTypes']) as FormArray;
  }

  createRoomsForms() {
    return this.fb.group({
      roomDetailsFormInfo: this.roomDetailsForm(),
      selectedRoomFormInfo: this.fb.group({
        bedTypes: this.fb.array([this.createBedTypeGroup()]),
        canAccommodateExtraBeds: [false],
        hasAlternateSleeping: [false],
        alternateBedTypes: this.fb.array([this.createBedTypeGroup()]), // Ensure at least one group exists
        baseAdults: [2, [Validators.required, Validators.min(1)]],
        maximumAdults: [2, [Validators.required, Validators.min(1)]],
        maximumChildren: [1, [Validators.required, Validators.min(0)]],
        maximumOccupancy: [3, [Validators.required, Validators.min(1)]], 
      }),
      bathroomDetailsFormInfo: this.fb.group({
        numberOfBathrooms: [1, [Validators.required, Validators.min(1)]],
      }),
      mealPlanDetailsFormInfo: this.fb.group({mealPlan: ["", Validators.required],
        baseRateFor2Adults: [0, [Validators.required, Validators.min(0)]],
        extraAdultCharge: [0, [Validators.required, Validators.min(0)]],
        paidChildCharge: [0, [Validators.required, Validators.min(0)]],
        // inventoryStartDate: ["", Validators.required],
        // inventoryEndDate: ["", Validators.required],
      })
    });
  }

  ngOnInit(): void {
    if (this.roomData) {
      this.isEditing = true;
      this.roomForm.patchValue(this.roomData);
    } else {
      this.roomForm.patchValue({
        roomDetailsFormInfo: {
          id: this.generateId(),
          sizeUnit: "sqft",
          numberOfRooms: 1,
        }
      });
    }

    // Add sleepingArrangement control if not present
    if (!this.roomForm.get('sleepingArrangement')) {
      this.roomForm.addControl('sleepingArrangement', this.fb.group({
        standardBeds: this.fb.array([]),
        standardExtraBed: [false],
        altArrangementAvailable: [false],
        alternateBeds: this.fb.array([]),
        alternateExtraBed: [false],
        maxExtraBeds: [0, [Validators.min(0)]],
        baseAdults: [1, [Validators.required]],
        maxAdults: [1, [Validators.required]],
        maxChildren: [0, [Validators.required]],
        maxOccupancy: [1, [Validators.required]],
      }));
    }

    // Ensure at least one bed group exists in standardBeds FormArray
    const standardBedsArray = this.roomForm.get(['sleepingArrangement', 'standardBeds']) as FormArray;
    if (standardBedsArray.length === 0) {
      standardBedsArray.push(this.createBedGroup());
    }

    this.onAltToggle();
  }

  roomDetailsForm(){
    return this.fb.group({
      id: [""],
      name: ["", [Validators.required, Validators.minLength(2)]],
      type: ["", Validators.required],
      view: ["", Validators.required],
      size: [0, [Validators.required, Validators.min(1)]],
      sizeUnit: [null, Validators.required],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      description: [""],
      capacity: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      price: [0, [Validators.required, Validators.min(0)]],
      amenities: [[]],
      images: [[]],
    });
  }

  roomBedDetailsForm = {
    bedType: [""],
    // bedSize: [""],
    bedCount: [1, [Validators.required, Validators.min(1)]],
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.save.emit(this.roomForm.value)
    } else {
      this.markFormGroupTouched()
    }
  }

  onCancel(): void {
    this.cancel.emit()
  }

  private markFormGroupTouched(): void {
    Object.keys(this.roomForm.controls).forEach((key) => {
      const control = this.roomForm.get(key)
      control?.markAsTouched()
    })
  }

  // Sleeping Arrangement & Occupancy
  createBedTypeGroup(): FormGroup {
    return this.fb.group({
      bedType: ['', Validators.required],
      numberOfBeds: [1, [Validators.required, Validators.min(1)]],
    });
  }

  get bedTypesArray(): FormArray {
    return this.roomForm.get(['selectedRoomFormInfo', 'bedTypes']) as FormArray;
  }

  get alternateBedTypesArray(): FormArray {
    return this.roomForm.get(['selectedRoomFormInfo', 'alternateBedTypes']) as FormArray;
  }

  addBedType(): void {
    const bedTypes = this.roomForm.get(['selectedRoomFormInfo', 'bedTypes']) as FormArray;
    bedTypes.push(this.createBedTypeGroup());
  }

  removeBedType(index: number): void {
    const bedTypes = this.roomForm.get(['selectedRoomFormInfo', 'bedTypes']) as FormArray;
    if (bedTypes.length > 1) {
      bedTypes.removeAt(index);
    }
  }

  addAlternateBedType(): void {
    this.alternateBedTypesArray.push(this.createBedTypeGroup())
  }

  removeAlternateBedType(index: number): void {
    this.alternateBedTypesArray.removeAt(index)
  }

  incrementValue(controlName: string): void {
    const control = this.roomForm.get(controlName)
    if (control) {
      control.setValue(control.value + 1)
    }
  }

  decrementValue(controlName: string): void {
    const control = this.roomForm.get(controlName)
    if (control && control.value > 0) {
      control.setValue(control.value - 1)
    }
  }

  incrementBedCount(bedIndex: number): void {
    const bedGroup = this.bedTypesArray.at(bedIndex) as FormGroup
    const numberOfBedsControl = bedGroup.get("numberOfBeds")
    if (numberOfBedsControl) {
      numberOfBedsControl.setValue(numberOfBedsControl.value + 1)
    }
  }

  decrementBedCount(bedIndex: number): void {
    const bedGroup = this.bedTypesArray.at(bedIndex) as FormGroup
    const numberOfBedsControl = bedGroup.get("numberOfBeds")
    if (numberOfBedsControl && numberOfBedsControl.value > 1) {
      numberOfBedsControl.setValue(numberOfBedsControl.value - 1)
    }
  }


  get form(): FormGroup {
    return this.roomForm.get('sleepingArrangement') as FormGroup;
  }

  get standardBeds(): FormArray {
    return this.form.get('standardBeds') as FormArray;
  }

  get alternateBeds(): FormArray {
    return this.form.get('alternateBeds') as FormArray;
  }

  createBedGroup(): FormGroup {
    return this.fb.group({
      bedType: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addBed(array: FormArray) {
    array.push(this.createBedGroup());
  }

  removeBed(array: FormArray, index: number) {
    array.removeAt(index);
  }

  onAltToggle() {
    this.roomForm.get(['sleepingArrangement', 'altArrangementAvailable'])?.valueChanges.subscribe(enabled => {
      const altBeds = this.form.get('alternateBeds') as FormArray;
      if (!enabled) {
        while (altBeds.length) altBeds.removeAt(0);
        this.form.get('alternateExtraBed')?.setValue(false);
        this.form.get('maxExtraBeds')?.setValue(0);
      } else {
        altBeds.push(this.createBedGroup());
      }
    });
  }

  totalBeds(bedsArray: FormArray): number {
    return bedsArray.controls.reduce((sum, group) => sum + group.get('count')?.value || 0, 0);
  }
}


import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormBuilder, FormGroup, type FormArray, Validators } from "@angular/forms"
import { Router } from "@angular/router"

interface Room {
  id: string
  name: string
  type: string
  capacity: number
  price: number
  description: string
  amenities: string[]
  images: string[]
}

@Component({
  selector: "app-rooms",
  templateUrl: "./rooms.component.html",
  styleUrls: ["./rooms.component.scss"],
})
export class RoomsComponent implements OnInit {
  @Output() continue = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  roomsForm: FormGroup
  showCreateForm = false
  editingIndex: number | null = null
  isSubmitting: boolean = false

  roomTypes = [
    { label: "Standard Room", value: "standard" },
    { label: "Deluxe Room", value: "deluxe" },
    { label: "Suite", value: "suite" },
    { label: "Family Room", value: "family" },
    { label: "Executive Room", value: "executive" },
  ]

  amenitiesList = [
    { label: "Air Conditioning", value: "ac" },
    { label: "WiFi", value: "wifi" },
    { label: "TV", value: "tv" },
    { label: "Mini Bar", value: "minibar" },
    { label: "Balcony", value: "balcony" },
    { label: "Ocean View", value: "oceanview" },
  ]

  constructor(private fb: FormBuilder, private router: Router) {
    this.roomsForm = this.fb.group({
      rooms: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    // Add a sample room for demonstration
    this.addSampleRoom()
  }

  get roomsArray(): FormArray {
    return this.roomsForm.get("rooms") as FormArray
  }

  get createdRooms(): FormGroup[] {
    return this.roomsArray.controls as FormGroup[]
  }

  createRoomForm(room?: Partial<Room>): FormGroup {
    return this.fb.group({
      id: [room?.id || this.generateId()],
      name: [room?.name || "", [Validators.required, Validators.minLength(2)]],
      type: [room?.type || "", Validators.required],
      capacity: [room?.capacity || 1, [Validators.required, Validators.min(1)]],
      price: [room?.price || 0, [Validators.required, Validators.min(0)]],
      description: [room?.description || ""],
      amenities: [room?.amenities || []],
      images: [room?.images || []],
    })
  }

  addSampleRoom(): void {
    const sampleRoom: Partial<Room> = {
      id: "1",
      name: "Funny Family",
      type: "family",
      capacity: 4,
      price: 150,
      description: "A spacious family room with modern amenities",
      amenities: ["wifi", "ac", "tv"],
      images: [],
    }

    this.roomsArray.push(this.createRoomForm(sampleRoom))
  }

  addNewRoom(): void {
    this.showCreateForm = true
    this.editingIndex = null
    this.router.navigate(["/onboarding/rooms/create"])
  }

  editRoom(index: number): void {
    this.showCreateForm = true
    this.editingIndex = index;
    this.router.navigate(["/onboarding/rooms/edit", index]);
  }

  saveRoom(roomData: Room): void {
    if (this.editingIndex !== null) {
      // Update existing room
      const roomForm = this.createRoomForm(roomData)
      this.roomsArray.setControl(this.editingIndex, roomForm)
    } else {
      // Add new room
      const roomForm = this.createRoomForm(roomData)
      this.roomsArray.push(roomForm)
    }

    this.showCreateForm = false
    this.editingIndex = null
  }

  deleteRoom(index: number): void {
    this.roomsArray.removeAt(index)
  }

  cancelRoomForm(): void {
    this.showCreateForm = false
    this.editingIndex = null
  }

  getRoomData(index: number): Room {
    return this.roomsArray.at(index).value
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  onContinue(): void {
    if (this.roomsForm.valid && this.roomsArray.length > 0) {
      console.log("Rooms data:", this.roomsForm.value)
      this.continue.emit()
    }
  }

  getRoomTypeLabel(value: string): string {
    const type = this.roomTypes.find((t) => t.value === value)
    return type ? type.label : value
  }

  onSubmit() {
    this.router.navigate(["/onboarding/photos"]);
  }

  onCancel(): void {
    this.cancel.emit()
  }

  onBack(): void {
    // Navigate to previous step
    this.router.navigate(["/onboarding/amenities"], {
      queryParams: {
        // id: this.propertyId,
        // draft_id: this.draftId,
      },
    })
  }
}


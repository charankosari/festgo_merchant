import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { apiLinks } from 'src/app/core/apiLink';
import { CommonService } from 'src/app/services/common.service';


interface UploadedFile {
  file: File
  url?: string
  uploading: boolean
  uploaded: boolean
  error?: string
  type: "image" | "video"
}

interface MediaItem {
  imageURL: string
  tags: string[]
  coverPhoto: boolean
  type: "image" | "video"
}

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss'],
})
export class UploadsComponent implements OnInit {
  mediaForm: FormGroup;
  propertyId: string | null = null;
  draftId: string | null = null;
  isSubmitting = false;
  isDragOver = false;

  uploadedFiles: UploadedFile[] = [];
  rejectedFiles: { name: string; reason: string }[] = [];
  currentCoverPhotoIndex: number | null = null;

  // Predefined tags for the multi-select
  availableTags = [
    'Living Room',
    'Bedroom 1',
    'Bedroom 2',
    'Bedroom 3',
    'Kitchen',
    'Dining Area',
    'Bathroom',
    'Master Bathroom',
    'Balcony',
    'Terrace',
    'Garden',
    'Swimming Pool',
    'Gym',
    'Parking',
    'Entrance',
    'Lobby',
    'Exterior View',
    'Night View',
    'Amenities',
    'Common Area',
  ];

  // Validation rules
  validationRules = {
    maxFileSize: 30, // MB
    imageFormats: ['image/jpeg', 'image/png', 'image/jpg'],
    videoFormats: [
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/flv',
      'video/webm',
    ],
    minPhotos: 10,
    minLandscapePhotos: 1,
  };

  // Tips for upload
  uploadTips = [
    {
      icon: '📏',
      text: 'The size should not exceed 30 MB.',
    },
    {
      icon: '☀️',
      text: 'Always take the picture in bright natural light.',
    },
    {
      icon: '📸',
      text: 'Capture images of a well-organized rooms from various angles.',
    },
    {
      icon: '🖼️',
      text: 'Upload minimum 10 photos (Including 1 photo in landscape mode)',
    },
    {
      icon: '📱',
      text: 'Shoot photos & videos in landscape mode to make them look professional.',
    },
    {
      icon: '🚫',
      text: 'Avoid watermarking your photos & videos.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public themeService: ThemeService,
    private messageService: MessageService,
    private http: HttpClient,
    private commonService: CommonService
  ) {
    this.mediaForm = this.fb.group({
      mediaItems: this.fb.array([]),
    });
  }

  async loadExistingMedia(): Promise<void> {
    try {
      // Call API to get existing media data
      const response = await this.http
        .get<{ media: MediaItem[] }>(`/api/property-media/${this.propertyId || this.draftId}`)
        .toPromise()

      if (response?.media && response.media.length > 0) {
        // Clear existing data
        this.uploadedFiles = []
        this.mediaItemsArray.clear()

        // Load existing media items
        response.media.forEach((mediaItem, index) => {
          // Create uploaded file object
          const uploadedFile: UploadedFile = {
            file: new File([], `existing-file-${index}`, {
              type: mediaItem.type === "image" ? "image/jpeg" : "video/mp4",
            }),
            url: mediaItem.imageURL,
            uploading: false,
            uploaded: true,
            type: mediaItem.type,
          }

          this.uploadedFiles.push(uploadedFile)

          // Create form control
          const mediaItemGroup = this.fb.group({
            imageURL: [mediaItem.imageURL, Validators.required],
            tags: [mediaItem.tags, Validators.required],
            coverPhoto: [mediaItem.coverPhoto],
            type: [mediaItem.type],
          })

          this.mediaItemsArray.push(mediaItemGroup)

          // Set cover photo index
          if (mediaItem.coverPhoto) {
            this.currentCoverPhotoIndex = index
          }
        })
      }
    } catch (error) {
      console.error("Error loading existing media:", error)
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.propertyId = params['id'] || null;
      this.draftId = params['draft_id'] || null;
    });

    if (this.propertyId || this.draftId) {
      this.loadExistingMedia()
    }
  }

  get mediaItemsArray(): FormArray {
    return this.mediaForm.get('mediaItems') as FormArray;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }

  onFileSelect(event: any): void {
    const files: any = Array.from(event.target.files || []);
    this.handleFiles(files);

    // Reset the input
    event.target.value = '';
  }

  handleFiles(files: File[]): void {
    this.rejectedFiles = [];

    files.forEach((file) => {
      const validation = this.validateFile(file);

      if (validation.valid) {
        const fileType = this.getFileType(file);
        const uploadedFile: UploadedFile = {
          file,
          uploading: true,
          uploaded: false,
          type: fileType,
        };

        this.uploadedFiles.push(uploadedFile);
        this.uploadFile(uploadedFile);
      } else {
        this.rejectedFiles.push({
          name: file.name,
          reason: validation.reason || 'Unknown error',
        });
      }
    });

    if (this.rejectedFiles.length > 0) {
      this.showRejectedFilesMessage();
    }
  }

  validateFile(file: File): { valid: boolean; reason?: string } {
    // Check file size
    if (file.size > this.validationRules.maxFileSize * 1024 * 1024) {
      return {
        valid: false,
        reason: `File size exceeds ${this.validationRules.maxFileSize}MB`,
      };
    }

    // Check file format
    const isImage = this.validationRules.imageFormats.includes(file.type);
    const isVideo = this.validationRules.videoFormats.includes(file.type);

    if (!isImage && !isVideo) {
      return {
        valid: false,
        reason:
          'Invalid file format. Only JPEG/PNG images and MP4/AVI/MOV/WMV/FLV/WEBM videos are allowed.',
      };
    }

    return { valid: true };
  }

  getFileType(file: File): 'image' | 'video' {
    return this.validationRules.imageFormats.includes(file.type)
      ? 'image'
      : 'video';
  }

  async uploadFile(uploadedFile: UploadedFile): Promise<void> {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', uploadedFile.file);
      formData.append('propertyId', this.propertyId || '');

      // Mock API call - replace with your actual upload endpoint
      const response = await this.http
        .post<{ url: string }>(apiLinks.properties.uploadAndGetImageUrl, formData)
        .toPromise();

      uploadedFile.url =
        response?.url ||
        `https://example.com/uploads/${uploadedFile.file.name}`;
      uploadedFile.uploading = false;
      uploadedFile.uploaded = true;

      // Add form control for this media item
      this.addMediaItemControl(uploadedFile);
    } catch (error) {
      uploadedFile.uploading = false;
      uploadedFile.error = 'Upload failed';
      console.error('Upload error:', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Upload Failed',
        detail: `Failed to upload ${uploadedFile.file.name}`,
        life: 3000,
      });
    }
  }

  addMediaItemControl(uploadedFile: UploadedFile): void {
    const mediaItemGroup = this.fb.group({
      imageURL: [uploadedFile.url, Validators.required],
      tags: [[], Validators.required],
      coverPhoto: [false],
      type: [uploadedFile.type],
    });

    this.mediaItemsArray.push(mediaItemGroup);
  }

  showRejectedFilesMessage(): void {
    const rejectedCount = this.rejectedFiles.length;
    const rejectedNames = this.rejectedFiles
      .map((f) => `${f.name} (${f.reason})`)
      .join(', ');

    this.messageService.add({
      severity: 'warn',
      summary: `${rejectedCount} file(s) rejected`,
      detail: rejectedNames,
      life: 5000,
    });
  }

  onCoverPhotoChange(index: number, checked: any): void {
    if (checked.target.checked) {
      // Check if another image is already marked as cover photo
      if (
        this.currentCoverPhotoIndex !== null &&
        this.currentCoverPhotoIndex !== index
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cover Photo Already Selected',
          detail:
            'You already selected another image as cover photo. Only one image can be marked as cover photo.',
          life: 3000,
        });

        // Reset the checkbox
        const control = this.mediaItemsArray.at(index).get('coverPhoto');
        control?.setValue(false);
        return;
      }

      this.currentCoverPhotoIndex = index;
    } else {
      if (this.currentCoverPhotoIndex === index) {
        this.currentCoverPhotoIndex = null;
      }
    }
  }

  removeFile(index: number): void {
    // Remove from uploaded files array
    this.uploadedFiles.splice(index, 1);

    // Remove from form array
    this.mediaItemsArray.removeAt(index);

    // Update cover photo index if necessary
    if (this.currentCoverPhotoIndex === index) {
      this.currentCoverPhotoIndex = null;
    } else if (
      this.currentCoverPhotoIndex !== null &&
      this.currentCoverPhotoIndex > index
    ) {
      this.currentCoverPhotoIndex--;
    }
  }

  getUploadedImages(): UploadedFile[] {
    return this.uploadedFiles.filter(
      (file) => file.uploaded && file.type === 'image'
    );
  }

  canSubmit(): boolean {
    const uploadedImages = this.getUploadedImages();
    console.log('Uploaded images:', uploadedImages);
    console.log('Uploaded images truthy:', uploadedImages.length >= this.validationRules.minPhotos);
    console.log('Media items array valid:', this.mediaItemsArray.valid);
    console.log('Current cover photo index:', this.currentCoverPhotoIndex);
          // this.mediaItemsArray.valid &&
    return (
      uploadedImages.length >= this.validationRules.minPhotos &&
      this.currentCoverPhotoIndex !== null
    );
  }

  async onSubmit(): Promise<void> {

    console.log('Submitting media form:', this.mediaForm.value);
    console.log('Media items array:', this.mediaItemsArray.value);
    console.log('Current cover photo index:', this.mediaForm.controls);
    if (!this.canSubmit()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: `Please upload at least ${this.validationRules.minPhotos} photos, add tags to all media, and select a cover photo.`,
        life: 3000,
      });
      return;
    }

    this.isSubmitting = true;

    try {
      // Prepare the data structure
      this.commonService.postCommonHttpClient(apiLinks.properties.saveBasicInfo, this.mediaItemsArray.value?.mediaItems).subscribe((res: any) => {
        console.log("result", res);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Photos and videos uploaded successfully!",
          life: 3000,
        });
        this.router.navigate([`/onboarding/policies`], {
          queryParams: {
            id: this.propertyId,
            // draft_id: this.draftId,
          },
        })
      })
      // const mediaData: MediaItem[] = this.mediaItemsArray.controls.map(
      //   (control) => ({
      //     imageURL: control.get('imageURL')?.value,
      //     tags: control.get('tags')?.value,
      //     coverPhoto: control.get('coverPhoto')?.value,
      //     type: control.get('type')?.value,
      //   })
      // );

      // console.log('Submitting media data:', mediaData);
    } catch (error) {
      console.error('Submit error:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save photos and videos. Please try again.',
        life: 3000,
      });
    } finally {
      this.isSubmitting = false;
    }
  }

  onBack(): void {
    this.router.navigate(['/onboarding/amenities'], {
      queryParams: {
        id: this.propertyId,
        draft_id: this.draftId,
      },
    });
  }

  uploadedFilterValue: any;
  uploadedFileLen: any;
  returnUploadedValue() {
    this.uploadedFilterValue = this.uploadedFiles.filter(f => f.uploaded).length
    this.uploadedFileLen = this.uploadedFiles.length;
  }
}

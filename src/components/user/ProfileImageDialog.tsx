"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "../ui";

interface ProfileImageDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
}

export default function ProfileImageDialog({
  open,
  onClose,
  onUpload,
}: ProfileImageDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset preview/error when dialog closes to avoid stale state on reopen
  useEffect(() => {
    if (!open) {
      setPreview(null);
      setError(null);
    }
  }, [open]);

  /** ------------------------
   * File Handler
   * ------------------------ */
  const handleFile = async (file: File) => {
    setError(null);
    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);
    setUploading(true);

    try {
      await onUpload(file);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Clean up blob URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /** ------------------------
   * Dropzone
   * ------------------------ */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) handleFile(acceptedFiles[0]);
    },
  });

  /** ------------------------
   * UI
   * ------------------------ */
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
        </DialogHeader>

        {/* Drag and Drop Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${isDragActive ? "border-primary bg-secondary/30" : "border-muted-foreground/30"}`}
        >
          <input {...getInputProps()} />

          {preview ? (
            <div className="flex justify-center">
              <Image
                src={preview}
                width={120}
                height={120}
                alt="Preview"
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Drag & drop your new profile picture here
            </p>
          )}
        </div>

        {/* OR Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground bg-background">Or</span>
          </div>
        </div>

        {/* Choose File Button */}
        <div className="text-center">
          <Button
            variant="secondary"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            Choose from files
          </Button>

          <Input
            id="profile-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-center text-red-500">{error}</p>}

        {/* Footer */}
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={uploading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

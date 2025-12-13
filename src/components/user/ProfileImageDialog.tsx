"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast from "react-hot-toast";
import { Upload, X, Loader2 } from "lucide-react";

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
    } catch (err: unknown) {
      console.error("Error uploading profile image:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during upload."
      );
      setPreview(null);
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
    onDropAccepted: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) handleFile(acceptedFiles[0]);
    },
    onDropRejected: (fileRejections) => {
      const reason = fileRejections[0]?.errors[0]?.message;
      if (reason) toast.error(reason);
    },
  });

  const handleNativeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (uploading) return;
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleNativeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /** ------------------------
   * UI
   * ------------------------ */
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Upload Profile Photo
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Drag and Drop Area */}
          <div
            {...getRootProps()}
            onDrop={handleNativeDrop}
            onDragOver={handleNativeDragOver}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
            ${
              isDragActive
                ? "border-primary bg-primary/5 scale-[0.98]"
                : preview
                  ? "border-primary/40 bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <input {...getInputProps()} />

            {uploading ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-medium text-muted-foreground">
                  Uploading...
                </p>
              </div>
            ) : preview ? (
              <div className="relative">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Image
                      src={preview}
                      width={160}
                      height={160}
                      alt="Preview"
                      sizes="160px"
                      priority
                      unoptimized
                      className="object-cover border-4 rounded-full shadow-lg border-background"
                    />
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreview(null);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Looking good! Click to change
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="p-4 rounded-full bg-primary/10">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-foreground">
                    Drop your photo here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 border rounded-lg bg-destructive/10 border-destructive/20">
              <p className="text-sm text-center text-destructive">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-muted/30">
          <Button variant="ghost" onClick={onClose} disabled={uploading}>
            Cancel
          </Button>
          {preview && (
            <Button onClick={onClose} disabled={uploading}>
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


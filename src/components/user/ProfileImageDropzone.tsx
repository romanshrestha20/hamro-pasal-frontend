import Image from "next/image";
import { useDropzone } from "react-dropzone";

interface ProfileImageDropzoneProps {
  className?: string;
  uploading: boolean;
  error?: string | null;
  previewUrl?: string | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const ProfileImageDropzone = ({
  className,
  uploading,
  previewUrl,
  onFileSelect,
}: ProfileImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({

    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        // Create a mock change event so hook works normally
        const file = acceptedFiles[0];
        const mockEvent = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onFileSelect(mockEvent);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${className ?? ""}
      `}
    >
      <input {...getInputProps()} />

      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Profile preview"
          className="object-cover w-32 h-32 mx-auto rounded-full"
        />
      ) : (
        <p className="text-gray-500">
          {isDragActive ? "Drop your image here..." : "Drag & drop or click to upload"}
        </p>
      )}

      {uploading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
    </div>
  );
};

export default ProfileImageDropzone;
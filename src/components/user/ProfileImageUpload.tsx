interface ProfileImageUploadProps {
  uploading: boolean;
  error?: string | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFormats?: string;
  disabled?: boolean;
}

const ProfileImageUpload = ({
  uploading,
  error,
  onFileSelect,
  acceptedFormats = "image/*",
  disabled = false,
}: ProfileImageUploadProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className={`inline-flex items-center px-3 py-1.5 rounded-md bg-gray-800 text-white text-sm cursor-pointer hover:bg-gray-700 transition-colors ${
          uploading || disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <input
          type="file"
          accept={acceptedFormats}
          className="hidden"
          onChange={onFileSelect}
          disabled={uploading || disabled}
        />
        {uploading ? "Uploading..." : "Change photo"}
      </label>
      {error && (
        <span className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default ProfileImageUpload;

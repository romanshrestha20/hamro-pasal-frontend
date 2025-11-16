"use client";
import React from "react";

interface TagsListProps {
  tags?: string[];
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

import React from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

interface BlogSectionProps {
  title: string;
  imageUrl: string | null;
  date: Date;
  content: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  title,
  imageUrl,
  date,
  content,
}) => {
  const cleanHTML = DOMPurify.sanitize(content);

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">
      <article className="prose prose-invert min-w-full">
        <div>
          <div className="flex flex-col gap-1">
            <h1 className="mb-0">{title}</h1>
            <span className="">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={500}
              className="w-full rounded-sm"
            />
          )}
        </div>

        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
      </article>
    </div>
  );
};

export default BlogSection;

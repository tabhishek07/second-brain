import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/Share";

interface CardProps {
  title: string;
  link: string;
  type: string;
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-md max-w-96 max-h-80">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="text-gray-500 ">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex pr-1 items-center gap-2 text-gray-500">
          <a href={link}>
            <ShareIcon />
          </a>
          <DeleteIcon />
        </div>
      </div>
      <div className="max-w-full pt-3 rounded-md">
        {type === "youtube" && (
          <iframe
            className="w-full rounded-md"
            src={link.replace("watch", "embed")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <div className="w-full overflow-y-auto max-h-64 no-scrollbar">
            <blockquote
              className="twitter-tweet"
              data-width="100%" // This tells Twitter to try and fill the container
            >
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}

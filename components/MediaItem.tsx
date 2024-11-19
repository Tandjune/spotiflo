"use client"

import { Audio } from "react-loader-spinner";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
    onClick: (id: string) => void;
    data: Song;
    className?: string
}

const MediaItem: React.FC<MediaItemProps> = ({
    onClick,
    data,
    className
}) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const isPlaying = (player.activeId === data.id) && !player.paused;

    const handleclick = () => {
        if (onClick) {
            return onClick(data.id);
        }

    }
    return (
        <div
            onClick={handleclick}
            className="
              flex
              items-center
              gap-x-3
              cursor-pointer
              hover:bg-neutral-800/50
              w-full
              p-2
              rounded-md
              relative
            "
        >
            <div
                className="
                  relative
                  rounded-md
                  min-h-[48px]
                  min-w-[48px]
                  overflow-hidden
                "
            >
                <Image
                    fill
                    src={imageUrl || '/images/liked.pmg'}
                    alt="Media Item"
                    className="object-cover"
                />
            </div>
            <div
                className="
                  flex
                  flex-col
                  gap-y-1
                  overflow-hidden
                "
            >
                <p className=" text-white truncate">
                    {data.title}
                </p>
                <p className=" text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
            <div className={twMerge(` absolute bottom-[7px] right-3`, className)}>
                <Audio height="30" width="10" color="#22c55e" visible={isPlaying} />
            </div>
        </div>
    );
}

export default MediaItem;
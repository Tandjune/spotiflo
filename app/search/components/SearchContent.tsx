"use client"

import { useUser } from "@/hooks/useUser";
import useOnplay from "@/hooks/useOnPlay";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "../../../components/LikeButton";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {

    const onPlay = useOnplay(songs);

    const { user } = useUser(); //modified

    if (!user || songs.length == 0) {
        return (
            <div
                className="
                  flex
                  flex-col
                  gap-y-2
                  w-full
                  px-6
                  text-neutral-400
                "
            >
                No songs found.
            </div>
        );
    }
    return (
        <div className=" flex flex-col gap-y-2 w-full px-6">
            {songs.map((item) =>
                <div
                    key={item.id}
                    className=" flex items-center gap-y-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={item}
                        />
                    </div>
                    <LikeButton songId={item.id} />
                </div>
            )}
        </div>
    );
}

export default SearchContent;
"use client"

import { useUser } from "@/hooks/useUser";
import useOnplay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {

    const onPlay = useOnplay(songs);

    const { user } = useUser();

    //modified

    // useEffect(() => {
    //     if(!isLoading && !user){
    //         router.replace('/');
    //     }
    // }, [isLoading, user, router])

    if (!user || songs.length === 0) { //modified
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
                No liked songs.
            </div>
        );
    }
    return (
        <div
            className="
              flex
              flex-col
              gap-y-2
              w-full
              p-6
            "
        >
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="
                      flex
                      items-center
                      gap-x-4
                      w-full
                    "
                >
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default LikedContent;
"use client"
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [Volume, setVolume] = useState(0.3);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = Volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {

        if (player.paused) {
            return;
        }

        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {

        if (player.paused) {
            return;
        }

        const length = player.ids.length;

        if (length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[length - 1]);
        }

        player.setId(previousSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: Volume,
            onplay: () => {
                setIsPlaying(true);
                player.setPaused(false);
            },
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => {
                setIsPlaying(false);
                player.setPaused(true);
            },
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        if (Volume === 0) {
            setVolume(0.5);
        } else {
            setVolume(0);
        }
    }
    return (
        <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:flex
              h-full
              justify-between
            "
        >
            <div
                className="
                  flex
                  max-w-[800px]
                  justify-start
                "
            >
                <div
                    className="
                      flex
                      items-center
                      gap-x-4
                    "
                >
                    <MediaItem data={song} onClick={() => { }} className=" hidden" />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div
                className="
                  h-full
                  flex
                  justify-center
                  items-center
                  w-full
                  max-w-[722px]
                  gap-x-6
                  pt-4
                "
            >
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className={twMerge(`
                      text-neutral-400
                      cursor-pointer
                      transition
                        `, !player.paused && "hover:text-white")}
                />
                <div
                    onClick={handlePlay}
                    className="
                      flex
                      items-center
                      justify-center
                      h-10
                      w-10
                      rounded-full
                      bg-white
                      p-1
                      cursor-pointer
                    "
                >
                    <Icon size={30} className=" text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className={twMerge(`
                      text-neutral-400
                      cursor-pointer
                      transition
                        `, !player.paused && "hover:text-white")}
                />
            </div>

            <div
                className="
                  hidden
                  sm:flex
                  justify-start
                  md:justify-end
                  h-full
                  max-w-[300px]
                "
            >
                <div
                    className="
                      flex
                      items-center
                      gap-x-2
                      py-4
                      w-[120px]
                    "
                >
                    <VolumeIcon
                        onClick={toggleMute}
                        className=" cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={Volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnplay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
    player.setPaused(false);
  };

  return onPlay;
};

export default useOnplay;

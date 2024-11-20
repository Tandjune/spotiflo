"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";
import { useState } from "react";
import { Song } from "@/types";
import Library from "./Library";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
    userSongs?: Song[];
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
    userSongs
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const [showLibrary, setShowLibrary] = useState(false);

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const player = usePlayer()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        player.reset();
        router.refresh();
        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!')
        }
    }


    return (
        <div
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
                `, className)}
        >
            <div className="
             w-full
             mb-4
             flex
             items-center
             justify-between
            ">
                <div
                    className="
                     hidden
                     md:flex
                     gap-x-2
                     items-center
                ">
                    <button
                        onClick={() => router.back()}
                        className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretLeft size={35} className=" text-white" />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretRight size={35} className=" text-white" />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        onClick={() => router.push('/')}
                        className="
                            flex
                            justify-center
                            items-center
                            rounded-full
                            p-2
                            bg-white
                            hover:opacity-75
                            transition
                            "
                    >
                        <HiHome size={20} className=" text-black" />
                    </button>
                    <button
                        onClick={() => setShowLibrary(!showLibrary)}
                        className="
                            flex
                            justify-center
                            items-center
                            rounded-full
                            p-2
                            bg-white
                            hover:opacity-75
                            transition
                            "
                    >
                        <TbPlaylist size={20} className=" text-black" />
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                        className="
                            flex
                            justify-center
                            items-center
                            rounded-full
                            p-2
                            bg-white
                            hover:opacity-75
                            transition
                            "
                    >
                        <BiSearch size={20} className=" text-black" />
                    </button>
                </div>
                <div
                    className="
                            flex
                            justify-between
                            items-center
                            gap-x-4
                        "
                >
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className=" bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                        </div>
                    ) :
                        <>
                            <div>
                                <Button
                                    onClick={() => authModal.onOpen("sign_up")}
                                    className=" 
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                "
                                >
                                    Sign up
                                </Button>

                            </div>
                            <div>

                                <Button
                                    onClick={() => authModal.onOpen("sign_in")}
                                    className=" 
                                    bg-white
                                    px-6
                                    py-2
                                "
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="flex-col">
                <div className="md:hidden bg-neutral-900 mb-4 rounded-xl max-h-[400px] overflow-auto">
                    {showLibrary ? (<Library songs={userSongs ?? []} />) : <></>}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Header;
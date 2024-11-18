"use client"
import { ColorRing } from "react-loader-spinner";

import Box from "@/components/Box";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                colors={['#22c55e', '#22c55e', '#22c55e', '#22c55e', '#22c55e']}
            />
        </Box>
    );
}

export default Loading;
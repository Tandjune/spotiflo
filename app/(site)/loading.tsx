"use client"
import { Oval } from "react-loader-spinner";

import Box from "@/components/Box";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#22c55e"
            />
        </Box>
    );
}

export default Loading;
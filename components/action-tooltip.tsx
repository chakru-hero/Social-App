"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"

interface ActionTooltipProps{
    lable : string;
    children : React.ReactNode;
    side? : "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
    lable,
    children,
    align,
    side
}: ActionTooltipProps) => {
    return ( 
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">
                        {lable.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
     );
}
 

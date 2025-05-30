



// import React from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";

// type MenuItem = {
//     label: string;
//     icon?: React.ReactNode;
//     iconClassName?: string; // ← new prop for icon styling
//     onClick?: () => void;
// };

// type Props = {
//     triggerLabel?: React.ReactNode | string;
//     label?: string;
//     items: MenuItem[];
//     menuClassName?: string;
//     menuItemContainer?: string;
// };

// const Menu = ({
//     triggerLabel,
//     label,
//     items,
//     menuClassName,
//     menuItemContainer,
// }: Props) => {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer">
//                 {triggerLabel}
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className={menuClassName}>
//                 {label && (
//                     <>
//                         <DropdownMenuLabel>{label}</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                     </>
//                 )}
//                 {items.map((item, index) => (
//                     <React.Fragment key={index}>
//                         <DropdownMenuItem
//                             onClick={item.onClick}
//                             // className={menuItemContainer}
//                             // className='hover:bg-red-400'
//                             className={cn('hover:bg-red-400')}
//                         >
//                             {item.icon && (
//                                 <span className={`mr-2 ${item.iconClassName || ""}`}>
//                                     {item.icon}
//                                 </span>
//                             )}
//                             {item.label}
//                         </DropdownMenuItem>
//                         {/* Optional: Add separator between items if needed */}
//                         {/* <DropdownMenuSeparator /> */}
//                     </React.Fragment>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// };

// export default Menu;






// import React from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";

// type MenuItem = {
//     label: string;
//     icon?: React.ReactNode;
//     iconClassName?: string;
//     onClick?: () => void;
// };

// type Props = {
//     triggerLabel?: React.ReactNode | string;
//     label?: string;
//     items: MenuItem[];
//     menuClassName?: string;
//     menuItemClassName?: string; // Use a more specific name
// };

// const Menu = ({
//     triggerLabel,
//     label,
//     items,
//     menuClassName,
//     menuItemClassName,
// }: Props) => {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer">
//                 {triggerLabel}
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className={menuClassName}>
//                 {label && (
//                     <>
//                         <DropdownMenuLabel>{label}</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                     </>
//                 )}
//                 {items.map((item, index) => (
//                     <React.Fragment key={index}>
//                         <DropdownMenuItem
//                             onClick={() => item.onClick?.()}
//                             className={cn(

//                                 menuItemClassName
//                             )}
//                         >
//                             {item.icon && (
//                                 <span className={cn("mr-2", item.iconClassName)}>
//                                     {item.icon}
//                                 </span>
//                             )}
//                             {item.label}
//                         </DropdownMenuItem>
//                         {index < items.length - 1 && <DropdownMenuSeparator />}
//                     </React.Fragment>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// };

// export default Menu;




import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type MenuItem = {
    label: string;
    icon?: React.ReactNode;
    iconClassName?: string;
    onClick?: (profileId?: string) => void; // Make profileId optional here
};

type Props = {
    triggerLabel?: React.ReactNode | string;
    label?: string;
    items: MenuItem[];
    menuClassName?: string;
    menuItemClassName?: string;
    profileId?: string; // Add profileId prop
};

const Menu = ({
    triggerLabel,
    label,
    items,
    menuClassName,
    menuItemClassName,
    profileId, // Receive profileId
}: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                {triggerLabel}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={menuClassName}>
                {label && (
                    <>
                        <DropdownMenuLabel>{label}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <DropdownMenuItem
                            onClick={() => item.onClick?.(profileId)}
                            className={cn(
                                menuItemClassName
                            )}
                        >
                            {item.icon && (
                                <span className={cn("mr-2", item.iconClassName)}>
                                    {item.icon}
                                </span>
                            )}
                            {item.label}
                        </DropdownMenuItem>
                        {index < items.length - 1 && <DropdownMenuSeparator />}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Menu;
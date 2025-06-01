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
    onClick?: (id?: string) => void;
};

type Props = {
    triggerLabel?: React.ReactNode | string;
    label?: string;
    items: MenuItem[];
    menuClassName?: string;
    menuItemClassName?: string;
    id?: string;
};

const Menu = ({
    triggerLabel,
    label,
    items,
    menuClassName,
    menuItemClassName,
    id,
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
                    <React.Fragment key={`${item.label}-${id ?? index}`}>
                        <DropdownMenuItem
                            onClick={() => item.onClick?.(id)}
                            className={cn(menuItemClassName)}
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

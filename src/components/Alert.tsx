import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

type AlertProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    cancelText?: string
    actionText?: string
    onConfirm?: () => void
}

const Alert: React.FC<AlertProps> = ({
    open,
    onOpenChange,
    title,
    description,
    cancelText = "Cancel",
    actionText = "Continue",
    onConfirm,
}) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onConfirm?.()
                            onOpenChange(false)
                        }}
                    >
                        {actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Alert

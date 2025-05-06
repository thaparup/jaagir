'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const ProductPage = () => {
    useEffect(() => {
        // This will run only once after component mounts
        toast('Product page')
    }, [])

    return (
        <div>
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Show Toast
            </Button>

        </div>
    )
}

export default ProductPage
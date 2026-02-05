'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DarkMode() {
    const router = useRouter()

    useEffect(() => {
        const mode = ('; ' + document.cookie).split(`; mode=`).pop()?.split(';')[0] || ''
        if (mode == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
        }
    }, [])

    return (
        <span onClick={() => {
            const cookie = ('; ' + document.cookie).split(`; mode=`).pop()?.split(';')[0]
            if (cookie == 'light') {
                document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                router.refresh()
            } else {
                document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                router.refresh()
            }
        }}>🌙</span>
    )
}
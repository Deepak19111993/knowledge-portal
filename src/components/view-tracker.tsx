"use client";

import { useEffect, useRef } from "react";

export function ViewTracker({ id }: { id: number }) {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;
        hasTracked.current = true;

        fetch(`/api/blogs/${id}/view`, { method: "POST" }).catch(console.error);
    }, [id]);

    return null;
}

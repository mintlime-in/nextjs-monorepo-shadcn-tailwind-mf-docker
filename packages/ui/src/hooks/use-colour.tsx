"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { Button } from "@repo/ui/components/ui/button"


export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ColorModeIcon() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Prevent SSR mismatch

    const toggleColorMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const icon = resolvedTheme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    );
    return <Button variant="outline" size="icon" onClick={toggleColorMode}>{icon}</Button>;
}

export function ColorModeDropdown() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border px-1 py-1">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
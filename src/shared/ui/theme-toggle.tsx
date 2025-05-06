import {Moon, Sun} from "lucide-react";
import {Button} from "./button.tsx";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean>(false)

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setIsDark(isDark);
    }, []);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full cursor-pointer"
        >
            {isDark ? (
                <Sun className="h-5 w-5"/>
            ) : (
                <Moon className="h-5 w-5"/>
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

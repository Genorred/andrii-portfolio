import {Moon, Sun} from "lucide-react";
import {Button} from "./button.tsx";
import {useEffect} from "react";
import {atom} from "nanostores";
import {useStore} from "@nanostores/react";


export const isDark = atom(false);
export default function ThemeToggle() {
    const $isDark = useStore(isDark);
    useEffect(() => {
        isDark.set(document.documentElement.classList.contains("dark"));
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        isDark.set(!document.documentElement.classList.contains("dark"));
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full cursor-pointer"
        >
            {$isDark ? (
                <Sun className="h-5 w-5"/>
            ) : (
                <Moon className="h-5 w-5"/>
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

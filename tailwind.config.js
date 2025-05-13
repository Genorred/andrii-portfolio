/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            screens: {
                // задаёт медиавыражение @media (max-width: 1080px)
                'max-1080': { max: '1080px' },
            },
        },
    },
    // ...другие опции...
}

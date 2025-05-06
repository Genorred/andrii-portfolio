import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const blog = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/library"}),
    schema: z.object({
        name: z.string(),
        // type: z.enum(['Space Probe', 'Mars Rover', 'Comet Lander']),
        // launch_date: z.date(),
        // status: z.enum(['Active', 'Inactive', 'Decommissioned']),
        // destination: z.string(),
        // operator: z.string(),
        // notable_discoveries: z.array(z.string()),
    }),
});

export const collections = {blog};
import { readFileSync } from 'fs';

const cache: { [path: string]: string } = {}

export default function icon(icon: string, filled = false){

    const path = `${filled ? 'filled' : 'outline'}/${icon}`;
    
    if(path in cache) return cache[path];
    
    const svg = readFileSync(`node_modules/@tabler/icons/icons/${path}.svg`, 'utf-8');
    cache[path] = svg;
    return svg;
}
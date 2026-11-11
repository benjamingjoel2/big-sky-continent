import type { ImageMetadata } from 'astro';
import photos from '../data/photos.json';

export type PhotoMeta = {
  file: string; page: string; author: string; license: string; license_url?: string; caption: string;
};
const assets = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export function photo(key: string): { image: ImageMetadata; meta: PhotoMeta; key: string } {
  const meta = (photos as Record<string, PhotoMeta>)[key];
  const mod = assets[`../assets/photos/${key}.jpg`];
  if (!meta || !mod) throw new Error(`Missing photo "${key}" (add it to src/data/photos.json and src/assets/photos/)`);
  return { image: mod.default, meta, key };
}

export function allPhotos() {
  return Object.keys(photos).sort().map((k) => photo(k));
}

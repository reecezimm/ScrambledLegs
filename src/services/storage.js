// Firebase Storage upload helpers.
//
// Two image kinds: 'rideLeader' (square 400x400 max) and 'banner' (1600x800 max).
// We resize client-side via a canvas before upload to keep the bucket tiny.

import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

export const MAX_RIDE_LEADER_BYTES = 2 * 1024 * 1024; // 2MB
export const MAX_BANNER_BYTES = 5 * 1024 * 1024;     // 5MB

const RIDE_LEADER_DIMS = { w: 400, h: 400, mode: 'cover' };
const BANNER_DIMS = { w: 1600, h: 800, mode: 'fit' };

function extFromFile(file) {
  const fromName = (file.name || '').split('.').pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  return 'jpg';
}

// Validates and rejects unsupported files. Returns null on OK, or a string
// error message on failure.
export function validateImage(file, kind) {
  if (!file) return 'No file selected';
  if (!file.type || !file.type.startsWith('image/')) {
    return 'File must be an image';
  }
  const max = kind === 'banner' ? MAX_BANNER_BYTES : MAX_RIDE_LEADER_BYTES;
  if (file.size > max) {
    return `Image is too large (max ${(max / 1024 / 1024).toFixed(0)}MB)`;
  }
  return null;
}

// Resize the image to fit within targetW x targetH. Returns a Blob.
function resizeImage(file, target) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const { w: tw, h: th, mode } = target;
      const sw = img.naturalWidth;
      const sh = img.naturalHeight;
      let dw, dh, sx = 0, sy = 0, swCrop = sw, shCrop = sh;
      if (mode === 'cover') {
        // Crop to a centered square that fills tw x th.
        const srcRatio = sw / sh;
        const dstRatio = tw / th;
        if (srcRatio > dstRatio) {
          // Source is wider — crop sides.
          shCrop = sh;
          swCrop = sh * dstRatio;
          sx = (sw - swCrop) / 2;
        } else {
          swCrop = sw;
          shCrop = sw / dstRatio;
          sy = (sh - shCrop) / 2;
        }
        dw = tw;
        dh = th;
      } else {
        // 'fit' — preserve aspect, scale down to fit inside tw x th, no upscale.
        const ratio = Math.min(tw / sw, th / sh, 1);
        dw = Math.round(sw * ratio);
        dh = Math.round(sh * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = dw;
      canvas.height = dh;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, sx, sy, swCrop, shCrop, 0, 0, dw, dh);
      const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const quality = outType === 'image/jpeg' ? 0.86 : undefined;
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            reject(new Error('Failed to encode resized image'));
            return;
          }
          resolve(blob);
        },
        outType,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}

// Upload an image to Firebase Storage.
//   kind: 'rideLeader' | 'banner'
//   eventId: push key — used in the storage path
//   onProgress(pct: 0..100): progress callback (optional)
// Resolves with the public download URL. Throws on error.
export async function uploadEventImage({ kind, eventId, file, onProgress }) {
  const err = validateImage(file, kind);
  if (err) throw new Error(err);

  const dims = kind === 'banner' ? BANNER_DIMS : RIDE_LEADER_DIMS;
  let blob;
  try {
    blob = await resizeImage(file, dims);
  } catch (e) {
    // Fall back to original bytes if resize fails for some reason.
    blob = file;
  }

  const folder = kind === 'banner' ? 'banners' : 'rideLeaders';
  const ext = blob.type === 'image/png' ? 'png' : (blob.type === 'image/jpeg' ? 'jpg' : extFromFile(file));
  const path = `${folder}/${eventId}.${ext}`;
  const r = storageRef(storage, path);

  const task = uploadBytesResumable(r, blob, {
    contentType: blob.type || file.type || 'image/jpeg',
  });

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap) => {
        if (onProgress && snap.totalBytes) {
          onProgress((snap.bytesTransferred / snap.totalBytes) * 100);
        }
      },
      (err) => reject(err),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

// Best-effort delete (used when an admin clears a previously-uploaded image).
// Swallows errors — failing to delete should never block the form.
export async function deleteEventImage({ kind, eventId, ext }) {
  try {
    const folder = kind === 'banner' ? 'banners' : 'rideLeaders';
    const r = storageRef(storage, `${folder}/${eventId}.${ext || 'jpg'}`);
    await deleteObject(r);
  } catch (e) {
    // ignore
  }
}

export function displayImage(imgUrl: string): string {
    if (!imgUrl || imgUrl.trim() === '...') {
        return '/assets/no_image.jpg'; // fallback image
    }
    return imgUrl;
}
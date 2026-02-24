import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check if it's an image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: 'Invalid file type. Only images and videos are allowed.' }, { status: 400 });
    }

    // Validate image types
    const allowedImageTypes = [
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
      'image/x-icon',
      'image/heic',
      'image/heif'
    ];
    
    // Validate video types
    const allowedVideoTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv'
    ];

    if (isImage && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid image type. Allowed: JPEG, PNG, GIF, WebP, SVG, BMP, TIFF, ICO, HEIC, HEIF' }, { status: 400 });
    }

    if (isVideo && !allowedVideoTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid video type. Allowed: MP4, WebM, OGG, MOV, AVI, WMV' }, { status: 400 });
    }

    // Validate file size
    // Images: max 10MB, Videos: max 100MB
    const maxImageSize = 10 * 1024 * 1024; // 10MB
    const maxVideoSize = 100 * 1024 * 1024; // 100MB
    const maxSize = isVideo ? maxVideoSize : maxImageSize;
    
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: isVideo ? 'Video too large. Maximum size is 100MB.' : 'Image too large. Maximum size is 10MB.' 
      }, { status: 400 });
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get file extension
    const ext = file.name.split('.').pop();
    const timestamp = Date.now();
    
    // Use different prefixes for images and videos
    const prefix = isVideo ? 'video' : 'property';
    const filename = `${prefix}_${timestamp}.${ext}`;
    
    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return the URL path
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      filename: filename,
      type: isVideo ? 'video' : 'image'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

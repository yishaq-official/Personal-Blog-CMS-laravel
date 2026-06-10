<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessImageUpload implements ShouldQueue
{
    use Queueable;

    protected \App\Models\Media $media;
    protected string $tempPath;

    /**
     * Create a new job instance.
     */
    public function __construct(\App\Models\Media $media, string $tempPath)
    {
        $this->media = $media;
        $this->tempPath = $tempPath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $fullTempPath = storage_path('app/' . $this->tempPath);

            // Process image
            $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
            $image = $manager->read($fullTempPath);
            
            // Scale down if width is greater than 1920px
            $image->scaleDown(width: 1920);
            
            // Convert to webp with 80% quality
            $encoded = $image->toWebp(80);
            
            $filename = uniqid() . '.webp';
            $path = 'media/' . $filename;

            // Store on disk
            \Illuminate\Support\Facades\Storage::disk('public')->put($path, $encoded->toString());

            // Update DB record
            $this->media->update([
                'filename' => $filename,
                'mime_type' => 'image/webp',
                'size' => strlen($encoded->toString()),
                'path' => $path,
                'url' => \Illuminate\Support\Facades\Storage::url($path),
                'status' => 'ready',
            ]);

            // Delete temp file
            \Illuminate\Support\Facades\Storage::delete($this->tempPath);
        } catch (\Exception $e) {
            $this->media->update(['status' => 'failed']);
            \Illuminate\Support\Facades\Log::error('Image processing failed: ' . $e->getMessage());
            throw $e;
        }
    }
}

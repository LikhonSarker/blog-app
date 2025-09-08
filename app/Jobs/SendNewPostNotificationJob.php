<?php

namespace App\Jobs;

use App\Mail\NewPostNotification;
use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewPostNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $postId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $postId)
    {
        $this->postId = $postId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $post = Post::with('user')->find($this->postId);

        if (!$post) {
            return;
        }

        // Example: send to admin email
        $adminEmail = config('mail.admin_email', null);
        if ($adminEmail) {
            Mail::to($adminEmail)->send(new NewPostNotification($post));
        }
    }
}

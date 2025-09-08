<?php

namespace App\Mail;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewPostNotification extends Mailable
{
    use Queueable, SerializesModels;

    public Post $post;

    /**
     * Create a new message instance.
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('New Blog Post: ' . $this->post->title)
        ->view('emails.new_post')
        ->with([
            'post' => $this->post,
        ]);
    }
}

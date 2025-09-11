<?php

namespace App\Http\Controllers;

use App\Events\PostProcessed;
use App\Http\Requests\Api\PostRequest;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Jobs\SendNewPostNotificationJob;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::select('id','body','title','published','user_id')
                    ->with('user:id,name,email')
                    ->where('user_id', $request->user()->id)
                    ->get()
                    ->makeHidden('user_id');
        
        return response()->json($posts);
    }

    public function create(): Response
    {
        return Inertia::render('Posts/Create');
    }

    public function store(PostRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $post = Post::create($data);

        PostProcessed::dispatch($request->title);

        return response()->json([
            'message' => 'Post created',
            'post' => $post,
        ], 201);
    }
    
    public function edit($id): Response  {

        $post = Post::findOrFail($id);

        return Inertia::render('Posts/Edit', ["post"=> $post]);
    }

    public function update(PostRequest $request, Post $post): JsonResponse
    {
        if ($request->user()->id !== $post->user_id) {
           return response()->json(['message' => 'Forbidden'], 403);
        }

        $post->update($request->validated());

        return response()->json([
            'message' => 'Post updated',
            'post' => $post,
        ]);
    }

    public function destroy(Request $request, Post $post): JsonResponse
    {
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }
}

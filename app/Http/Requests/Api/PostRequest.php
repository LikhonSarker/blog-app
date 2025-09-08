<?php

namespace App\Http\Requests\Api;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user() !== null;
    }

    public function rules()
    {
        return [
        'title' => 'required|string|max:255',
        'body' => 'required|string',
        'published' => 'sometimes|boolean',
        ];
    }
}
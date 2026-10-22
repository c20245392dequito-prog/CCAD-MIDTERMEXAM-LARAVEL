<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFurnitureModelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:furniture_models,name',
            'description' => 'nullable|string',
            'base_cost' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter the furniture model name.',
            'name.unique' => 'This furniture model already exists.',
            'name.max' => 'The furniture model name cannot exceed 255 characters.',
            'description.string' => 'The description must be text.',
            'base_cost.required' => 'Please enter the base cost.',
            'base_cost.numeric' => 'The base cost must be a valid number.',
            'base_cost.min' => 'The base cost cannot be negative.',
        ];
    }
}

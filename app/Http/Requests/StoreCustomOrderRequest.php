<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'furniture_model_id' => 'required|exists:furniture_models,id',
            'wood_type_id' => 'required|exists:wood_types,id',
            'finish_id' => 'required|exists:finishes,id',
            'custom_dimensions' => 'required|string|max:1000',
            'customization_fee' => 'required|numeric|min:0',
            'deposit_paid' => 'required|numeric|min:0',
            'manufacturing_status' => [
                'sometimes',
                Rule::in([
                    'Pending',
                    'In Production',
                    'Completed',
                    'Cancelled',
                ]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'client_name.required' => 'Please enter the client name.',
            'contact_email.required' => 'Please enter the contact email.',
            'contact_email.email' => 'Please enter a valid email address.',
            'furniture_model_id.required' => 'Please select a furniture model.',
            'furniture_model_id.exists' => 'The selected furniture model does not exist.',
            'wood_type_id.required' => 'Please select a wood type.',
            'wood_type_id.exists' => 'The selected wood type does not exist.',
            'finish_id.required' => 'Please select a finish.',
            'finish_id.exists' => 'The selected finish does not exist.',
            'custom_dimensions.required' => 'Please enter the custom dimensions.',
            'customization_fee.required' => 'Please enter the customization fee.',
            'customization_fee.min' => 'The customization fee cannot be negative.',
            'deposit_paid.required' => 'Please enter the deposit amount.',
            'deposit_paid.min' => 'The deposit cannot be negative.',
            'manufacturing_status.in' => 'Please select a valid manufacturing status.',
        ];
    }
}

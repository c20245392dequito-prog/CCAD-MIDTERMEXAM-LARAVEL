import { Head, Link, useForm } from '@inertiajs/react';

type FurnitureModel = {
    id: number;
    name: string;
    base_cost: number;
};

type WoodType = {
    id: number;
    name: string;
};

type Finish = {
    id: number;
    color_name: string;
};

type Props = {
    furniture_models: FurnitureModel[];
    wood_types: WoodType[];
    finishes: Finish[];
};

export default function CreateCustomOrder({
    furniture_models,
    wood_types,
    finishes,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        client_name: '',
        contact_email: '',
        furniture_model_id: '',
        wood_type_id: '',
        finish_id: '',
        custom_dimensions: '',
        customization_fee: '0',
        deposit_paid: '0',
        manufacturing_status: 'Pending',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/custom-orders');
    }

    return (
        <>
            <Head title="Create Custom Order" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Create Custom Order
                        </h1>

                        <Link
                            href="/custom-orders"
                            className="text-blue-600 hover:underline"
                        >
                            Back to Orders
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-1 block font-medium">
                                Client Name
                            </label>
                            <input
                                className="w-full rounded border p-2"
                                value={data.client_name}
                                onChange={(e) =>
                                    setData('client_name', e.target.value)
                                }
                            />
                            {errors.client_name && (
                                <p className="text-sm text-red-600">
                                    {errors.client_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                className="w-full rounded border p-2"
                                value={data.contact_email}
                                onChange={(e) =>
                                    setData('contact_email', e.target.value)
                                }
                            />
                            {errors.contact_email && (
                                <p className="text-sm text-red-600">
                                    {errors.contact_email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Furniture Model
                            </label>
                            <select
                                className="w-full rounded border p-2"
                                value={data.furniture_model_id}
                                onChange={(e) =>
                                    setData('furniture_model_id', e.target.value)
                                }
                            >
                                <option value="">Select furniture model</option>
                                {furniture_models.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.name} — ₱{Number(model.base_cost).toLocaleString()}
                                    </option>
                                ))}
                            </select>
                            {errors.furniture_model_id && (
                                <p className="text-sm text-red-600">
                                    {errors.furniture_model_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Wood Type
                            </label>
                            <select
                                className="w-full rounded border p-2"
                                value={data.wood_type_id}
                                onChange={(e) =>
                                    setData('wood_type_id', e.target.value)
                                }
                            >
                                <option value="">Select wood type</option>
                                {wood_types.map((wood) => (
                                    <option key={wood.id} value={wood.id}>
                                        {wood.name}
                                    </option>
                                ))}
                            </select>
                            {errors.wood_type_id && (
                                <p className="text-sm text-red-600">
                                    {errors.wood_type_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Finish Color
                            </label>
                            <select
                                className="w-full rounded border p-2"
                                value={data.finish_id}
                                onChange={(e) =>
                                    setData('finish_id', e.target.value)
                                }
                            >
                                <option value="">Select finish</option>
                                {finishes.map((finish) => (
                                    <option key={finish.id} value={finish.id}>
                                        {finish.color_name}
                                    </option>
                                ))}
                            </select>
                            {errors.finish_id && (
                                <p className="text-sm text-red-600">
                                    {errors.finish_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Custom Dimensions
                            </label>
                            <input
                                placeholder="Example: 120cm x 80cm x 75cm"
                                className="w-full rounded border p-2"
                                value={data.custom_dimensions}
                                onChange={(e) =>
                                    setData('custom_dimensions', e.target.value)
                                }
                            />
                            {errors.custom_dimensions && (
                                <p className="text-sm text-red-600">
                                    {errors.custom_dimensions}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Customization Fee (₱)
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="w-full rounded border p-2"
                                value={data.customization_fee}
                                onChange={(e) =>
                                    setData('customization_fee', e.target.value)
                                }
                            />
                            {errors.customization_fee && (
                                <p className="text-sm text-red-600">
                                    {errors.customization_fee}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Deposit Paid (₱)
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="w-full rounded border p-2"
                                value={data.deposit_paid}
                                onChange={(e) =>
                                    setData('deposit_paid', e.target.value)
                                }
                            />
                            {errors.deposit_paid && (
                                <p className="text-sm text-red-600">
                                    {errors.deposit_paid}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Custom Order'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
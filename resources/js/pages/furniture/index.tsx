import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type FurnitureModel = {
    id: number;
    name: string;
    description: string | null;
    base_cost: number | string;
};

type Props = {
    furnitureModels: {
        data: FurnitureModel[];
    };
};

export default function FurnitureModelsIndex({ furnitureModels }: Props) {
    return (
        <AppLayout>
            <Head title="Furniture Models" />

            <div className="min-h-screen bg-stone-100 p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-stone-900">
                                Furniture Models
                            </h1>
                            <p className="mt-2 text-stone-500">
                                Manage your furniture inventory.
                            </p>
                        </div>

                        <Link
                            href="/dashboard"
                            className="rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white hover:bg-amber-700"
                        >
                            Back to Dashboard
                        </Link>
                    </div>

                    <div className="overflow-x-auto rounded-xl bg-white shadow">
                        <table className="w-full text-left">
                            <thead className="bg-stone-200">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Furniture Model</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4">Base Cost</th>
                                </tr>
                            </thead>

                            <tbody>
                                {furnitureModels.data.length > 0 ? (
                                    furnitureModels.data.map((model) => (
                                        <tr
                                            key={model.id}
                                            className="border-t hover:bg-stone-50"
                                        >
                                            <td className="p-4">{model.id}</td>
                                            <td className="p-4 font-semibold">
                                                {model.name}
                                            </td>
                                            <td className="p-4">
                                                {model.description || '—'}
                                            </td>
                                            <td className="p-4">
                                                ₱{Number(model.base_cost).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-8 text-center text-stone-500"
                                        >
                                            No furniture models found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
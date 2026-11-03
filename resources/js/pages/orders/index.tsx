import { Head, Link } from '@inertiajs/react';

type Order = {
    id: number;
    client_name: string;
    contact_email: string;
    total_price: number;
    manufacturing_status: string;
    furniture_model?: { name: string };
    wood_type?: { name: string };
    finish?: { color_name: string };
};

type Props = {
    orders: {
        data: Order[];
    };
};

export default function CustomOrdersIndex({ orders }: Props) {
    return (
        <>
            <Head title="Custom Orders" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Custom Orders
                            </h1>
                            <p className="text-gray-600">
                                View and manage customer furniture orders.
                            </p>
                        </div>

                        <Link
                            href="/custom-orders/create"
                            className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            + Create Custom Order
                        </Link>
                    </div>

                    <div className="overflow-x-auto rounded-xl bg-white shadow">
                        <table className="w-full text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Client</th>
                                    <th className="p-4">Furniture</th>
                                    <th className="p-4">Wood</th>
                                    <th className="p-4">Finish</th>
                                    <th className="p-4">Total Price</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.data.length > 0 ? (
                                    orders.data.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-t hover:bg-gray-50"
                                        >
                                            <td className="p-4">#{order.id}</td>
                                            <td className="p-4">
                                                <div className="font-medium">
                                                    {order.client_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.contact_email}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {order.furniture_model?.name ?? '—'}
                                            </td>
                                            <td className="p-4">
                                                {order.wood_type?.name ?? '—'}
                                            </td>
                                            <td className="p-4">
                                                {order.finish?.color_name ?? '—'}
                                            </td>
                                            <td className="p-4">
                                                ₱{Number(order.total_price).toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                                                    {order.manufacturing_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="p-8 text-center text-gray-500"
                                        >
                                            No custom orders yet. Click Create
                                            Custom Order to add one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <Link
                            href="/dashboard"
                            className="text-blue-600 hover:underline"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
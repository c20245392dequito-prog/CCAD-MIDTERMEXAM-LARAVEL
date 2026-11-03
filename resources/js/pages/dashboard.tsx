import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

type Order = {
    id: number;
    client_name: string;
    total_price: string;
    deposit_paid: string;
    manufacturing_status: string;
    created_at: string;
    furniture_model?: {
        name: string;
    };
};

type Props = {
    totalOrders: number;
    pendingOrders: number;
    productionOrders: number;
    completedOrders: number;
    totalFurniture: number;
    recentOrders: Order[];
};

const money = (value: string | number) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 2,
    }).format(Number(value));

const statusStyle = (status: string) => {
    switch (status) {
        case 'In Production':
            return 'bg-blue-100 text-blue-700';
        case 'Completed':
            return 'bg-green-100 text-green-700';
        case 'Cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-amber-100 text-amber-700';
    }
};

export default function Dashboard({
    totalOrders,
    pendingOrders,
    productionOrders,
    completedOrders,
    totalFurniture,
    recentOrders,
}: Props) {
    return (
        <AppLayout>
            <Head title="Furniture Dashboard" />

            <div className="min-h-screen bg-stone-100 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* Header */}
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Manufacturing Management
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-stone-900">
                            Furniture Dashboard
                        </h1>

                        <p className="mt-2 text-stone-500">
                            Manage furniture customization and manufacturing orders.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            title="Total Orders"
                            value={totalOrders}
                            icon="📋"
                            color="border-stone-800"
                        />

                        <StatCard
                            title="Pending Orders"
                            value={pendingOrders}
                            icon="⏳"
                            color="border-amber-500"
                        />

                        <StatCard
                            title="In Production"
                            value={productionOrders}
                            icon="🪚"
                            color="border-blue-500"
                        />

                        <StatCard
                            title="Completed Orders"
                            value={completedOrders}
                            icon="✓"
                            color="border-green-500"
                        />
                    </div>

                    {/* Overview */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        <div className="rounded-2xl bg-stone-900 p-6 text-white shadow-lg lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-stone-400">
                                        Furniture Inventory
                                    </p>

                                    <h2 className="mt-2 text-4xl font-bold">
                                        {totalFurniture}
                                    </h2>

                                    <p className="mt-2 text-stone-400">
                                        Available furniture models
                                    </p>
                                </div>

                                <div className="text-5xl">🪑</div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-stone-900">
                                Order Progress
                            </h2>

                            <p className="mt-1 text-sm text-stone-500">
                                Current manufacturing status
                            </p>

                            <div className="mt-6 space-y-5">
                                <ProgressRow
                                    label="Pending"
                                    value={pendingOrders}
                                    total={totalOrders}
                                    color="bg-amber-500"
                                />

                                <ProgressRow
                                    label="In Production"
                                    value={productionOrders}
                                    total={totalOrders}
                                    color="bg-blue-500"
                                />

                                <ProgressRow
                                    label="Completed"
                                    value={completedOrders}
                                    total={totalOrders}
                                    color="bg-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                        <div className="border-b border-stone-200 p-6">
                            <h2 className="text-xl font-bold text-stone-900">
                                Recent Custom Orders
                            </h2>

                            <p className="mt-1 text-sm text-stone-500">
                                Latest furniture customization requests
                            </p>
                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="p-10 text-center">
                                <div className="text-4xl">📦</div>

                                <p className="mt-3 font-semibold text-stone-800">
                                    No orders yet
                                </p>

                                <p className="mt-1 text-sm text-stone-500">
                                    Custom orders will appear here when created.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                                        <tr>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Furniture</th>
                                            <th className="px-6 py-4">Total Price</th>
                                            <th className="px-6 py-4">Deposit</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-stone-100">
                                        {recentOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-stone-50"
                                            >
                                                <td className="px-6 py-4 font-semibold text-stone-900">
                                                    {order.client_name}
                                                </td>

                                                <td className="px-6 py-4 text-stone-600">
                                                    {order.furniture_model?.name ?? 'Furniture'}
                                                </td>

                                                <td className="px-6 py-4 font-medium text-stone-900">
                                                    {money(order.total_price)}
                                                </td>

                                                <td className="px-6 py-4 text-stone-600">
                                                    {money(order.deposit_paid)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.manufacturing_status)}`}
                                                    >
                                                        {order.manufacturing_status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: number;
    icon: string;
    color: string;
}) {
    return (
        <div
            className={`rounded-2xl border border-stone-200 border-l-4 ${color} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-stone-500">{title}</p>
                <span className="text-2xl">{icon}</span>
            </div>

            <h3 className="mt-4 text-3xl font-bold text-stone-900">
                {value}
            </h3>
        </div>
    );
}

function ProgressRow({
    label,
    value,
    total,
    color,
}: {
    label: string;
    value: number;
    total: number;
    color: string;
}) {
    const percentage =
        total > 0 ? Math.round((value / total) * 100) : 0;

    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-stone-700">{label}</span>

                <span className="text-stone-500">
                    {value} ({percentage}%)
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
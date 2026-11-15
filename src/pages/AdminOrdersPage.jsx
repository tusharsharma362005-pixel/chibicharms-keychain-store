import React, { useState, useEffect } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  DollarSign,
  Sparkles,
  Wand2,
  ExternalLink,
  ChevronDown,
  User,
  MapPin,
  Mail,
  AlertCircle
} from 'lucide-react';
import KeychainVisual from '../components/KeychainVisual';
import { fetchAdminOrders, updateOrderStatus, deleteOrder, fetchDashboardStats } from '../services/api';

export default function AdminOrdersPage({ navigate }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, inProduction: 0, shipped: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [ordersData, statsData] = await Promise.all([
        fetchAdminOrders({ status: statusFilter, search: searchQuery }),
        fetchDashboardStats().catch(() => ({ totalOrders: 0, totalRevenue: 0, inProduction: 0, shipped: 0 }))
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      console.error('Admin loading error:', err);
      setError('Could not connect to the backend server. Make sure the Node server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
      // Refresh stats
      fetchDashboardStats().then(setStats).catch(() => {});
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      fetchDashboardStats().then(setStats).catch(() => {});
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-pink-100 via-brand-lavender-100 to-brand-peach-100 rounded-4xl p-6 sm:p-8 border border-white shadow-cute flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-brand-pink-600 shadow-sm mb-2">
            <span>🔐</span>
            <span>BACKEND STUDIO DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#3D2C2E]">
            Customer Orders Management ✨
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Real-time orders stored in the local SQLite database (`chibicharms.db`).
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="px-4 py-2.5 rounded-full bg-white hover:bg-brand-pink-50 border border-brand-pink-200 text-brand-pink-600 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-brand-pink-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-600 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Total Orders</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-800">
              {stats.totalOrders}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-brand-pink-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-mint-100 text-brand-mint-600 flex items-center justify-center text-2xl shrink-0">
            💵
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Total Revenue</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-emerald-600">
              ${stats.totalRevenue.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-brand-pink-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow-100 text-yellow-600 flex items-center justify-center text-2xl shrink-0">
            ⏳
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">In Production</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-amber-600">
              {stats.inProduction}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-brand-pink-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-lavender-100 text-brand-lavender-600 flex items-center justify-center text-2xl shrink-0">
            🚚
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Shipped</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-lavender-600">
              {stats.shipped}
            </h3>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-brand-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'In Production', label: 'In Production' },
            { id: 'Ready to Ship', label: 'Ready to Ship' },
            { id: 'Shipped', label: 'Shipped' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-brand-pink-500 text-white shadow-cute'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order ID, name..."
              className="w-full bg-brand-pink-50/50 border border-brand-pink-200 rounded-full pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-pink-400"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-full bg-brand-pink-500 text-white text-xs font-bold hover:bg-brand-pink-600 transition-colors"
          >
            Find
          </button>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-xs text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Orders List / Cards */}
      {loading ? (
        <div className="bg-white rounded-4xl p-16 text-center border border-brand-pink-100">
          <div className="text-3xl animate-spin mb-2">🎀</div>
          <p className="text-sm font-bold text-gray-600">Loading orders from SQLite database...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-4xl p-16 text-center border border-brand-pink-100 space-y-3">
          <div className="text-4xl">📦</div>
          <h3 className="font-heading font-bold text-lg text-gray-800">No orders found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try switching filters or place a test order on the checkout page to see it appear here immediately!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isUpdating = updatingId === order.orderId;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-4xl border border-brand-pink-100 p-6 shadow-sm hover:shadow-cute transition-shadow space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm bg-brand-pink-50 text-brand-pink-600 px-3 py-1 rounded-full border border-brand-pink-100">
                      {order.orderId}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Pill */}
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === 'In Production'
                          ? 'bg-amber-100 text-amber-700'
                          : order.status === 'Ready to Ship'
                          ? 'bg-purple-100 text-purple-700'
                          : order.status === 'Shipped'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      ● {order.status}
                    </span>

                    {/* Status Quick Switcher */}
                    <select
                      value={order.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className="bg-brand-pink-50/70 border border-brand-pink-200 rounded-xl px-2.5 py-1 text-xs font-bold text-gray-700 focus:outline-none"
                    >
                      <option value="In Production">Set: In Production</option>
                      <option value="Ready to Ship">Set: Ready to Ship</option>
                      <option value="Shipped">Set: Shipped</option>
                      <option value="Delivered">Set: Delivered</option>
                    </select>

                    <button
                      onClick={() => handleDeleteOrder(order.orderId)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Details & Shipping */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-brand-pink-50/40 p-3.5 rounded-2xl text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-brand-pink-500 shrink-0" />
                    <span className="font-bold text-gray-800">{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-brand-lavender-500 shrink-0" />
                    <span className="truncate">{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-peach-500 shrink-0" />
                    <span className="truncate">
                      {order.customerAddress}, {order.customerCity}, {order.customerState} {order.customerZip}
                    </span>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block">
                    Keychains in this Order ({order.items.length})
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-100 p-3 rounded-2xl flex items-center gap-3 shadow-2xs"
                      >
                        <div className="w-14 h-16 bg-brand-pink-50/60 rounded-xl flex items-center justify-center p-1 shrink-0">
                          <KeychainVisual
                            type={item.imageType || 'cloud'}
                            color={item.customDetails?.colorHex || item.selectedOptions?.colorHex || '#FFCAD4'}
                            hardware={item.customDetails?.hardware || item.selectedOptions?.hardware || 'gold-star'}
                            finish={item.customDetails?.finish || 'glitter'}
                            text={item.customDetails?.text || ''}
                            charms={item.customDetails?.charms || []}
                            sparkles={false}
                            className="w-12 h-14"
                          />
                        </div>

                        <div className="flex-1 min-w-0 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-gray-800 truncate">
                              {item.name}
                            </span>
                            <span className="font-bold text-gray-700">x{item.quantity}</span>
                          </div>

                          {item.isCustom ? (
                            <div className="text-[11px] text-brand-pink-600 space-y-0.5 mt-0.5">
                              <span className="block font-bold">
                                ✨ Text: "{item.customDetails?.text || 'None'}"
                              </span>
                              <span className="text-gray-500 block truncate">
                                Base: {item.customDetails?.shapeName} • {item.customDetails?.colorName} • {item.customDetails?.finishName}
                              </span>
                              {item.customDetails?.charms?.length > 0 && (
                                <span className="text-gray-500 block">
                                  Charms: {item.customDetails.charms.join(', ')}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              {item.selectedOptions?.color && (
                                <span>Color: {item.selectedOptions.color} • </span>
                              )}
                              <span>Clasp: {item.selectedOptions?.hardware || 'Star Clasp'}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-right text-xs font-extrabold text-[#3D2C2E] shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total and Payment Row */}
                <div className="pt-2 flex items-center justify-between text-xs border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>Payment: <strong className="text-gray-700 uppercase">{order.paymentMethod}</strong></span>
                    <span>•</span>
                    <span>Shipping: <strong className="text-gray-700">${order.shipping.toFixed(2)}</strong></span>
                    {order.discount > 0 && (
                      <>
                        <span>•</span>
                        <span>Discount: <strong className="text-emerald-600">-${order.discount.toFixed(2)}</strong></span>
                      </>
                    )}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gray-500 font-bold">Total Paid:</span>
                    <span className="text-lg font-extrabold font-heading text-brand-pink-600">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

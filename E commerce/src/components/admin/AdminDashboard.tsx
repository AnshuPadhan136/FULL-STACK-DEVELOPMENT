import React, { useState } from 'react';
import { 
  DollarSign, ShoppingBag, Package, Users, AlertTriangle, 
  Plus, Edit, Trash2, Check, Search, Filter, ShieldCheck, 
  BarChart3, RefreshCw, ChevronDown, ExternalLink 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { Product, OrderStatus } from '../../types/ecommerce';

export const AdminDashboard: React.FC = () => {
  const { 
    analytics, products, categories, orders, 
    addProduct, updateProduct, deleteProduct, updateOrderStatus,
    discounts, setTrackingOrder
  } = useEcommerce();

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'discounts'>('overview');
  
  // Product Search & Modals
  const [prodSearch, setProdSearch] = useState('');
  const [selectedProdCat, setSelectedProdCat] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    originalPrice: 0,
    categoryId: categories[0]?.id || '',
    categoryName: categories[0]?.name || '',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    tags: ['tech', 'featured']
  });

  const lowStockCount = products.filter(p => p.stock <= 5).length;

  const filteredAdminProducts = products.filter(p => {
    if (prodSearch && !p.title.toLowerCase().includes(prodSearch.toLowerCase())) return false;
    if (selectedProdCat !== 'all' && p.categoryId !== selectedProdCat) return false;
    return true;
  });

  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      description: '',
      price: 99.99,
      originalPrice: 120.00,
      categoryId: categories[0]?.id || '',
      categoryName: categories[0]?.name || '',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      stock: 25,
      tags: ['new', 'featured']
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      images: [...p.images],
      stock: p.stock,
      tags: [...p.tags]
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find(c => c.id === formData.categoryId);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        categoryId: formData.categoryId,
        categoryName: cat?.name || formData.categoryName,
        images: formData.images,
        stock: Number(formData.stock)
      });
    } else {
      addProduct({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        categoryId: formData.categoryId,
        categoryName: cat?.name || formData.categoryName,
        images: formData.images,
        stock: Number(formData.stock),
        tags: formData.tags
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Admin Top Header Banner */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[6px_6px_0px_#1A1A1A]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#1A1A1A] text-white">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-black text-[#1A1A1A] uppercase tracking-wide">Operations Desk</h1>
              <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase tracking-widest">
                LIVE ADMIN
              </span>
            </div>
            <p className="text-xs text-[#5A5A40] mt-0.5 font-medium">
              Manage product inventory, edit stock levels, track revenue metrics, and process customer dispatches.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-[#F9F8F6] p-1.5 border border-[#1A1A1A] text-xs font-mono font-bold uppercase">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3 py-1.5 transition-all ${
              adminTab === 'overview' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-3 py-1.5 transition-all ${
              adminTab === 'products' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
            }`}
          >
            Catalog ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-1.5 transition-all ${
              adminTab === 'orders' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Overview Analytics KPI Cards */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white border border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-2">
              <div className="flex items-center justify-between text-[#5A5A40] text-xs uppercase font-mono font-bold">
                <span>Gross Revenue</span>
                <div className="p-1.5 bg-[#1A1A1A] text-white">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-serif font-black text-[#1A1A1A]">${analytics.totalRevenue.toFixed(2)}</p>
              <p className="text-[10px] text-emerald-800 font-mono font-bold uppercase">▲ +18.4% versus target</p>
            </div>

            <div className="bg-white border border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-2">
              <div className="flex items-center justify-between text-[#5A5A40] text-xs uppercase font-mono font-bold">
                <span>Orders Fulfilled</span>
                <div className="p-1.5 bg-[#1A1A1A] text-white">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-serif font-black text-[#1A1A1A]">{analytics.totalOrders}</p>
              <p className="text-[10px] text-[#5A5A40] font-mono">ALL CHANNELS</p>
            </div>

            <div className="bg-white border border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-2">
              <div className="flex items-center justify-between text-[#5A5A40] text-xs uppercase font-mono font-bold">
                <span>Active SKUs</span>
                <div className="p-1.5 bg-[#1A1A1A] text-white">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-serif font-black text-[#1A1A1A]">{analytics.totalProducts}</p>
              <p className="text-[10px] text-rose-800 font-mono font-bold uppercase">{lowStockCount} LOW STOCK ALERT</p>
            </div>

            <div className="bg-white border border-[#1A1A1A] p-5 shadow-[4px_4px_0px_#1A1A1A] space-y-2">
              <div className="flex items-center justify-between text-[#5A5A40] text-xs uppercase font-mono font-bold">
                <span>Clients Registered</span>
                <div className="p-1.5 bg-[#1A1A1A] text-white">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-serif font-black text-[#1A1A1A]">{analytics.totalCustomers}</p>
              <p className="text-[10px] text-[#5A5A40] font-mono">VERIFIED MEMBERS</p>
            </div>

          </div>

          {/* Monthly Revenue Visual Bar Chart */}
          <div className="bg-white border border-[#1A1A1A] p-6 shadow-[4px_4px_0px_#1A1A1A] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-base uppercase">Fiscal Growth Trajectory</h3>
                <p className="text-xs text-[#5A5A40] font-mono">Monthly gross sales metrics ($)</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#1A1A1A] bg-[#F9F8F6] px-2.5 py-1 border border-[#1A1A1A]">
                FY 2026 AUDIT
              </span>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-8 px-4 border-b border-[#1A1A1A]">
              {analytics.monthlyRevenue.map((item, idx) => {
                const maxVal = 15000;
                const barHeightPct = Math.min(100, (item.sales / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono font-bold text-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity">
                      ${item.sales}
                    </span>
                    <div 
                      className="w-full max-w-[40px] bg-[#1A1A1A] transition-all duration-300 group-hover:bg-[#5A5A40]"
                      style={{ height: `${barHeightPct}%` }}
                    ></div>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product Management CRUD Tab */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A40]" />
                <input
                  type="text"
                  placeholder="Filter catalog products..."
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#1A1A1A] pl-9 pr-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <select
                value={selectedProdCat}
                onChange={(e) => setSelectedProdCat(e.target.value)}
                className="bg-[#F9F8F6] border border-[#1A1A1A] px-3 py-1.5 text-xs text-[#1A1A1A] font-mono font-bold"
              >
                <option value="all">ALL DEPARTMENTS</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="w-full sm:w-auto px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#5A5A40] font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#1A1A1A]"
            >
              <Plus className="w-4 h-4" /> Add Catalog Product
            </button>
          </div>

          {/* Products CRUD Table */}
          <div className="bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1A1A1A]">
                <thead className="bg-[#1A1A1A] text-white font-mono font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Item & Descriptor</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Inventory Level</th>
                    <th className="p-4 text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {filteredAdminProducts.map(p => (
                    <tr key={p.id} className="hover:bg-[#F9F8F6] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-10 border border-[#1A1A1A] object-cover bg-[#F9F8F6]" />
                          <div>
                            <span className="font-serif font-bold text-[#1A1A1A] block">{p.title}</span>
                            <span className="text-[10px] text-[#5A5A40] font-mono">SKU: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-[#F9F8F6] border border-[#1A1A1A] text-[10px] font-mono font-bold uppercase text-[#1A1A1A]">
                          {p.categoryName}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-bold text-[#1A1A1A]">
                        ${p.price.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                            className="w-6 h-6 border border-[#1A1A1A] bg-white text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white"
                          >
                            -
                          </button>
                          <span className={`font-mono font-bold w-8 text-center ${p.stock <= 5 ? 'text-rose-700' : 'text-[#1A1A1A]'}`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                            className="w-6 h-6 border border-[#1A1A1A] bg-white text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 bg-white border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A]"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 bg-white border border-[#1A1A1A] hover:bg-rose-700 hover:text-white text-[#1A1A1A]"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Processing Tab */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1A1A1A]">
                <thead className="bg-[#1A1A1A] text-white font-mono font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Dispatch ID & Date</th>
                    <th className="p-4">Client Record</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status Processor</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-[#F9F8F6] transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-[#1A1A1A] uppercase block">{o.id}</span>
                        <span className="text-[10px] font-mono text-[#5A5A40]">{new Date(o.createdAt).toLocaleDateString()}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-serif font-bold text-[#1A1A1A] block">{o.userName}</span>
                        <span className="text-[10px] font-mono text-[#5A5A40]">{o.userEmail}</span>
                      </td>

                      <td className="p-4">
                        <span className="text-[#1A1A1A] font-medium">{o.items.length} items</span>
                      </td>

                      <td className="p-4 font-mono font-bold text-[#1A1A1A]">
                        ${o.totalAmount.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-[#F9F8F6] border border-[#1A1A1A] px-2.5 py-1 text-xs font-mono font-bold text-[#1A1A1A] uppercase cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="payment_confirmed">Payment Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => setTrackingOrder(o)}
                          className="px-2.5 py-1 bg-[#1A1A1A] text-white hover:bg-[#5A5A40] text-xs font-serif font-bold uppercase tracking-wider inline-flex items-center gap-1 border border-[#1A1A1A]"
                        >
                          Track <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/70 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#F9F8F6] border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] p-6 space-y-4 text-[#1A1A1A]">
            <h3 className="font-serif font-black text-[#1A1A1A] text-lg uppercase tracking-wide">
              {editingProduct ? 'Edit Catalog Entry' : 'New Catalog Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] font-mono font-bold"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.images[0]}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A] font-mono"
                />
              </div>

              <div>
                <label className="block text-[#5A5A40] uppercase font-mono font-bold text-[10px] mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-[#1A1A1A] p-2.5 text-[#1A1A1A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white border border-[#1A1A1A] text-[#1A1A1A] font-serif font-bold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-white font-serif font-bold text-xs uppercase hover:bg-[#5A5A40]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// src/pages/AdminPage.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaGamepad, FaHome, FaUsers, FaStore } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const [games, setGames] = useState([
    { id: 1, name: 'Game A', description: '', category: 'physical', platform: 'PC', stock: 10, price: 50 },
    { id: 2, name: 'Game B', description: '', category: 'digital', platform: 'PS5', stock: 5, price: 30 },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com' },
  ]);
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor X', email: 'vendorx@email.com' },
    { id: 2, name: 'Vendor Y', email: 'vendory@email.com' },
  ]);

  const [newGame, setNewGame] = useState({ name: '', description: '', category: 'physical', platform: '', stock: '', price: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newVendor, setNewVendor] = useState({ name: '', email: '' });

  const [editingGameId, setEditingGameId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingVendorId, setEditingVendorId] = useState(null);

  // Add or update
  const handleAddOrUpdate = (type) => {
    if (type === 'Games') {
      if (editingGameId) {
        setGames(prev => prev.map(g => g.id === editingGameId ? { ...g, ...newGame } : g));
        setEditingGameId(null);
      } else {
        setGames(prev => [...prev, { id: prev.length + 1, ...newGame }]);
      }
      setNewGame({ name: '', description: '', category: 'physical', platform: '', stock: '', price: '' });
    }
    if (type === 'Users') {
      if (editingUserId) {
        setUsers(prev => prev.map(u => u.id === editingUserId ? { ...u, ...newUser } : u));
        setEditingUserId(null);
      } else {
        setUsers(prev => [...prev, { id: users.length + 1, ...newUser }]);
      }
      setNewUser({ name: '', email: '' });
    }
    if (type === 'Vendors') {
      if (editingVendorId) {
        setVendors(prev => prev.map(v => v.id === editingVendorId ? { ...v, ...newVendor } : v));
        setEditingVendorId(null);
      } else {
        setVendors(prev => [...prev, { id: vendors.length + 1, ...newVendor }]);
      }
      setNewVendor({ name: '', email: '' });
    }
  };

  // Delete
  const handleDelete = (type, id) => {
    if (type === 'Games') setGames(prev => prev.filter(g => g.id !== id));
    if (type === 'Users') setUsers(prev => prev.filter(u => u.id !== id));
    if (type === 'Vendors') setVendors(prev => prev.filter(v => v.id !== id));
  };

  // Edit
  const handleEdit = (type, item) => {
    if (type === 'Games') {
      setNewGame(item);
      setEditingGameId(item.id);
    }
    if (type === 'Users') {
      setNewUser(item);
      setEditingUserId(item.id);
    }
    if (type === 'Vendors') {
      setNewVendor(item);
      setEditingVendorId(item.id);
    }
  };

  const totalGames = games.length;
  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const totalStockValue = games.reduce((sum, g) => sum + g.stock * g.price, 0);

  const recentActivity = [
    { id: 1, activity: 'User Alice registered' },
    { id: 2, activity: 'Game B added to stock' },
    { id: 3, activity: 'Vendor X profile updated' },
  ];

  const chartData = {
    labels: games.map(g => g.name),
    datasets: [
      {
        label: 'Stock',
        data: games.map(g => g.stock),
        backgroundColor: 'rgba(102, 192, 244, 0.7)',
        borderRadius: 5,
      }
    ]
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaHome /> },
    { label: 'Games', icon: <FaGamepad /> },
    { label: 'Users', icon: <FaUsers /> },
    { label: 'Vendors', icon: <FaStore /> },
  ];

  // Render CRUD form and table
  const renderCRUD = (type) => {
    let data, newItem, setNewItem, editingId, setEditingId, fields;
    if (type === 'Games') {
      data = games; newItem = newGame; setNewItem = setNewGame; editingId = editingGameId; setEditingId = setEditingGameId;
      fields = ['name', 'description', 'category', 'platform', 'price', 'stock'];
    }
    if (type === 'Users') {
      data = users; newItem = newUser; setNewItem = setNewUser; editingId = editingUserId; setEditingId = setEditingUserId;
      fields = ['name', 'email'];
    }
    if (type === 'Vendors') {
      data = vendors; newItem = newVendor; setNewItem = setNewVendor; editingId = editingVendorId; setEditingId = setEditingVendorId;
      fields = ['name', 'email'];
    }

    return (
      <>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {fields.map(field => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newItem[field]}
              onChange={e => setNewItem(prev => ({ ...prev, [field]: e.target.value }))}
              style={{ padding: '0.5rem', borderRadius: '6px', flex: 1, border: '1px solid #2b475e', background: '#1b2838', color: '#c6d4df' }}
            />
          ))}
          <button
            onClick={() => handleAddOrUpdate(type)}
            style={{ background:'#5cba47', color:'#0b0b0d', border:'none', padding:'0.5rem 1rem', borderRadius:'6px', cursor:'pointer', fontWeight:'bold' }}
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>

        <table style={{ width:'100%', borderCollapse:'collapse', background:'#1b2838', borderRadius:'8px', overflow:'hidden' }}>
          <thead>
            <tr style={{ background:'#0b0b0d' }}>
              <th style={{ border:'1px solid #2b475e', padding:'0.5rem', color:'#c6d4df' }}>ID</th>
              {fields.map(f => <th key={f} style={{ border:'1px solid #2b475e', padding:'0.5rem', color:'#c6d4df' }}>{f.charAt(0).toUpperCase()+f.slice(1)}</th>)}
              <th style={{ border:'1px solid #2b475e', padding:'0.5rem', color:'#c6d4df' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={{ background:'#1b2838' }}>
                <td style={{ border:'1px solid #2b475e', padding:'0.5rem', textAlign:'center', color:'#c6d4df' }}>{item.id}</td>
                {fields.map(f => (
                  <td key={f} style={{ border:'1px solid #2b475e', padding:'0.5rem' }}>
                    <input
                      value={item[f]}
                      type={f === 'price' || f === 'stock' ? 'number' : 'text'}
                      onChange={e => setNewItem(prev => ({ ...prev, [f]: e.target.value }))}
                      style={{ width:'100%', padding:'0.3rem', borderRadius:'4px', border:'1px solid #2b475e', background:'#16222a', color:'#c6d4df' }}
                    />
                  </td>
                ))}
                <td style={{ border:'1px solid #2b475e', padding:'0.5rem', display:'flex', gap:'0.5rem' }}>
                  <button onClick={() => handleEdit(type, item)} style={{ flex:1, padding:'6px', borderRadius:'5px', border:'none', background:'#66c0f4', color:'#1b2838', cursor:'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(type, item.id)} style={{ flex:1, padding:'6px', borderRadius:'5px', border:'none', background:'#ff4c4c', color:'#fff', cursor:'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width:'220px', background:'#0b0b0d4f', color:'#c6d4df', padding:'2rem 1rem', display:'flex', flexDirection:'column' }}>
        <h2 style={{ marginBottom:'2rem', color:'#66c0f4', textAlign:'center', fontWeight:'bold' }}>Admin Panel</h2>
        <nav style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {menuItems.map(item => (
            <div key={item.label} onClick={() => setActiveMenu(item.label)}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.7rem 1rem',
                borderRadius:'10px', cursor:'pointer',
                background: activeMenu===item.label?'#66c0f4':'transparent',
                color: activeMenu===item.label?'#0b0b0d':'#c6d4df',
                fontWeight: activeMenu===item.label?'bold':'500',
                boxShadow: activeMenu===item.label?'0 4px 15px rgba(102,192,244,0.4)':'none',
                transition:'all 0.3s ease',
              }}>
              <span style={{ fontSize:'1.3rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex:1, padding:'2rem', background:'#1b2838bd', color:'#c6d4df', transition:'all 0.3s ease' }}>
        {activeMenu === 'Dashboard' && (
          <>
            <div style={{ display:'flex', gap:'1rem', marginBottom:'2rem', flexWrap:'wrap' }}>
              {[{label:'Total Games', value:totalGames},{label:'Total Users', value:totalUsers},{label:'Total Vendors', value:totalVendors},{label:'Total Stock Value', value:`₱${totalStockValue}`}]
                .map(card=>(
                  <div key={card.label} style={{flex:'1 1 200px', background:'#16222a', padding:'1rem', borderRadius:'10px', boxShadow:'0 4px 12px rgba(0,0,0,0.4)', transition:'all 0.3s'}}>
                    <h4 style={{marginBottom:'0.5rem', color:'#66c0f4'}}>{card.label}</h4>
                    <p style={{ fontSize:'1.5rem', fontWeight:'bold' }}>{card.value}</p>
                  </div>
                ))
              }
            </div>

            <div style={{ marginBottom:'2rem' }}>
              <h3 style={{ marginBottom:'1rem', color:'#66c0f4' }}>Recent Activity</h3>
              <ul>{recentActivity.map(a=><li key={a.id}>{a.activity}</li>)}</ul>
            </div>

            <div style={{ maxWidth:'600px', background:'#16222a', padding:'1rem', borderRadius:'10px', boxShadow:'0 4px 12px rgba(0,0,0,0.4)' }}>
              <h3 style={{ marginBottom:'1rem', color:'#66c0f4' }}>Games Stock Chart</h3>
              <Bar data={chartData} options={{ responsive:true, plugins:{ legend:{ display:false } } }} />
            </div>
          </>
        )}

        {activeMenu === 'Games' && renderCRUD('Games')}
        {activeMenu === 'Users' && renderCRUD('Users')}
        {activeMenu === 'Vendors' && renderCRUD('Vendors')}
      </div>
    </div>
  );
};

export default AdminPage;

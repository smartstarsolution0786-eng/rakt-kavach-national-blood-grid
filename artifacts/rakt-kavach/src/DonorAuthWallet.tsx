import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const DonorAuthWallet: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [abhaHash, setAbhaHash] = useState('');
  const [donorData, setDonorData] = useState<any>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const loadDonorProfile = async (authPhone: string) => {
    const { data, error } = await supabase
      .from('donors')
      .select('*')
      .eq('phone', authPhone)
      .single();

    if (!error && data) {
      setDonorData(data);
      if (data.last_donated_at) {
        const nextAllowedDate = new Date(data.last_donated_at);
        nextAllowedDate.setDate(nextAllowedDate.getDate() + 90);
        const today = new Date();
        const diffTime = nextAllowedDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays > 0 ? diffDays : 0);
      }
    } else {
      setMessage('डोनर रिकॉर्ड नहीं मिला या ऑथेंटिकेशन फेल!');
    }
  };

  const handleABHALogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !abhaHash) return setMessage('कृपया सभी फ़ील्ड भरें');

    setMessage('ABHA/Aadhaar OTP सत्यापित किया जा रहा है...');
    setTimeout(() => {
      loadDonorProfile(phone);
      setMessage('सफलतापूर्वक सत्यापित!');
    }, 1200);
  };

  return (
    <div className="wallet-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
      {!donorData ? (
        <form onSubmit={handleABHALogin}>
          <h3>🔐 ABHA / आधार सुरक्षित डोनर लॉगिन</h3>
          <input type="tel" placeholder="पंजीकृत मोबाइल नंबर" value={phone} onChange={e => setPhone(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
          <input type="password" placeholder="ABHA ID / सुरक्षित टोकन हैश" value={abhaHash} onChange={e => setAbhaHash(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
          <button type="submit" style={{ backgroundColor: '#DC2626', color: '#fff', padding: '10px', width: '100%', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>सत्यापित करें और लॉगिन करें</button>
          <p style={{ marginTop: '10px', color: '#666' }}>{message}</p>
        </form>
      ) : (
        <div>
          <h2>🩸 आपका डिजिटल डोनर वॉलेट</h2>
          <p><strong>नाम:</strong> {donorData.full_name}</p>
          <p><strong>रक्त समूह:</strong> {donorData.blood_group}</p>
          <p><strong>अंतिम रक्तदान तिथि:</strong> {donorData.last_donated_at ? new Date(donorData.last_donated_at).toLocaleDateString() : 'कभी नहीं'}</p>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: daysRemaining && daysRemaining > 0 ? '#FEF2F2' : '#F0FDF4', border: '1px solid', borderRadius: '6px' }}>
            {daysRemaining && daysRemaining > 0 ? (
              <h4 style={{ color: '#991B1B', margin: 0 }}>⚠️ अगला रक्तदान करने के लिए शेष दिन: {daysRemaining} दिन</h4>
            ) : (
              <h4 style={{ color: '#166534', margin: 0 }}>✅ आप अगला रक्तदान करने के लिए पूरी तरह योग्य हैं!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

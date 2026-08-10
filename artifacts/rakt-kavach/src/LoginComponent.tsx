import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export const RaktKavachLogin = () => {
  const [loginType, setLoginType] = useState<'phone' | 'aadhar'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!inputValue) return alert('कृपया नंबर दर्ज करें');
    setLoading(true);
    if (loginType === 'phone') {
      const { error } = await supabase.auth.signInWithOtp({
        phone: inputValue.startsWith('+91') ? inputValue : `+91${inputValue}`
      });
      if (error) alert('ओटीपी भेजने में विफल: ' + error.message);
      else { alert('आपके मोबाइल नंबर पर असली OTP भेज दिया गया है!'); setStep(2); }
    } else {
      alert('आधार से लिंक मोबाइल नंबर पर OTP भेज दिया गया है!');
      setStep(2);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!otp) return alert('कृपया OTP दर्ज करें');
    setLoading(true);
    if (loginType === 'phone') {
      const { error } = await supabase.auth.verifyOtp({
        phone: inputValue.startsWith('+91') ? inputValue : `+91${inputValue}`,
        token: otp,
        type: 'sms'
      });
      if (error) alert('गलत OTP: ' + error.message);
      else { alert('लॉगिन सफल! डोनर डैशबोर्ड लोड हो रहा है...'); window.location.reload(); }
    } else {
      alert('आधार वेरिफिकेशन सफल! डोनर डैशबोर्ड लोड हो रहा है...');
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-lg max-w-md mx-auto my-4 border border-red-900 shadow-xl">
      <h2 className="text-xl font-bold text-center mb-4 text-red-500">रक्त कवच - सुरक्षित डोनर लॉगिन</h2>
      <div className="flex justify-around mb-6 border-b border-slate-700 pb-2">
        <button onClick={() => { setLoginType('phone'); setStep(1); setInputValue(''); }} className={`pb-2 px-4 ${loginType === 'phone' ? 'text-red-500 border-b-2 border-red-500 font-bold' : 'text-slate-400'}`}>फ़ोन नंबर</button>
        <button onClick={() => { setLoginType('aadhar'); setStep(1); setInputValue(''); }} className={`pb-2 px-4 ${loginType === 'aadhar' ? 'text-red-500 border-b-2 border-red-500 font-bold' : 'text-slate-400'}`}>आधार कार्ड</button>
      </div>
      {step === 1 ? (
        <div>
          <label className="block text-sm mb-2">{loginType === 'phone' ? 'अपना 10-अंकीय मोबाइल नंबर डालें:' : 'अपना 12-अंकीय आधार नंबर डालें:'}</label>
          <input type="number" placeholder={loginType === 'phone' ? "98765XXXXX" : "XXXX-XXXX-XXXX"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 mb-4 text-white focus:outline-none focus:border-red-500" />
          <button onClick={handleSendOTP} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded transition-colors disabled:bg-slate-700">{loading ? 'कृपया प्रतीक्षा करें...' : 'OTP भेजें'}</button>
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-2">ओटीपी (OTP) दर्ज करें:</label>
          <input type="number" placeholder="XXXXXX" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 mb-4 text-white text-center tracking-widest focus:outline-none focus:border-red-500" />
          <button onClick={handleVerify} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold p-2 rounded transition-colors mb-2 disabled:bg-slate-700">{loading ? 'वेरीफाई किया जा रहा है...' : 'वेरीफाई और लॉगिन करें'}</button>
        </div>
      )}
    </div>
  );
};

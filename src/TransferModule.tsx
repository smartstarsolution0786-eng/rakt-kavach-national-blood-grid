import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const TransferModule: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [targetBankId, setTargetBankId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const executeUnitTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('स्थानांतरण प्रक्रिया शुरू की जा रही है...');

    const { data: checkUnit, error: fetchError } = await supabase
      .from('blood_inventory')
      .select('id, status')
      .eq('unit_barcode', barcode)
      .single();

    if (fetchError || !checkUnit) {
      return setStatusMessage('त्रुटि: यह ब्लड बारकोड नेशनल ग्रिड पर मौजूद नहीं है!');
    }

    if (checkUnit.status !== 'AVAILABLE') {
      return setStatusMessage(`स्थानांतरण रद्द: यूनिट वर्तमान में ${checkUnit.status} स्थिति में है।`);
    }

    const { error: updateError } = await supabase
      .from('blood_inventory')
      .update({
        status: 'TRANSIT',
        blood_bank_id: targetBankId
      })
      .eq('unit_barcode', barcode);

    if (updateError) {
      setStatusMessage(`ट्रांसफर फेल: ${updateError.message}`);
    } else {
      setStatusMessage('🟢 सफलता! यूनिट "TRANSIT" मोड में है और पैन-इंडिया ग्रिड पर अपडेट कर दी गई है।');
      setBarcode('');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
      <h3>🚚 पैन-इंडिया आपातकालीन यूनिट स्थानांतरण (Transfer)</h3>
      <form onSubmit={executeUnitTransfer}>
        <input type="text" placeholder="ब्लड बैग बारकोड स्कैन / टाइप करें" value={barcode} onChange={e => setBarcode(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
        <input type="text" placeholder="लक्ष्य ब्लड बैंक आईडी (Destination Bank UUID)" value={targetBankId} onChange={e => setTargetBankId(e.target.value)} required style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }} />
        <button type="submit" style={{ backgroundColor: '#1E3A8A', color: '#fff', padding: '10px', width: '100%', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>सुरक्षित स्थानांतरण आदेश जारी करें</button>
      </form>
      {statusMessage && <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#1E3A8A' }}>{statusMessage}</p>}
    </div>
  );
};

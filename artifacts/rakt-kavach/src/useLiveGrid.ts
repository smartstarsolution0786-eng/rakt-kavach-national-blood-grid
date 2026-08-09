import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface BloodUnit {
  id: string;
  unit_barcode: string;
  blood_group: string;
  component_type: string;
  status: string;
  expires_at: string;
}

export function useLiveGrid(bloodGroup?: string) {
  const [inventory, setInventory] = useState<BloodUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLiveInventory = async () => {
      setLoading(true);
      let query = supabase
        .from('blood_inventory')
        .select('id, unit_barcode, blood_group, component_type, status, expires_at')
        .eq('status', 'AVAILABLE');

      if (bloodGroup) {
        query = query.eq('blood_group', bloodGroup);
      }

      const { data, error } = await query.order('expires_at', { ascending: true });

      if (!error && data) {
        setInventory(data as BloodUnit[]);
      }
      setLoading(false);
    };

    fetchLiveInventory();

    const realtimeChannel = supabase
      .channel('live-inventory-grid')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blood_inventory' },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new.status === 'AVAILABLE') {
            setInventory((prev) => [payload.new as BloodUnit, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updated = payload.new as BloodUnit;
            if (updated.status !== 'AVAILABLE') {
              setInventory((prev) => prev.filter((item) => item.id !== updated.id));
            } else {
              setInventory((prev) => prev.map((item) => item.id === updated.id ? updated : item));
            }
          } else if (payload.eventType === 'DELETE') {
            setInventory((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtimeChannel);
    };
  }, [bloodGroup]);

  return { inventory, loading };
}

import { useState, useEffect } from 'react';
import { Ban, UserCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface BannedUser {
  id: string;
  user_id: string;
  reason: string | null;
  banned_at: string;
  expires_at: string | null;
}

interface Profile {
  user_id: string;
  email: string;
  full_name: string | null;
  is_workshop_member: boolean;
}

const BannedUsersPanel = () => {
  const { user } = useAuth();
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [banEmail, setBanEmail] = useState('');
  const [banReason, setBanReason] = useState('');
  const [banDays, setBanDays] = useState('');

  const fetchData = async () => {
    try {
      const [bannedRes, membersRes] = await Promise.all([
        supabase.from('banned_users').select('*').order('banned_at', { ascending: false }),
        supabase.from('profiles').select('user_id, email, full_name, is_workshop_member').eq('is_workshop_member', true),
      ]);

      if (bannedRes.error) throw bannedRes.error;
      if (membersRes.error) throw membersRes.error;

      setBannedUsers(bannedRes.data || []);
      setMembers(membersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBan = async () => {
    if (!banEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    const member = members.find(m => m.email.toLowerCase() === banEmail.toLowerCase());
    if (!member) {
      toast.error('User not found among clan members');
      return;
    }

    try {
      const expiresAt = banDays ? new Date(Date.now() + parseInt(banDays) * 24 * 60 * 60 * 1000).toISOString() : null;

      const { error } = await supabase
        .from('banned_users')
        .insert({
          user_id: member.user_id,
          banned_by: user?.id,
          reason: banReason.trim() || null,
          expires_at: expiresAt,
        });

      if (error) throw error;

      toast.success(`User ${banEmail} has been banned`);
      setBanEmail('');
      setBanReason('');
      setBanDays('');
      fetchData();
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('User is already banned');
      } else {
        console.error('Ban error:', error);
        toast.error('Failed to ban user');
      }
    }
  };

  const handleUnban = async (ban: BannedUser) => {
    try {
      const { error } = await supabase
        .from('banned_users')
        .delete()
        .eq('id', ban.id);

      if (error) throw error;
      toast.success('User has been unbanned');
      fetchData();
    } catch (error) {
      console.error('Unban error:', error);
      toast.error('Failed to unban user');
    }
  };

  const getBannedUserEmail = (userId: string) => {
    const member = members.find(m => m.user_id === userId);
    return member?.email || 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Ban className="h-4 w-4" />
          Ban a User
        </h3>
        <Input
          placeholder="User email"
          value={banEmail}
          onChange={(e) => setBanEmail(e.target.value)}
        />
        <Textarea
          placeholder="Reason for ban (optional)"
          value={banReason}
          onChange={(e) => setBanReason(e.target.value)}
          rows={2}
        />
        <Input
          type="number"
          placeholder="Ban duration in days (leave empty for permanent)"
          value={banDays}
          onChange={(e) => setBanDays(e.target.value)}
          min="1"
        />
        <Button
          onClick={handleBan}
          disabled={!banEmail.trim()}
          variant="destructive"
          className="w-full gap-2"
        >
          <Ban className="h-4 w-4" />
          Ban User
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Currently Banned Users</h3>
        {bannedUsers.length === 0 ? (
          <p className="text-muted-foreground text-sm">No banned users</p>
        ) : (
          <div className="space-y-2">
            {bannedUsers.map((ban) => (
              <div key={ban.id} className="glass rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {getBannedUserEmail(ban.user_id)}
                  </p>
                  {ban.reason && (
                    <p className="text-xs text-muted-foreground truncate">
                      Reason: {ban.reason}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {ban.expires_at
                      ? `Expires: ${new Date(ban.expires_at).toLocaleDateString()}`
                      : 'Permanent ban'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnban(ban)}
                  className="gap-2"
                >
                  <UserCheck className="h-4 w-4" />
                  Unban
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Clan Members ({members.length})</h3>
        <div className="max-h-60 overflow-y-auto space-y-1">
          {members.map((member) => {
            const isBanned = bannedUsers.some(b => b.user_id === member.user_id);
            return (
              <div key={member.user_id} className="glass rounded-lg p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{member.email}</span>
                  {member.full_name && (
                    <span className="text-xs text-muted-foreground">({member.full_name})</span>
                  )}
                </div>
                {isBanned && (
                  <span className="text-xs text-destructive font-medium">BANNED</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannedUsersPanel;

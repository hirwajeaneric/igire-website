'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const EditUserModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleUpdateUser = async () => {
    if (!userId || !name || !email || !role) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const updatedUserData = { _id: userId, name, email, role };

    setLoading(true);
    try {
      await axios.put(`https://iro-website-bn-vx04.onrender.com/api/Inventory/users/update-user/${userId}`, updatedUserData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('User updated successfully.');

      const response = await axios.get('https://iro-website-bn-vx04.onrender.com/api/Inventory/users/allUsers');
      onUpdate(response.data);
      onClose();

      router.push('/dashboard/admin/users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#F8F8F8] items-center border-none rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="role">Role</Label>
            <Select id="role" value={role} onValueChange={setRole} required>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Human Resource">Human Resources</SelectItem>
                <SelectItem value="Project Director">Project Director</SelectItem>
                <SelectItem value="Operation Manager">Operation Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
        </div>
        <DialogFooter className="flex justify-center mt-6">
          <Button onClick={handleUpdateUser} className={`bg-[#0FA958] text-white px-8 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-300 text-black hover:text-white px-8 py-2"
            disabled={loading}
          >
            No, cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Users, Plus, Edit2, Trash2, Upload, ExternalLink, 
  Check, X, ShieldCheck, Sparkles, RefreshCw, AlertCircle,
  Eye, ArrowUpRight, Image as ImageIcon, CheckCircle2
} from 'lucide-react';

const EMPTY_MEMBER = {
  id: '',
  name: '',
  role: '',
  category: 'leadership',
  bio: '',
  expertise: [],
  initials: '',
  image: '',
  linkedin: '',
  isCEO: false,
  order: 99
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'leadership' | 'core'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [skillsInput, setSkillsInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      if (data.success && Array.isArray(data.team)) {
        setTeam(data.team);
      }
    } catch (err) {
      showFeedback('error', 'Failed to fetch team data');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  const openAddModal = () => {
    setEditingMember({ ...EMPTY_MEMBER, id: '' });
    setSkillsInput('');
    setModalOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember({ ...member });
    setSkillsInput(Array.isArray(member.expertise) ? member.expertise.join(', ') : '');
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/team/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setEditingMember(prev => ({ ...prev, image: data.imageUrl }));
        showFeedback('success', 'Image uploaded successfully!');
      } else {
        showFeedback('error', data.error || 'Upload failed');
      }
    } catch (err) {
      showFeedback('error', 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!editingMember.name || !editingMember.role) {
      showFeedback('error', 'Name and Role are required.');
      return;
    }

    setSaving(true);
    const expertiseArray = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const calculatedInitials = editingMember.initials || 
      editingMember.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const payload = {
      member: {
        ...editingMember,
        initials: calculatedInitials,
        expertise: expertiseArray
      }
    };

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setTeam(data.team);
        setModalOpen(false);
        showFeedback('success', 'Team member updated successfully!');
      } else {
        showFeedback('error', data.error || 'Save failed');
      }
    } catch (err) {
      showFeedback('error', 'Error saving team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id, name) => {
    if (!confirm(`Are you sure you want to remove ${name} from the team?`)) return;

    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setTeam(data.team);
        showFeedback('success', `${name} removed from team.`);
      } else {
        showFeedback('error', data.error || 'Delete failed');
      }
    } catch (err) {
      showFeedback('error', 'Error deleting member');
    }
  };

  const filteredTeam = team.filter(m => {
    if (filter === 'leadership') return m.category === 'leadership';
    if (filter === 'core') return m.category === 'core';
    return true;
  });

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Toast Feedback */}
      {feedback.message && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold text-white animate-in fade-in slide-in-from-bottom-5 duration-300 ${feedback.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
          {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Users size={14} />
            <span>Personnel Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora tracking-tight">
            Team & Leadership Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage executive leadership and core team members. Changes reflect directly on the public About Us page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/about-us"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs"
          >
            <Eye size={14} />
            <span>View Public Page</span>
          </Link>
          <button
            onClick={openAddModal}
            className="btn-primary !px-5 !py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={16} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
          >
            All Members ({team.length})
          </button>
          <button
            onClick={() => setFilter('leadership')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'leadership' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Executive Leadership ({team.filter(m => m.category === 'leadership').length})
          </button>
          <button
            onClick={() => setFilter('core')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'core' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Core Team ({team.filter(m => m.category === 'core').length})
          </button>
        </div>

        <div className="text-xs text-gray-400 font-medium">
          Showing <span className="font-bold text-gray-700">{filteredTeam.length}</span> personnel
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 text-sm">
          <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-primary" />
          Loading team roster...
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
          <Users size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-800">No members found in this category</h3>
          <p className="text-xs text-gray-500 mt-1 mb-6">Click below to add someone to this section.</p>
          <button onClick={openAddModal} className="btn-primary !px-5 !py-2.5 text-xs font-bold uppercase tracking-wider">
            Add Team Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Avatar/Image & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    {member.image ? (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-blue-50 border border-primary/20 flex items-center justify-center font-black text-xl text-primary font-sora shadow-xs">
                        {member.initials || 'AT'}
                      </div>
                    )}
                    {member.isCEO && (
                      <span className="absolute -bottom-2 -right-1 bg-primary text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                        CEO
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${member.category === 'leadership' ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'}`}>
                      {member.category === 'leadership' ? 'Leadership' : 'Core Team'}
                    </span>
                    {member.linkedin ? (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[11px] font-semibold text-[#0077b5] hover:underline flex items-center gap-1"
                      >
                        LinkedIn <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400">No LinkedIn</span>
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-black text-gray-900 font-sora">{member.name}</h3>
                <span className="text-xs font-bold text-primary block mt-0.5 mb-2.5">{member.role}</span>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {member.bio || 'No bio specified.'}
                </p>

                {/* Expertise tags */}
                {member.expertise && member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.expertise.map((tag, i) => (
                      <span key={i} className="text-[10px] bg-gray-50 border border-gray-200/60 text-gray-600 font-medium px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-gray-200/70"
                >
                  <Edit2 size={13} />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id, member.name)}
                  className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors border border-red-200/50"
                  title="Remove Member"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {modalOpen && editingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900 font-sora">
                  {editingMember.id ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Update details, upload photos, or adjust title and role.
                </p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-5">
              {/* Photo Upload & Preview Row */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  {editingMember.image ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary shadow-xs">
                      <img src={editingMember.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-blue-50 border border-primary/30 flex items-center justify-center font-black text-2xl text-primary font-sora">
                      {editingMember.initials || editingMember.name.slice(0, 2).toUpperCase() || 'AT'}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-gray-800 block">Profile Photo (Optional)</span>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-all shadow-2xs"
                    >
                      <Upload size={13} />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload from PC'}</span>
                    </button>
                    {editingMember.image && (
                      <button
                        type="button"
                        onClick={() => setEditingMember(prev => ({ ...prev, image: '' }))}
                        className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all border border-red-200/50"
                      >
                        Remove / Use Initials
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste external image URL..."
                    value={editingMember.image || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    className="w-full text-[11px] p-2 bg-white rounded-lg border border-gray-200 text-gray-700 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    placeholder="e.g. Ayaz Khan"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    placeholder="e.g. Founder & CEO"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Category & Is CEO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">Category</label>
                  <select
                    value={editingMember.category || 'leadership'}
                    onChange={(e) => setEditingMember({ ...editingMember, category: e.target.value })}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-primary"
                  >
                    <option value="leadership">Executive Leadership</option>
                    <option value="core">Core Team Member</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                    <input
                      type="checkbox"
                      checked={editingMember.isCEO || false}
                      onChange={(e) => setEditingMember({ ...editingMember, isCEO: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span>Mark as CEO / Founder</span>
                  </label>
                </div>
              </div>

              {/* LinkedIn URL & Location for Google AI Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={editingMember.linkedin || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                    placeholder="https://www.linkedin.com/in/username"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-gray-700">Location (Google AI / SEO)</label>
                    <span className="text-[10px] text-gray-400">Hidden from user card UI</span>
                  </div>
                  <input
                    type="text"
                    value={editingMember.location || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, location: e.target.value })}
                    placeholder="Bengaluru, Karnataka, India"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Bio / Description</label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  placeholder="Brief summary of experience, expertise, and contribution..."
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 leading-relaxed focus:outline-none focus:border-primary"
                />
              </div>

              {/* Core Domains */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Core Domains / Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="React / Next.js, System Architecture, Node.js, Performance"
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary !px-6 !py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


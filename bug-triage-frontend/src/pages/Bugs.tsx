import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { bugService } from '../services/bugService';
import type { Bug } from "../types";

const Bugs: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [filteredBugs, setFilteredBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const data = await bugService.getAllBugs();
      setBugs(data);
      setFilteredBugs(data);
    } catch (err: any) {
      setError('Failed to load bugs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = bugs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (bug) =>
          bug.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bug.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((bug) => bug.status === statusFilter);
    }

    // Severity filter
    if (severityFilter) {
      filtered = filtered.filter((bug) => bug.severity === severityFilter);
    }

    setFilteredBugs(filtered);
  }, [searchTerm, statusFilter, severityFilter, bugs]);

  const handleDeleteBug = async (bugId: number | undefined) => {
    if (!bugId) return;

    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await bugService.deleteBug(bugId);
        fetchBugs();
      } catch (err: any) {
        alert('Failed to delete bug');
        console.error(err);
      }
    }
  };

  const getStatusBadgeColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'duplicate':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityBadgeColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-600">Loading bugs...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🐛 All Bugs</h1>
          <Link
            to="/create-bug"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            ➕ New Bug
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
            <option value="Duplicate">Duplicate</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Bugs Table */}
        {filteredBugs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No bugs found. {searchTerm && 'Try adjusting your search terms.'}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBugs.map((bug) => (
              <div key={bug.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="md:col-span-2">
                    <Link
                      to={`/bugs/${bug.id}`}
                      className="text-xl font-bold text-blue-600 hover:text-blue-700"
                    >
                      {bug.title}
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-2">{bug.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(bug.status)}`}>
                        {bug.status || 'Unknown'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Severity</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSeverityBadgeColor(bug.severity)}`}>
                        {bug.severity || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/bugs/${bug.id}`}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteBug(bug.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredBugs.length > 0 && (
          <div className="mt-6 text-sm text-gray-600">
            Showing {filteredBugs.length} of {bugs.length} bugs
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Bugs;

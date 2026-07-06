import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { bugService } from '../services/bugService';
import type { Bug, TriageResult } from "../types";

const CreateBug: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Bug>({
    title: '',
    description: '',
    environment: '',
    steps: '',
  });

  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    try {
      setLoading(true);
      const result = await bugService.triageBug(formData);
      setTriageResult(result);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to triage bug');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBug = async () => {
    try {
      setLoading(true);
      // The bug was already created during triaging
      navigate('/bugs');
    } catch (err: any) {
      setError('Failed to create bug');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📝 Create New Bug</h1>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-between">
          <div className={`flex-1 h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
            1
          </div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
            2
          </div>
          <div className="flex-1 h-1 bg-gray-300" />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Bug Details */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bug Details</h2>

            <form onSubmit={handleTriage} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bug Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a concise bug title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the bug in detail"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment
                </label>
                <input
                  type="text"
                  name="environment"
                  value={formData.environment}
                  onChange={handleInputChange}
                  placeholder="e.g., Windows 10, Chrome 120, Node 18"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Steps to Reproduce
                </label>
                <textarea
                  name="steps"
                  value={formData.steps}
                  onChange={handleInputChange}
                  placeholder="1. Step one&#10;2. Step two&#10;3. Expected result"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? 'Analyzing Bug...' : '🤖 Analyze & Triage'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Triage Results */}
        {step === 2 && triageResult && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Triage Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-2xl font-bold text-blue-600">{triageResult.status}</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <p className="text-sm text-gray-600 mb-1">Severity</p>
                <p className="text-2xl font-bold text-red-600">{triageResult.severity}</p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <p className="text-sm text-gray-600 mb-1">Priority</p>
                <p className="text-2xl font-bold text-yellow-600">{triageResult.priority}</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                <p className="text-sm text-gray-600 mb-1">Assigned Team</p>
                <p className="text-2xl font-bold text-purple-600">{triageResult.team}</p>
              </div>
            </div>

            {triageResult.reasoning && (
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 className="font-semibold text-gray-700 mb-2">AI Reasoning</h3>
                <p className="text-gray-600">{triageResult.reasoning}</p>
              </div>
            )}

            <div className="border-t pt-6 flex gap-4">
              <button
                onClick={() => {
                  setStep(1);
                  setTriageResult(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                ← Back
              </button>

              <button
                onClick={handleSubmitBug}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? 'Creating...' : '✅ Create Bug'}
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CreateBug;

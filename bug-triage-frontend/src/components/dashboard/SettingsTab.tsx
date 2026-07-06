import React, { useState } from 'react';
import './SettingsTab.css';
import {
  FaCog,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaToggleOn,
  FaToggleOff,
  FaSave,
} from 'react-icons/fa';

interface Setting {
  id: string;
  label: string;
  enabled: boolean;
}

const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'email-alerts',
      label: 'Email Notifications',
      enabled: true,
    },
    {
      id: 'slack-alerts',
      label: 'Slack Notifications',
      enabled: true,
    },
    {
      id: 'daily-report',
      label: 'Daily Report',
      enabled: false,
    },
    {
      id: 'critical-only',
      label: 'Critical Bugs Only',
      enabled: true,
    },
  ]);

  const [generalSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    autoRefresh: true,
  });

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-tab">
      <div className="settings-header">
        <h2>Settings & Preferences</h2>
        <p>Manage your system preferences and notifications</p>
      </div>

      {/* General Settings */}
      <div className="settings-section">
        <div className="section-header">
          <FaCog />
          <h3>General Settings</h3>
        </div>

        <div className="settings-grid">
          <div className="setting-item">
            <label>Theme</label>
            <select defaultValue={generalSettings.theme} className="setting-input">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Language</label>
            <select defaultValue={generalSettings.language} className="setting-input">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Timezone</label>
            <select defaultValue={generalSettings.timezone} className="setting-input">
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="CST">CST</option>
              <option value="PST">PST</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Auto Refresh</label>
            <select
              defaultValue={generalSettings.autoRefresh ? 'true' : 'false'}
              className="setting-input"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-section">
        <div className="section-header">
          <FaBell />
          <h3>Notifications</h3>
        </div>

        <div className="notification-list">
          {settings.map((setting) => (
            <div key={setting.id} className="notification-item">
              <div className="notification-info">
                <label>{setting.label}</label>
                <p>Get notified about {setting.label.toLowerCase()}</p>
              </div>

              <button
                className={`toggle-btn ${setting.enabled ? 'enabled' : 'disabled'}`}
                onClick={() => toggleSetting(setting.id)}
              >
                {setting.enabled ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-section">
        <div className="section-header">
          <FaShieldAlt />
          <h3>Security</h3>
        </div>

        <div className="security-options">
          <div className="security-item">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
            <button className="btn btn-secondary">Enable 2FA</button>
          </div>

          <div className="security-item">
            <h4>Change Password</h4>
            <p>Update your password regularly</p>
            <button className="btn btn-secondary">Change Password</button>
          </div>

          <div className="security-item">
            <h4>Active Sessions</h4>
            <p>Manage your active login sessions</p>
            <button className="btn btn-secondary">Manage Sessions</button>
          </div>
        </div>
      </div>

      {/* Data Settings */}
      <div className="settings-section">
        <div className="section-header">
          <FaDatabase />
          <h3>Data Management</h3>
        </div>

        <div className="data-options">
          <div className="data-item">
            <h4>Export Data</h4>
            <p>Export all your bug tracking data</p>
            <button className="btn btn-secondary">Export as CSV</button>
          </div>

          <div className="data-item">
            <h4>Clear Cache</h4>
            <p>Clear cached data to free up space</p>
            <button className="btn btn-secondary">Clear Now</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn btn-primary" onClick={handleSave}>
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;

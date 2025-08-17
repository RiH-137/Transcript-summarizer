'use client';
import { useState } from 'react';

export default function EmailSection({ summary, keyPoints = [] }) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  
  // email;from the data
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderPassword: '',
    recipientEmail: '',
    subject: 'Meeting Summary - MangoDesk',
    includeKeyPoints: true,
    emailProvider: 'gmail'
  });

  const emailProviders = [
    { value: 'gmail', label: 'Gmail', host: 'smtp.gmail.com', port: 587 },
    { value: 'outlook', label: 'Outlook', host: 'smtp-mail.outlook.com', port: 587 },
    { value: 'yahoo', label: 'Yahoo', host: 'smtp.mail.yahoo.com', port: 587 },
    { value: 'custom', label: 'Custom SMTP', host: '', port: 587 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendEmail = async () => {
    if (!formData.senderEmail || !formData.senderPassword || !formData.recipientEmail || !summary) {
      setMessage('Please fill in all required fields and ensure summary is generated');
      return;
    }

    setSending(true);
    setMessage('Sending email...');

    try {
      const emailBody = formatEmailBody();
      
      const response = await fetch('http://localhost:3001/send-email-with-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail: formData.senderEmail,
          senderPassword: formData.senderPassword,
          recipientEmail: formData.recipientEmail,
          subject: formData.subject,
          body: emailBody,
          provider: formData.emailProvider
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Email sent successfully!');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  const formatEmailBody = () => {
    let body = `Hello,

Please find the summary below:

---

${summary}`;

    if (formData.includeKeyPoints && keyPoints.length > 0) {
      body += `

---

KEY POINTS:

${keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`;
    }

    body += `

---

This summary was generated using MangoDesk.
Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

Best regards`;

    return body;
  };

  const hasContent = summary && summary.trim() && !summary.startsWith('Error:') && summary !== 'Generating summary...';

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
    
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-800">Email Summary</h3>
            {!hasContent && (
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                Generate summary first
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {message && (
              <span className="text-sm text-gray-600">{message}</span>
            )}
          </div>
        </div>
      </div>

      {/* form sec */}
      <div className="p-4 space-y-4">
          {!hasContent ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Generate a summary first to enable email functionality</p>
            </div>
          ) : (
            <>
              {/* integrating provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Provider
                </label>
                <select
                  value={formData.emailProvider}
                  onChange={(e) => handleInputChange('emailProvider', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
                  disabled={sending}
                >
                  {emailProviders.map(provider => (
                    <option key={provider.value} value={provider.value}>
                      {provider.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* sender cred added */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
                    disabled={sending}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    App Password Only*
                  </label>
                  <input
                    type="password"
                    value={formData.senderPassword}
                    onChange={(e) => handleInputChange('senderPassword', e.target.value)}
                    placeholder="Your email password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
                    disabled={sending}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For Gmail, use App Password instead of regular password
                  </p>
                </div>
              </div>

              {/* recep and subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                    placeholder="recipient@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
                    disabled={sending}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
                    disabled={sending}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeKeyPoints"
                  checked={formData.includeKeyPoints}
                  onChange={(e) => handleInputChange('includeKeyPoints', e.target.checked)}
                  className="h-4 w-4 text-[#417C7E] focus:ring-[#417C7E] border-gray-300 rounded"
                  disabled={sending}
                />
                <label htmlFor="includeKeyPoints" className="text-sm text-gray-700">
                  Include key points in email ({keyPoints.length} points)
                </label>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.startsWith('✅') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : message.startsWith('❌')
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {message}
                </div>
              )}

              {/* Send Button */}
              <div className="pt-2">
                <button
                  onClick={handleSendEmail}
                  disabled={sending || !formData.senderEmail || !formData.senderPassword || !formData.recipientEmail}
                  className="w-full px-4 py-2 bg-[#417C7E] text-white rounded-md hover:bg-[#2d5759] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* guide */}
              <div className="bg-green-50 border border-grey-600 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <div className="text-xs text-black">
                    <p className="font-medium mb-1">Guide:</p>
                    <p>Your email credentials are used only for this session and are not stored. For Gmail, use App Passwords instead of your main password. Visit Google Account Manager, search for App Passwords, set one there, and use that password here.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
    </div>
  );
}

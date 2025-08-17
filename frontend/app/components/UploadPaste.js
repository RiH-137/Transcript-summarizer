'use client';
import { useRef, useState } from 'react';

export default function UploadPaste({ onTextChange }) {
  const fileRef = useRef();
  const [preview, setPreview] = useState('');
  const [name, setName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    
    console.log('File selected:', f.name, f.type, f.size);
    
    setName(f.name);
    setIsUploading(true);
    setPreview('Processing your file...');
    setFileInfo({ name: f.name, size: f.size, type: f.type });
    
    try {
      const fd = new FormData();
      fd.append('file', f);

      // backend
      const res = await fetch('http://localhost:3001/upload', { 
        method: 'POST', 
        body: fd 
      });
      
      console.log('Upload response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `Upload failed: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Upload response data:', data);
      
      if (data.success) {
        setPreview(`✅ Successfully processed!`);
        setFileInfo(prev => ({ ...prev, wordCount: data.wordCount }));
        console.log('Calling onTextChange with text:', data.text?.substring(0, 100) + '...');
        onTextChange?.(data.text);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err) {
      let message = err.message;
      if (err instanceof TypeError && message === 'Failed to fetch') {
        message = 'Could not connect to backend. Is the server running at http://localhost:3001?';
      }
      console.error('Upload error:', err);
      setPreview(`Bro, Upload failed: ${message}`);
      setFileInfo(null);
      onTextChange?.('');
    } finally {
      setIsUploading(false);
    }
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getFileIcon(type) {
    if (type.includes('pdf')) return 'Pdf uploaded';
    if (type.includes('word') || type.includes('document')) return 'Word document uploaded';
    if (type.includes('text')) return 'Text file uploaded';
    if (type.includes('audio')) return 'Audio file uploaded';
    return 'File uploaded';
  }

  return (
    <div className="section-card-lg">
      <label className="label-text mb-4">Upload Document or Audio File</label>
      
      {/* Upload Area */}
      <div 
        className={`upload-zone ${isUploading ? 'dragover' : ''}`}
        onClick={() => !isUploading && fileRef.current?.click()}
      >
        <input 
          ref={fileRef} 
          type="file" 
          onChange={handleFile} 
          className="hidden" 
          accept=".txt,.pdf,.docx,.odt,.mp3,.wav,.m4a"
          disabled={isUploading}
        />
        
        <div className="space-y-3">
          <div className="text-4xl">
            {isUploading ? 'Uploading...' : 'Upload your file'}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isUploading ? 'Processing...' : 'Drop your file here or click to browse'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports: TXT, PDF, DOCX, ODT, MP3, WAV, M4A (Max: 100MB)
            </p>
          </div>
          
          {!isUploading && (
            <button 
              type="button"
              className="btn-primary"
            >
              Choose File
            </button>
          )}
        </div>
      </div>



      {fileInfo && (
        <div className="file-info-card">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getFileIcon(fileInfo.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 truncate">{fileInfo.name}</h4>
                <span className="text-xs text-gray-500">{formatFileSize(fileInfo.size)}</span>
              </div>
              {fileInfo.wordCount && (
                <p className="text-xs text-gray-600 mt-1">
                  {fileInfo.wordCount.toLocaleString()} words extracted
                </p>
              )}
              <div className={`text-sm mt-2 ${
                preview.startsWith('✅') ? 'text-green-600' : 
                preview.startsWith('❌') ? 'text-red-600' : 
                'text-blue-600'
              }`}>
                {preview}
              </div>
            </div>
          </div>
        </div>
      )}

     
      {isUploading && (
        <div className="mt-4">
          <div className="progress-bar">
            <div className="progress-fill animate-pulse" style={{width: '100%'}}></div>
          </div>
          <p className="text-xs text-gray-600 mt-1 text-center">Processing your file...</p>
        </div>
      )}
    </div>
  );
}

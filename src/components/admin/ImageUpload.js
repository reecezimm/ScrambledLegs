import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { uploadEventImage, validateImage } from '../../services/storage';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Preview = styled.div`
  position: relative;
  background: rgba(255,255,255,0.05);
  border: 1px dashed rgba(255,255,255,0.18);
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  width: ${(p) => (p.$banner ? '160px' : '72px')};
  height: ${(p) => (p.$banner ? '80px' : '72px')};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
`;

const PickBtn = styled.button`
  align-self: flex-start;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,199,44,0.30);
  background: rgba(255,199,44,0.10);
  color: #FFE66D;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover { background: rgba(255,199,44,0.20); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const ClearBtn = styled.button`
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.10);
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  cursor: pointer;
  &:hover { color: #FF8E8E; border-color: rgba(255,107,107,0.40); }
`;

const ProgressOuter = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressInner = styled.div`
  width: ${(p) => p.$pct || 0}%;
  height: 100%;
  background: linear-gradient(90deg, #FFC72C, #FF8800);
  transition: width 0.15s;
`;

const ErrorLine = styled.div`
  font-size: 12px;
  color: #FF8E8E;
`;

const Hidden = styled.input`
  display: none;
`;

// Props:
//   kind: 'rideLeader' | 'banner'
//   eventId: push key (required — used in storage path)
//   value: existing url string or empty
//   onChange(url): called when upload completes or image cleared
export function ImageUpload({ kind, eventId, value, onChange, label }) {
  const fileRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const isBanner = kind === 'banner';

  const onPick = () => {
    if (!eventId) {
      setError('Save the event once before uploading images');
      return;
    }
    fileRef.current && fileRef.current.click();
  };

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = '';

    const v = validateImage(file, kind);
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadEventImage({
        kind,
        eventId,
        file,
        onProgress: (pct) => setProgress(pct),
      });
      onChange && onChange(url);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onClear = () => {
    onChange && onChange('');
    setProgress(0);
    setError('');
  };

  return (
    <Wrap>
      <Row>
        <Preview $banner={isBanner}>
          {value ? <img src={value} alt={label || kind} /> : <span style={{ fontSize: 22, opacity: 0.4 }}>🥚</span>}
        </Preview>
        <Controls>
          <Row>
            <PickBtn type="button" onClick={onPick} disabled={uploading}>
              {value ? 'Replace image' : (uploading ? 'Uploading…' : 'Choose image')}
            </PickBtn>
            {value && !uploading && <ClearBtn type="button" onClick={onClear}>Remove</ClearBtn>}
          </Row>
          {uploading && (
            <ProgressOuter><ProgressInner $pct={progress} /></ProgressOuter>
          )}
          {!eventId && (
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
              Save the event first to enable image upload.
            </div>
          )}
          {error && <ErrorLine>{error}</ErrorLine>}
        </Controls>
      </Row>
      <Hidden
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFile}
      />
    </Wrap>
  );
}

export default ImageUpload;

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  min-height: 50px;
  align-items: center;

  &:focus-within {
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 6px 4px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
  background: rgba(255,199,44,0.12);
  border: 1px solid rgba(255,199,44,0.30);
  color: #FFE66D;
`;

const RemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.30);
  color: #FFE66D;
  cursor: pointer;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
  padding: 0;

  &:hover { background: rgba(255,107,107,0.55); color: #fff; }
`;

const Input = styled.input`
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  padding: 4px 2px;
  outline: none;

  &::placeholder { color: rgba(255,255,255,0.35); }
`;

export function TagInput({ value, onChange, placeholder }) {
  const tags = Array.isArray(value) ? value : [];
  const [draft, setDraft] = useState('');

  const addTag = (raw) => {
    const t = (raw || '').trim();
    if (!t) return;
    // Allow repeats? Skip if already there.
    if (tags.includes(t)) {
      setDraft('');
      return;
    }
    onChange([...tags, t]);
    setDraft('');
  };

  const removeAt = (i) => {
    const next = tags.slice();
    next.splice(i, 1);
    onChange(next);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === 'Backspace' && !draft && tags.length) {
      e.preventDefault();
      removeAt(tags.length - 1);
    }
  };

  const onBlur = () => {
    if (draft.trim()) addTag(draft);
  };

  return (
    <Wrap>
      {tags.map((t, i) => (
        <Chip key={`${t}-${i}`}>
          <span>{t}</span>
          <RemoveBtn type="button" aria-label={`Remove ${t}`} onClick={() => removeAt(i)}>×</RemoveBtn>
        </Chip>
      ))}
      <Input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={onBlur}
        placeholder={placeholder || "Add a tag, then Enter (e.g., '12 mi', '850 ft')"}
      />
    </Wrap>
  );
}

export default TagInput;

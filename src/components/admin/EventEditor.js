import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import MapPicker from './MapPicker';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import { createEvent, updateEvent, deleteEvent } from '../../services/events';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
`;

const BackBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.10); }
`;

const Title = styled.h2`
  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #FFE66D, #FFC72C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Card = styled.section`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 14px;

  @media (max-width: 480px) { padding: 14px 12px; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  &:last-child { margin-bottom: 0; }
`;

const LabelText = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFC72C;
`;

const Hint = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: -2px;
`;

const inputCss = `
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 2px solid rgba(255,199,44,0.20);
  background: rgba(255,255,255,0.06);
  color: #f4f4f4;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.35); }
  &:focus {
    outline: none;
    border-color: #FFC72C;
    box-shadow: 0 0 0 3px rgba(255,199,44,0.20);
    background: rgba(255,255,255,0.09);
  }
`;

const Input = styled.input`${inputCss}`;
const TextArea = styled.textarea`
  ${inputCss}
  resize: vertical;
  min-height: 96px;
  font-family: 'Inter', sans-serif;
`;
const Select = styled.select`
  ${inputCss}
  background: #1c1c1e;
  color-scheme: dark;
  option {
    background: #1c1c1e;
    color: #f4f4f4;
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Toggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  cursor: pointer;
  user-select: none;

  input { accent-color: #FFC72C; width: 18px; height: 18px; }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const SaveBtn = styled.button`
  padding: 14px 22px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(45deg, #FFC72C, #FF8800);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255,199,44,0.30);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255,199,44,0.42); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
`;

const DeleteLink = styled.button`
  background: transparent;
  border: none;
  color: #FF8E8E;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 4px;
  text-decoration: underline;

  &:hover { color: #FF6B6B; }
`;

const ErrorLine = styled.div`
  width: 100%;
  font-size: 12px;
  color: #FF8E8E;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 360px;
  background: #232325;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  margin: 0 0 6px;
  color: #f4f4f4;
`;

const ModalText = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin: 0 0 16px;
`;

const DangerBtn = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover { box-shadow: 0 6px 22px rgba(255,107,107,0.40); }
`;

const CancelBtn = styled.button`
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 10px;
`;

// Convert a unix ms timestamp to a value suitable for <input type="datetime-local">
// in the user's local timezone (YYYY-MM-DDTHH:mm).
function msToLocalInput(ms) {
  if (!ms || isNaN(ms)) return '';
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  const yr = d.getFullYear();
  const mo = pad(d.getMonth() + 1);
  const da = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yr}-${mo}-${da}T${hh}:${mm}`;
}

function localInputToMs(s) {
  if (!s) return null;
  const t = Date.parse(s);
  return isNaN(t) ? null : t;
}

function isHttpUrl(s) {
  if (!s) return true; // optional
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

const DIFFICULTIES = [
  { v: 'chill', label: 'Casual' },
  { v: 'race', label: 'Race pace' },
  { v: 'work', label: 'Trail work' },
  { v: 'custom', label: 'Custom' },
];

const DEFAULT_DIFFICULTY_LABEL = {
  chill: 'Casual',
  race: 'Race pace',
  work: 'Trail work',
  custom: '',
};

// Build initial form state from an existing event or defaults.
function buildState(existing) {
  const e = existing || {};
  const startInit = e.start || (() => {
    // Default to next Wednesday 5:45pm
    const d = new Date();
    const day = d.getDay();
    const daysUntilWed = (3 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilWed);
    d.setHours(17, 45, 0, 0);
    return d.getTime();
  })();

  const startLoc = e.startLoc || { lat: null, lng: null, label: '' };
  const endLoc = e.endLoc || null;
  const sameLoc = !endLoc ||
    (endLoc.lat === startLoc.lat && endLoc.lng === startLoc.lng);

  return {
    name: e.name || '',
    description: e.description || '',
    start: startInit,
    durationMinutes: e.durationMinutes || 120,
    startLoc: { ...startLoc },
    endLoc: endLoc ? { ...endLoc } : { lat: null, lng: null, label: '' },
    roundTrip: sameLoc,
    difficulty: e.difficulty || 'chill',
    difficultyLabel: e.difficultyLabel || '',
    tags: Array.isArray(e.tags) ? e.tags.slice() : [],
    rideLeader: {
      name: (e.rideLeader && e.rideLeader.name) || '',
      photoUrl: (e.rideLeader && e.rideLeader.photoUrl) || '',
    },
    bannerUrl: e.bannerUrl || '',
    routeUrl: e.routeUrl || '',
    unlocked: !!e.unlocked,
  };
}

function stateToPayload(state) {
  const start = typeof state.start === 'number' ? state.start : 0;
  const out = {
    name: state.name.trim(),
    description: state.description.trim(),
    start,
    durationMinutes: Number(state.durationMinutes) || 120,
    startLoc: {
      lat: state.startLoc.lat,
      lng: state.startLoc.lng,
      label: (state.startLoc.label || '').trim(),
    },
    endLoc: state.roundTrip
      ? {
          lat: state.startLoc.lat,
          lng: state.startLoc.lng,
          label: (state.startLoc.label || '').trim(),
        }
      : {
          lat: state.endLoc.lat,
          lng: state.endLoc.lng,
          label: (state.endLoc.label || '').trim(),
        },
    difficulty: state.difficulty || 'chill',
    difficultyLabel: state.difficulty === 'custom'
      ? (state.difficultyLabel || '').trim()
      : (state.difficultyLabel || DEFAULT_DIFFICULTY_LABEL[state.difficulty] || ''),
    tags: state.tags.filter(Boolean),
    rideLeader: (state.rideLeader.name || state.rideLeader.photoUrl)
      ? {
          name: state.rideLeader.name.trim(),
          photoUrl: state.rideLeader.photoUrl || '',
        }
      : null,
    bannerUrl: state.bannerUrl || '',
    routeUrl: (state.routeUrl || '').trim(),
    unlocked: !!state.unlocked,
  };
  return out;
}

export function EventEditor({ existing, onClose, onSaved, onDeleted }) {
  const isNew = !existing;
  const [state, setState] = useState(() => buildState(existing));
  const [eventId, setEventId] = useState(existing ? existing.id : null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Re-init if user navigates between events without unmounting
  useEffect(() => {
    setState(buildState(existing));
    setEventId(existing ? existing.id : null);
    setError('');
  }, [existing && existing.id, existing && existing.updatedAt]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const updateLeader = (patch) => setState((s) => ({ ...s, rideLeader: { ...s.rideLeader, ...patch } }));
  const updateStartLoc = (patch) => setState((s) => ({ ...s, startLoc: { ...s.startLoc, ...patch } }));
  const updateEndLoc = (patch) => setState((s) => ({ ...s, endLoc: { ...s.endLoc, ...patch } }));

  const validate = () => {
    if (!state.name.trim()) return 'Name is required';
    if (!state.description.trim()) return 'Description is required';
    if (!state.start) return 'Start date/time is required';
    if (state.startLoc.lat == null || state.startLoc.lng == null) return 'Start location pin is required';
    if (!state.startLoc.label.trim()) return 'Start location label is required';
    if (!state.roundTrip) {
      if (state.endLoc.lat == null || state.endLoc.lng == null) return 'End location pin is required (or toggle Round trip on)';
      if (!state.endLoc.label.trim()) return 'End location label is required';
    }
    if (state.difficulty === 'custom' && !state.difficultyLabel.trim()) {
      return 'Custom difficulty needs a label';
    }
    if (state.routeUrl && !isHttpUrl(state.routeUrl)) {
      return 'Route URL must be a valid http/https URL';
    }
    return null;
  };

  const onSave = async () => {
    const v = validate();
    if (v) { setError(v); return; }
    setError('');
    setSaving(true);
    try {
      const payload = stateToPayload(state);
      if (isNew && !eventId) {
        const id = await createEvent(payload);
        setEventId(id);
        onSaved && onSaved(id);
      } else {
        await updateEvent(eventId, payload);
        onSaved && onSaved(eventId);
      }
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const onConfirmDelete = async () => {
    if (!eventId) return;
    setDeleting(true);
    try {
      await deleteEvent(eventId);
      onDeleted && onDeleted(eventId);
    } catch (err) {
      setError(err.message || 'Delete failed');
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  };

  const headerName = useMemo(() => {
    if (state.name.trim()) return state.name.trim();
    return isNew ? 'New event' : 'Edit event';
  }, [state.name, isNew]);

  return (
    <Wrap>
      <TopBar>
        <BackBtn type="button" onClick={onClose}>← Back</BackBtn>
        <Title>{headerName}</Title>
        <span style={{ width: 60 }} />
      </TopBar>

      <Card id="event-editor-form">
        <Field>
          <LabelText htmlFor="ev-name">Name</LabelText>
          <Input
            id="ev-name"
            type="text"
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Lester Park Wednesday Roll"
          />
        </Field>

        <Field>
          <LabelText htmlFor="ev-desc">Description</LabelText>
          <TextArea
            id="ev-desc"
            value={state.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Casual social pace, ~12 miles, regroup at every fork…"
          />
        </Field>

        <TwoCol>
          <Field>
            <LabelText htmlFor="ev-start">Start date / time</LabelText>
            <Input
              id="ev-start"
              type="datetime-local"
              value={msToLocalInput(state.start)}
              onChange={(e) => update({ start: localInputToMs(e.target.value) })}
            />
            <Hint>Uses your device's timezone.</Hint>
          </Field>
          <Field>
            <LabelText htmlFor="ev-dur">Duration (min)</LabelText>
            <Input
              id="ev-dur"
              type="number"
              min="0"
              step="15"
              value={state.durationMinutes}
              onChange={(e) => update({ durationMinutes: e.target.value })}
            />
          </Field>
        </TwoCol>

        <TwoCol>
          <Field>
            <LabelText htmlFor="ev-diff">Difficulty</LabelText>
            <Select
              id="ev-diff"
              value={state.difficulty}
              onChange={(e) => {
                const v = e.target.value;
                update({
                  difficulty: v,
                  difficultyLabel: v === 'custom' ? state.difficultyLabel : DEFAULT_DIFFICULTY_LABEL[v] || '',
                });
              }}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.v} value={d.v}>{d.label}</option>
              ))}
            </Select>
          </Field>
          {state.difficulty === 'custom' && (
            <Field>
              <LabelText htmlFor="ev-diff-label">Custom label</LabelText>
              <Input
                id="ev-diff-label"
                type="text"
                value={state.difficultyLabel}
                onChange={(e) => update({ difficultyLabel: e.target.value })}
                placeholder="Hammer / Skills / Sufferfest…"
              />
            </Field>
          )}
        </TwoCol>

        <Field>
          <LabelText>Tags</LabelText>
          <TagInput
            value={state.tags}
            onChange={(tags) => update({ tags })}
            placeholder="Add a tag, then Enter (e.g., '12 mi', '850 ft')"
          />
        </Field>
      </Card>

      <Card>
        <Field>
          <LabelText>Start location</LabelText>
          <MapPicker
            value={state.startLoc}
            onChange={(loc) => updateStartLoc(loc)}
            doneTargetId="start-loc-label"
          />
        </Field>
        <Field>
          <LabelText htmlFor="start-loc-label">Start location label</LabelText>
          <Input
            id="start-loc-label"
            type="text"
            value={state.startLoc.label || ''}
            onChange={(e) => updateStartLoc({ label: e.target.value })}
            placeholder="Lester Park Trailhead"
          />
        </Field>

        <Field>
          <Toggle>
            <input
              type="checkbox"
              checked={state.roundTrip}
              onChange={(e) => update({ roundTrip: e.target.checked })}
            />
            <span>Round trip (end is same as start)</span>
          </Toggle>
        </Field>

        {!state.roundTrip && (
          <>
            <Field>
              <LabelText>End location</LabelText>
              <MapPicker
                value={state.endLoc}
                onChange={(loc) => updateEndLoc(loc)}
                doneTargetId="end-loc-label"
              />
            </Field>
            <Field>
              <LabelText htmlFor="end-loc-label">End location label</LabelText>
              <Input
                id="end-loc-label"
                type="text"
                value={state.endLoc.label || ''}
                onChange={(e) => updateEndLoc({ label: e.target.value })}
                placeholder="Brewer Park"
              />
            </Field>
          </>
        )}
      </Card>

      <Card>
        <Field>
          <LabelText htmlFor="ev-leader-name">Ride leader name</LabelText>
          <Input
            id="ev-leader-name"
            type="text"
            value={state.rideLeader.name}
            onChange={(e) => updateLeader({ name: e.target.value })}
            placeholder="Optional"
          />
        </Field>
        <Field>
          <LabelText>Ride leader photo</LabelText>
          <ImageUpload
            kind="rideLeader"
            eventId={eventId}
            value={state.rideLeader.photoUrl}
            onChange={(url) => updateLeader({ photoUrl: url })}
            label="Ride leader"
          />
        </Field>
      </Card>

      <Card>
        <Field>
          <LabelText>Banner image</LabelText>
          <ImageUpload
            kind="banner"
            eventId={eventId}
            value={state.bannerUrl}
            onChange={(url) => update({ bannerUrl: url })}
            label="Banner"
          />
          <Hint>If set, the public widget shows the banner instead of the map preview.</Hint>
        </Field>
        <Field>
          <LabelText htmlFor="ev-route">Route URL</LabelText>
          <Input
            id="ev-route"
            type="url"
            value={state.routeUrl}
            onChange={(e) => update({ routeUrl: e.target.value })}
            placeholder="https://www.strava.com/routes/…"
          />
        </Field>
      </Card>

      <Card>
        <Field>
          <LabelText>Visibility</LabelText>
          <Toggle>
            <input
              type="checkbox"
              checked={!!state.unlocked}
              onChange={(e) => update({ unlocked: e.target.checked })}
            />
            <span>Unlock for visitors {state.unlocked ? '🔓' : ''}</span>
          </Toggle>
          <Hint>
            When enabled, this event shows as a tappable card in the Coming Up
            list before its day arrives. Otherwise it stays locked until it
            becomes the next ride.
          </Hint>
        </Field>
      </Card>

      {error && <ErrorLine role="alert">{error}</ErrorLine>}

      <Footer>
        {!isNew && eventId ? (
          <DeleteLink type="button" onClick={() => setConfirmDelete(true)}>
            Delete event
          </DeleteLink>
        ) : <span />}
        <SaveBtn type="button" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : (isNew && !eventId ? 'Create event' : 'Save changes')}
        </SaveBtn>
      </Footer>

      {confirmDelete && (
        <ModalBackdrop onClick={() => !deleting && setConfirmDelete(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Delete this event?</ModalTitle>
            <ModalText>
              Delete <strong>{state.name || 'this event'}</strong>? This can't be undone.
            </ModalText>
            <div>
              <CancelBtn type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}>
                Cancel
              </CancelBtn>
              <DangerBtn type="button" onClick={onConfirmDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </DangerBtn>
            </div>
          </ModalCard>
        </ModalBackdrop>
      )}
    </Wrap>
  );
}

export default EventEditor;

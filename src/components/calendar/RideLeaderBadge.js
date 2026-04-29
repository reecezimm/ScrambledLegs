import React from 'react';
import styled, { keyframes } from 'styled-components';

const crownOrbit = keyframes`
  0%, 100% { transform: rotate(-30deg); }
  50%       { transform: rotate(30deg); }
`;

const crownShimmer = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(255,215,0,0.35))
            drop-shadow(0 2px 3px rgba(0,0,0,0.6))
            brightness(1) saturate(1);
  }
  50% {
    filter: drop-shadow(0 0 14px rgba(255,215,0,0.95))
            drop-shadow(0 0 5px rgba(255,255,200,0.65))
            drop-shadow(0 2px 3px rgba(0,0,0,0.6))
            brightness(1.35) saturate(1.4);
  }
`;

const Overlay = styled.div`
  position: absolute;
  right: 16px;
  top: 154px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;

  @media (max-width: 380px) {
    right: 12px;
    top: 158px;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  pointer-events: auto;

  @media (max-width: 380px) {
    width: 68px;
    height: 68px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  object-fit: cover;
  background: linear-gradient(135deg, #555, #333);
  display: block;
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.55), 0 0 0 2px #FFC72C;
  background: linear-gradient(135deg, #555, #333);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const CrownOrbit = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: ${crownOrbit} 5.5s ease-in-out infinite;
  transform-origin: 50% 50%;
`;

const Crown = styled.span`
  position: absolute;
  top: -27px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: ${crownShimmer} 1.8s ease-in-out infinite;

  @media (max-width: 380px) {
    top: -24px;
    font-size: 22px;
  }
`;

const Meta = styled.div`
  margin-top: 6px;
  text-align: center;
  pointer-events: none;
  max-width: 96px;
  width: 96px;

  @media (max-width: 380px) {
    max-width: 88px;
    width: 88px;
  }
`;

const Label = styled.span`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #FFC72C;
  text-shadow: 0 1px 4px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.8);
`;

const Name = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-family: 'Fredoka', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  color: #f4f4f4;
  text-shadow: 0 1px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.85);
  margin-top: 1px;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;

export default function RideLeaderBadge({ rideLeader }) {
  if (!rideLeader) return null;

  return (
    <Overlay>
      <Avatar>
        {rideLeader.photoUrl ? (
          <Photo src={rideLeader.photoUrl} alt={rideLeader.name} />
        ) : (
          <PhotoPlaceholder>🚴</PhotoPlaceholder>
        )}
        <CrownOrbit>
          <Crown>👑</Crown>
        </CrownOrbit>
      </Avatar>
      <Meta>
        <Label>Ride Leader</Label>
        <Name>{rideLeader.name}</Name>
      </Meta>
    </Overlay>
  );
}

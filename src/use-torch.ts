import { useCallback, useState } from 'react';

export const isTorchContraintApplied = (track: MediaStreamTrack) => {
  const allConstraints = track.getConstraints();
  const torchConstraint = allConstraints.advanced?.find((constraint) => (
    'torch' in constraint
  ));
  if (!torchConstraint) return false;
  return !!torchConstraint.torch;
};

export const enableTorch = (track: MediaStreamTrack) => {
  track.applyConstraints({
    advanced: [{ torch: true }],
  });
};

export const disableTorch = (track: MediaStreamTrack) => {
  track.applyConstraints({
    advanced: [{ torch: false }],
  });
};

export const toggleTorch = (track: MediaStreamTrack) => {
  const torch = isTorchContraintApplied(track);
  track.applyConstraints({
    advanced: [{ torch: !torch }]
  });
};

export const useTorch = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const requestTurnOn = useCallback(async () => {
    if (stream) {
      stream.getVideoTracks().forEach(enableTorch);
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      throw new Error('No camera found on this device.');
    }

    const camera = cameras[cameras.length - 1];
    const media = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: camera.deviceId,
        advanced: [{ torch: true }],
      },
    });

    setStream(media);
    media?.getVideoTracks().forEach(enableTorch);
  }, [stream]);

  const turnOff = useCallback(() => {
    stream?.getVideoTracks().forEach(disableTorch);
  }, [stream]);

  const toggleTorch = useCallback(() => {
    if (!stream) {
      return requestTurnOn();
    }
    stream?.getVideoTracks().forEach(toggleTorch);
  }, [requestTurnOn, stream]);

  return { requestTurnOn, turnOff, toggleTorch };
};

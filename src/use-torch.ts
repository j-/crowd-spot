import { useCallback, useEffect, useState } from 'react';

export const isTorchConstraintApplied = (track: MediaStreamTrack) => {
  const allConstraints = track.getConstraints();
  const torchConstraint = allConstraints.advanced?.find((constraint) => (
    'torch' in constraint
  ));
  if (!torchConstraint) return false;
  return !!torchConstraint.torch;
};

export const isTorchConstraintSupported = () => {
  return navigator.mediaDevices.getSupportedConstraints().torch;
};

export const trackEnableTorch = (track: MediaStreamTrack) => {
  track.applyConstraints({
    advanced: [{ torch: true }],
  });
};

export const streamEnableTorch = (stream: MediaStream) => {
  stream.getVideoTracks().forEach(trackEnableTorch);
};

export const trackDisableTorch = (track: MediaStreamTrack) => {
  track.applyConstraints({
    advanced: [{ torch: false }],
  });
};

export const streamDisableTorch = (stream: MediaStream) => {
  stream.getVideoTracks().forEach(trackDisableTorch);
};

export const trackToggleTorch = (track: MediaStreamTrack) => {
  const torch = isTorchConstraintApplied(track);
  track.applyConstraints({
    advanced: [{ torch: !torch }]
  });
};

export const streamToggleTorch = (stream: MediaStream) => {
  stream.getVideoTracks().forEach(trackToggleTorch);
};

export const useTorch = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [canTorch, setCanTorch] = useState(false);

  const requestTurnOn = useCallback(async () => {
    if (stream) {
      streamEnableTorch(stream);
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
    streamEnableTorch(media);
  }, [stream]);

  const turnOff = useCallback(() => {
    if (stream) {
      streamDisableTorch(stream);
    }
  }, [stream]);

  const toggleTorch = useCallback(() => {
    if (stream) {
      streamToggleTorch(stream);
    } else {
      return requestTurnOn();
    }
  }, [requestTurnOn, stream]);

  const destroyMedia = useCallback(() => {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    setCanTorch(isTorchConstraintSupported);
  }, []);

  return { canTorch, requestTurnOn, turnOff, toggleTorch, destroyMedia };
};

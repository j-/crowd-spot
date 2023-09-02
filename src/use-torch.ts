import { useCallback, useEffect, useState } from 'react';

export const isTorchConstraintApplied = (track: MediaStreamTrack) => {
  const allConstraints = track.getConstraints();
  const torchConstraint = allConstraints.advanced?.find((constraint) => (
    'torch' in constraint
  ));
  if (!torchConstraint) return false;
  return !!torchConstraint.torch;
};

export const isTorchConstraintSupported = () => (
  typeof navigator.mediaDevices !== 'undefined' &&
  typeof navigator.mediaDevices.getSupportedConstraints === 'function' &&
  navigator.mediaDevices.getSupportedConstraints().torch
);

export const trackEnableTorch = (track: MediaStreamTrack) => (
  track.applyConstraints({
    advanced: [{ torch: true }],
  })
);

export const streamEnableTorch = async (stream: MediaStream) => {
  await Promise.all(stream.getVideoTracks().map(trackEnableTorch));
};

export const trackDisableTorch = (track: MediaStreamTrack) => (
  track.applyConstraints({
    advanced: [{ torch: false }],
  })
);

export const streamDisableTorch = async (stream: MediaStream) => {
  await Promise.all(stream.getVideoTracks().map(trackDisableTorch));
};

export const trackToggleTorch = (track: MediaStreamTrack) => (
  track.applyConstraints({
    advanced: [{ torch: !isTorchConstraintApplied(track) }]
  })
);

export const streamToggleTorch = async (stream: MediaStream) => {
  await Promise.all(stream.getVideoTracks().map(trackToggleTorch));
};

export const useTorch = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [canTorch, setCanTorch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const destroyMedia = useCallback(() => {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
      setStream(null);
    }
  }, [stream]);

  const requestTurnOn = useCallback(async () => {
    if (stream) {
      return streamEnableTorch(stream);
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      throw new Error('No camera found on this device.');
    }

    const camera = cameras[cameras.length - 1];
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: camera.deviceId,
          advanced: [{ torch: true }],
        },
      });

      setStream(media);
      await streamEnableTorch(media);
    } catch (err) {
      if (err instanceof OverconstrainedError) {
        setIsDisabled(true);
        destroyMedia();
      }
    }
  }, [destroyMedia, stream]);

  const turnOff = useCallback(() => {
    if (stream) {
      return streamDisableTorch(stream);
    }
  }, [stream]);

  const toggleTorch = useCallback(() => {
    if (stream) {
      return streamToggleTorch(stream);
    } else {
      return requestTurnOn();
    }
  }, [requestTurnOn, stream]);

  useEffect(() => {
    setCanTorch(isTorchConstraintSupported);
  }, []);

  return {
    canTorch,
    destroyMedia,
    isDisabled,
    requestTurnOn,
    toggleTorch,
    turnOff,
  };
};

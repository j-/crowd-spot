import { useCallback, useState } from 'react';

export const useTorch = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const requestTurnOn = useCallback(async () => {
    const media = stream || await (
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          // @ts-ignore
          advanced: [{ torch: true }]
        },
      })
    );
    setStream(media);
  }, [stream]);

  const turnOff = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());
  }, [stream]);

  const toggleTorch = useCallback(() => {
    if (stream) {
      turnOff();
    } else {
      return requestTurnOn();
    }
  }, [requestTurnOn, stream, turnOff]);

  return { requestTurnOn, turnOff, toggleTorch };
};

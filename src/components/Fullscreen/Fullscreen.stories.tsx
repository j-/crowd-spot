import type { Meta } from '@storybook/react';

import Fullscreen, { FullscreenHandle } from './Fullscreen';
import { useRef } from 'react';

const meta: Meta<typeof Fullscreen> = {
  component: Fullscreen,
};

export default meta;

export const Primary = () => {
  const fullscreenElement = useRef<FullscreenHandle>(null);

  return (
    <>
      <button
        className="btn"
        type="button"
        onClick={() => {
          fullscreenElement.current?.show();
        }}
      >
        Show fullscreen
      </button>
      <Fullscreen ref={fullscreenElement}>
        <div style={{ height: '100%', backgroundColor: 'hsl(300, 80%, 80%)' }}>
          <button
            className="btn m-4"
            type="button"
            onClick={() => {
              fullscreenElement.current?.hide();
            }}
          >
            Hide fullscreen
          </button>
        </div>
      </Fullscreen>
    </>
  );
};

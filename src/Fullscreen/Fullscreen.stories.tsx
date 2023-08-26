import type { Meta, StoryObj } from '@storybook/react';

import Fullscreen, { FullscreenHandle } from './Fullscreen';
import { useRef } from 'react';

const meta: Meta<typeof Fullscreen> = {
  component: Fullscreen,
};

export default meta;

type Story = StoryObj<typeof Fullscreen>;

export const Primary: Story = {
  render: () => {
    const fullscreenElement = useRef<FullscreenHandle>(null);

    return (
      <>
        <button
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
  },
};

import type { Meta, StoryObj } from '@storybook/react';

import FullscreenFake, { FullscreenFakeHandle } from './FullscreenFake';
import { useRef } from 'react';

const meta: Meta<typeof FullscreenFake> = {
  component: FullscreenFake,
};

export default meta;

type Story = StoryObj<typeof FullscreenFake>;

export const Primary: Story = {
  render: () => {
    const fullscreenFakeElement = useRef<FullscreenFakeHandle>(null);

    return (
      <>
        <button
          type="button"
          onClick={() => {
            fullscreenFakeElement.current?.show();
          }}
        >
          Show fullscreen
        </button>
        <FullscreenFake ref={fullscreenFakeElement}>
          <div style={{ height: '100%', backgroundColor: 'hsl(200, 80%, 80%)' }}>
            <button
              type="button"
              onClick={() => {
                fullscreenFakeElement.current?.hide();
              }}
            >
              Hide fullscreen
            </button>
          </div>
        </FullscreenFake>
      </>
    );
  },
};

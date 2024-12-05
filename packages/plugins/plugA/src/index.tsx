import {
  HookContextType,
  useGlobalHook,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import React, { useEffect } from 'react';

export const PluginA = () => {
  const { do_action, add_hook } = useGlobalHook();

  const bootstrap = (_ctx: HookContextType) => {
    // Dome some thing with this;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents</div>;
      },
      'action',
      'PluginA'
    );

    add_hook(
      'abc',
      () => {
        return <div>hello</div>;
      },
      'action',
      'PluginA'
    );
  };

  useEffect(() => {
    do_action('abc');
  }, []);

  useRegisterPlugin({
    name: 'PluginA',
    author: 'Tam map',
    bootstrap,
  });
  return (
    //Evering will render here.
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      This is plugin A{do_action('swap')}
      {do_action('subtitle')}
    </div>
  );
};

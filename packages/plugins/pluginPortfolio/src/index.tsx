import { useGlobalHook, useRegisterPlugin } from '@repo/plugin-sdk';
import React from 'react';
import Portfolio from './components/Portfolio';

export const PluginPortfolio = () => {
  const { add_hook } = useGlobalHook();

  const bootstrap = () => {
    //This fn can be extracted;
    add_hook(
      'subtitle',
      () => {
        return <div>Plugin contents</div>;
      },
      'action',
      'PluginPortfolio'
    );
  };

  useRegisterPlugin({
    name: 'PluginPortfolio',
    author: 'Dangvu',
    bootstrap,
  });
  return (
    <div className="border rounded-lg p-4 border-dividerColorDefault">
      This is Plugin Portfolio
      <Portfolio />
    </div>
  );
};

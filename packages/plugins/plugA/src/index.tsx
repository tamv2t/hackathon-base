'use client';
import {
  ActionContextType,
  useGlobalAction,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import React from 'react';

export const PluginA = () => {
  const { do_action, add_action } = useGlobalAction();

  const bootstrap = (_ctx: ActionContextType) => {
    // Dome some thing with this;
    add_action(
      'subtitle',
      () => {
        return <div>Plugin contents</div>;
      },
      'action',
      'PluginA'
    );
  };

  useRegisterPlugin({
    name: 'PluginA',
    author: 'Tam map',
    bootstrap,
  });
  return (
    //Evering will render here.
    <div className="border rounded-lg p-4">
      This is plugin A{do_action('swap')}
      {do_action('subtitle')}
    </div>
  );
};

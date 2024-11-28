'use client';
import {
  useGlobalAction,
  usePluginHelper,
  useRegisterPlugin,
} from '@repo/plugin-sdk';
import { useEffect } from 'react';
import { SwapForm } from './components/SwapForm';
import React from 'react';
import Card, { TCard } from './components/Card';

// Delete me
export const PluginB = () => {
  const { add_action, do_action, apply_filter } = useGlobalAction();
  const { register } = usePluginHelper();

  const bootstrap = () => {
    //This fn can be extracted;
    add_action(
      'swap',
      () => {
        return <SwapForm />;
      },
      'action',
      'PluginB'
    );

    add_action(
      'subtitle',
      () => {
        return <div>One more things</div>;
      },
      'action',
      'PluginB'
    );
    add_action(
      'subtitle',
      () => {
        return <div>One more thing 2222s</div>;
      },
      'action',
      'PluginB'
    );
  };

  const renderCard = () => {
    const _cardContent = apply_filter('change_content_card');
    return (
      <div>
        {_cardContent.map((item: TCard, index: number) => (
          <Card item={item} key={index} />
        ))}
      </div>
    );
  };
  useRegisterPlugin({
    name: 'PluginB',
    author: 'Tammap',
    bootstrap,
  });
  return (
    //Evering will render here.
    <div className="border rounded-lg p-4">
      This is plugin B{renderCard()}
      {do_action('subtitle')}
    </div>
  );
};

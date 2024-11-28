'use client';
import { useGlobalAction, usePluginHelper } from '@repo/plugin-sdk';
import { useEffect } from 'react';
import { SwapForm } from './components/SwapForm';
import React from 'react';
import Card from './components/Card';

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
      'action'
    );

    add_action(
      'subtitle',
      () => {
        return <div>One more things</div>;
      },
      'action'
    );
    add_action(
      'subtitle',
      () => {
        return <div>One more thing 2222s</div>;
      },
      'action'
    );
  };

  const renderCard = () => {
    const _cardContent = apply_filter('change_content_card');
    return (
      <div>
        {_cardContent.map((item: any, index: number) => (
          <Card item={item} key={index} />
        ))}
      </div>
    );
  };
  useEffect(() => {
    register({
      name: 'PluginB',
      author: 'Tammap',
      bootstrap,
    });
  }, []);
  return (
    //Evering will render here.
    <div className="border rounded-lg p-4">
      This is plugin B{renderCard()}
      {do_action('subtitle')}
    </div>
  );
};

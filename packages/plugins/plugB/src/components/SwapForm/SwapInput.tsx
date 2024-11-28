import React from 'react';
import { useGlobalAction } from '@repo/plugin-sdk';
import { Input } from '@repo/ui';
import { useState } from 'react';
const renderInput = () => {
  const { apply_filter, has_action } = useGlobalAction();
  const [formattedValue, setFormattedValue] = useState<string>('');

  if (has_action('format_input')) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value;
      const newFormattedValue = apply_filter('format_input', rawValue);
      console.log('Formatted Input:', newFormattedValue.join(''));
      setFormattedValue(newFormattedValue);
    };

    return (
      <Input
        type="text"
        placeholder="0.0"
        className="flex-1 h-7"
        value={formattedValue}
        onChange={handleInputChange}
      />
    );
  }

  return <Input type="text" placeholder="0.0" className="flex-1 h-7" />;
};
const SwapInput = () => {
  const { do_action } = useGlobalAction();
  return (
    <div className="flex-col justify-between gap-2 container-miniswap">
      <div className="flex items-center justify-between w-full">
        {renderInput()}
      </div>
      {do_action('infor_token_swap')}
    </div>
  );
};
export default SwapInput;

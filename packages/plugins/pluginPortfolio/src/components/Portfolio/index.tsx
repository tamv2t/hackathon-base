import { Button, Icon, Input } from '@repo/ui';
import React, { useState } from 'react';
import { mockUserInfo } from '../../mocks';
import { TUserInfo } from '../../types';

const Portfolio = () => {
  //STATES
  const [results, setResults] = useState<TUserInfo[]>([]);
  const [inputAddress, setInputAddress] = useState('');
  //CONST
  const _addressList = Array.from(
    new Set(mockUserInfo.map((user) => user.address))
  );

  const handleSearchData = () => {
    const _res = mockUserInfo.filter((user) => user.address === inputAddress);
    setResults(_res);
  };

  return (
    <section>
      <div className="flex gap-x-2 text-sm">
        <div className="border border-backgroundInput rounded-lg flex items-center px-3 py-1 gap-2 hover:border-textLink flex-1">
          <Icon name="app_search_left" />
          <Input
            placeholder="Search address..."
            onChange={(e) => setInputAddress(e.target.value)}
          />
        </div>
        <Button disabled={inputAddress.length === 0} onClick={handleSearchData}>
          Search
        </Button>
      </div>
      <div className="py-4">
        {results.length === 0 ? (
          <p>No data found!</p>
        ) : (
          results.map((item, index) => (
            <div
              className="flex gap-x-2 items-center mb-1 border-b border-backgroundWrapper"
              key={index}
            >
              <img
                src={item.imgToken}
                alt="img_token"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex gap-x-2 flex-1 justify-between">
                <div>
                  <p>{item.name}</p>
                  <p>{item.balance}</p>
                </div>
                <p
                  className={`${item.percentChange < 0 ? 'text-red-500' : 'text-green-500'}`}
                >
                  {item.percentChange}%
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        List data address
        {_addressList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;

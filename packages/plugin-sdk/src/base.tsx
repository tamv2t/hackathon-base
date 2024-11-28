//This function will be create on another services
import React, { FC, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
export interface ActionContextType {
  add_action: (
    name: string,
    callback: Function,
    type: 'action' | 'filter'
  ) => void;
  remove_action: (name: string) => void;
  do_action: (name: string, ...args: any[]) => any;
  has_action: (name: string) => boolean;
  apply_filter: (name: string, ...args: any[]) => any;
}

export const ActionContext = React.createContext<ActionContextType>(
  {} as ActionContextType
);

export const ActionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [actions, setActions] = React.useState<any>({});
  console.log(`🐳 -> actions`, actions);

  const add_action = (
    name: string,
    callback: Function,
    type: 'action' | 'filter'
  ) => {
    const id = uuidv4();
    setActions((prev: any) => {
      const _next = prev[name] ?? [];
      return {
        ...prev,
        [name]: [..._next, { id, callback, type }],
      };
    });
  };

  const remove_action = (id: string) => {
    setActions((prev: any) => {
      const updatedActions = { ...prev };
      for (const key in updatedActions) {
        updatedActions[key] = updatedActions[key].filter(
          (action: any) => action.id !== id
        );
      }
      return updatedActions;
    });
  };

  const do_action = (name: string, ...args: any[]) => {
    const _actionsList = actions[name] ?? [];

    return _actionsList.map((item: any) => {
      return item.callback(...args);
    });
  };

  const has_action = (name: string) => {
    return !!actions[name];
  };

  const apply_filter = (name: string, ...args: any) => {
    //alias for do-action
    return do_action(name, args);
  };

  return (
    <ActionContext.Provider
      value={{
        add_action,
        remove_action,
        do_action,
        has_action,
        apply_filter,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useGlobalAction = () => React.useContext(ActionContext);

"use client";
import {
  actions,
  addAction,
  currentAction,
  didAction,
  doAction,
  doingAction,
  hasAction,
  removeAction,
} from "@repo/hooks";
import { Button } from "@repo/ui/components/ui/button";
export default function Page(): JSX.Element {
  function addDeprecationAlert() {
    console.log(`Deprecation: abcccc`);
  }
  addAction(
    "deprecated",
    "my-plugin/add-deprecation-alert",
    addDeprecationAlert
  );
  const handleAddAction = () => {
    doAction("deprecated");
  };
  const hanldeRemoveAction = () => {
    removeAction("deprecated", "my-plugin/add-deprecation-alert");
  };
  const checkStatusAction = () => {
    console.log({
      hasAction: hasAction("deprecated", "my-plugin/add-deprecation-alert"),
      actions,
      doingAction: doingAction("deprecated"),
      didAction: didAction("deprecated"),
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleAddAction}>Add action</Button>
      <Button onClick={hanldeRemoveAction}>Remove action</Button>
      <Button onClick={checkStatusAction}>Check status action</Button>
    </div>
  );
}

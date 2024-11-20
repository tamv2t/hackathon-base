import { Input } from "@repo/ui/components/ui/input";

const SwapInput = () => {
  return (
    <div className="flex-col justify-between gap-2 container-miniswap">
      <div className="flex items-center justify-between w-full">
        <Input type="text" placeholder="0.0" className="flex-1 h-7" />
      </div>
      <div className="flex items-center justify-between w-full text-sm text-textContentSpecial">
        <p className="">$0</p>
        <div className="flex items-center gap-2">
          <span>Balance:</span>
          <span className="text-xs text-primaryButton">0</span>
        </div>
      </div>
    </div>
  );
};
export default SwapInput;

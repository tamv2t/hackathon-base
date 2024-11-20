"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  actions,
  addAction,
  addFilter,
  applyFilters,
  currentFilter,
  didAction,
  didFilter,
  doAction,
  doingFilter,
  filters,
  hasAction,
  hasFilter,
} from "@repo/hooks";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@repo/ui/components/ui/form";
import { Icon } from "@repo/ui/components/ui/icon";
import { Input } from "@repo/ui/components/ui/input";
import { Slider } from "@repo/ui/components/ui/slider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { calculatePrice } from "../../utils/caculation";
import { formatNumber } from "../../utils/formatNumber";
import ControlPanel from "./ControlPanel";
import { useState } from "react";

interface SwapInforProps {
  title: string;
  panel: React.ReactNode;
}
const formSchema = z.object({
  tokenFirst: z.string().min(1, { message: "Token First is required." }),
  tokenSecond: z.string().min(1, { message: "Token Second is required." }),
});
const SwapInfor: React.FC<SwapInforProps> = ({ title, panel }) => {
  return (
    <div className="flex flex-col mt-2 gap-y-2">
      <div className="flex items-center justify-between text-sm">
        <p className="text-textContentSpecial">{title}</p>
        <div className="flex gap-1">{panel}</div>
      </div>
    </div>
  );
};
const SwapForm = () => {
  const [result, setResult] = useState<number>(0);
  const priceInfor = [
    {
      title: "Rate",
      panel: () => (
        <div className="flex items-center justify-end col-span-2 gap-1 text-right">
          <span className="uppercase">1 C98 = 0.0002 BNB</span>
        </div>
      ),
    },
    {
      title: "Price Impact",
      panel: () => <span>-</span>,
    },
    {
      title: "Gwei",
      panel: () => <span>Standard: 1</span>,
    },
  ];
  const feeInfor = [
    {
      title: "Estimated Gas Fee",
      panel: () => <span>0.00015 BNB ~ $0.09</span>,
    },
    {
      title: "Liquidity Fee",
      panel: () => <span>-</span>,
    },
    {
      title: "Platform Fee",
      panel: () => <span>-</span>,
    },
    {
      title: "UI Fee",
      panel: () => <span>-</span>,
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenFirst: "",
      tokenSecond: "",
    },
  });

  addFilter("format_number", "plugin-format-number", formatNumber);
  addAction("calculatePrice", "plugin-number", calculatePrice);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const multipliedResult = doAction(
      "calculatePrice",
      Number(values.tokenFirst),
      Number(values.tokenSecond)
    );
    const res = applyFilters("format_number", multipliedResult);
    setResult(res);
  }

  // const onRenderCustomizable = () => {
  //   const amount = 12312312312;

  //   if (get_actions["injected_xxx"]) {

  //   }

  //   return
  // }

  return (
    <div className="duration-300 visible rounded-lg self-start p-4 bg-backgroundChild xl:w-[486px] w-full text-textTitle mx-auto">
      <ControlPanel />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-1 my-3"
        >
          <FormField
            control={form.control}
            name="tokenFirst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input amount</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="button"
            className="self-center rounded-full cursor-pointer size-9 bg-backgroundInput all-center group"
          >
            <p className="transition-all duration-500 group-hover:rotate-180">
              <Icon name="app_swap" className="text-2xl" />
            </p>
          </button>

          <FormField
            control={form.control}
            name="tokenSecond"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input amount</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {priceInfor.map((item) => (
            <SwapInfor
              title={item.title}
              panel={item.panel()}
              key={item.title}
            />
          ))}

          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="px-2 my-2"
          />

          {feeInfor.map((item) => (
            <SwapInfor
              title={item.title}
              panel={item.panel()}
              key={item.title}
            />
          ))}

          <Button className="mt-4" type="submit">
            Swap
          </Button>
        </form>
      </Form>
      Result:{result}
    </div>
  );
};

export default SwapForm;
// const checkStatusFilter = () => {
//   console.log({
//     hasFilter: hasFilter("format_number", "plugin-format-number"),
//     hasAction: hasAction("calculatePrice", "plugin-number"),
//     filters,
//     actions,
//     doingFilter: doingFilter("format_number"),
//     didFilter: didFilter("format_number"),
//     didAction: didAction("calculatePrice"),
//     currentFilter: currentFilter("format_number"),
//   });
// };

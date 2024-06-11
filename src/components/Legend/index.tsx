export function Legend({ colors, categories }: any) {
  return (
    <div className="flex flex-col gap-2 items-start">
      {categories.map((e: any, index: number) => {
        return (
          <div
            key={e}
            className="flex items-center justify-start gap-2 text-left"
          >
            <div
              className={`h-[7px] w-[7px] flex-shrink-0 flex-grow-0 rounded-sm bg-${colors[index]}-700`}
            ></div>
            <span className="text-zinc-700 text-sm whitespace-nowrap">{e}</span>
          </div>
        );
      })}
    </div>
  );
}

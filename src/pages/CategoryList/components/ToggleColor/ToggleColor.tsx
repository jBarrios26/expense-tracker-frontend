import React from 'react';
import { useDropdownToggle } from 'react-overlays';
function ToggleColor({ id, color }: { id: string; color: string }) {
  const [props] = useDropdownToggle();
  return (
    <div className=" flex h-full items-center justify-center rounded-2xl border-2 p-2">
      <button
        className="w-24 rounded-lg px-2 text-sm md:w-full"
        style={{ backgroundColor: color }}
        {...props}
        id={id}
        type="button"
      >
        {color ?? 'Pick Color'}
      </button>
    </div>
  );
}

export default ToggleColor;

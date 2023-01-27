import React from 'react';
import { Dropdown } from 'react-overlays';
import { MenuColor } from '../MenuColor';
import { ToggleColor } from '../ToggleColor';

function DropdownColorButton({
  show,
  onToggle,
  color,
  onChangeColor,
}: {
  show: boolean;
  onToggle: (nextShow: boolean) => void;
  color: string;
  onChangeColor: (color: string) => void;
}) {
  return (
    <Dropdown
      show={show}
      onToggle={onToggle}
      itemSelector="button:not(:disabled)"
    >
      <div className="relative inline-block md:w-1/3">
        <ToggleColor id="example-toggle" color={color} />
        <MenuColor onChangeColor={onChangeColor} color={color} />
      </div>
    </Dropdown>
  );
}

export default DropdownColorButton;

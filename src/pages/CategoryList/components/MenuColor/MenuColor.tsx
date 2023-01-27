import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDropdownMenu } from 'react-overlays';
import { classNames } from '../../../../util/classnames';

function MenuColor({
  onChangeColor,
  color,
}: {
  color: string;
  onChangeColor: (color: string) => void;
}) {
  const [menuProps, { show }] = useDropdownMenu({
    flip: true,
    offset: [0, 12],
  });
  return (
    <div
      {...menuProps}
      className={classNames(
        'absolute left-0 rounded-lg bg-dark-gray p-3 shadow-xl',
        show ? 'block' : 'hidden'
      )}
    >
      <HexColorPicker
        color={color}
        onChange={(newColor) => {
          onChangeColor(newColor);
        }}
      />
    </div>
  );
}

export default MenuColor;

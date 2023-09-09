import React from 'react';

import classNames from 'classnames/bind';
import styles from './Text.module.scss';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'small' | 'xs';

export type TextColor = 'primary' | 'secondary' | 'hint' | 'success' | 'warning' | 'error';

export type TextAlignments = 'left' | 'center' | 'right' | 'justify';

export type TextWeights = 'normal' | 'bold' | 'light';

const cx = classNames.bind(styles);

interface TextProps extends React.ComponentPropsWithRef<'span'> {
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlignments;
  weight?: TextWeights;
  as?: keyof HTMLElementTagNameMap;
}

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  as,
  align,
  weight,
  className,
  ...htmlProps
}: TextProps) => {
  const props = {
    ...htmlProps,
    className: cx(variant, color, align, weight, className),
  };

  return React.createElement(as ?? 'p', props, props.children);
};

export default Text;

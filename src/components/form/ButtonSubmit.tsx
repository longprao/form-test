import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { FC } from 'react';

type Props = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
};

const ButtonSubmit: FC<Props> = ({
  title,
  disabled = false,
  loading = false,
  type = 'submit',
  className = 'btn btn-primary',
}) => {
  return (
    <button type={type} className={clsx(className, { disabled })} disabled={loading}>
      {loading ? <FontAwesomeIcon icon="spinner" spin /> : title}
    </button>
  );
};

export default ButtonSubmit;

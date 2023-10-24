/*
 *  Copyright 2023 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { ReactComponent as UncheckedEnabled } from '../../../../assets/images/unchecked-enabled.svg';
import { ReactComponent as CheckedEnabled } from '../../../../assets/images/checked-enabled.svg';

export default function IconDescriptionCheckboxListItem({
  listItemKey,
  icon,
  label,
  onClick,
  selected,
  className,
  description,
  ...props
}) {
  return (
    <div
      key={listItemKey}
      onClick={onClick}
      className={clsx(className, styles.listItem, selected && styles.listItem__selected)}
      {...props}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.content_label}>{label}</div>
        {description && <div className={styles.content_description}>{description}</div>}
      </div>
      {selected ? (
        <CheckedEnabled className={styles.checkbox} />
      ) : (
        <UncheckedEnabled className={styles.checkbox} />
      )}
    </div>
  );
}

IconDescriptionCheckboxListItem.propTypes = {
  listItemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  className: PropTypes.string,
};

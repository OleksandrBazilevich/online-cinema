import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'

import { SkeletonLoader } from '../../SkeletonLoader'
import styles from '../Form.module.scss'
import { IUploadField } from '../form.types'

import { useUpload } from './useUpload'

export const UploadField: FC<IUploadField> = ({
  error,
  folder,
  value,
  style,
  onChange,
  placeholder,
  isNoImage = false,
}) => {
  const { isLoading, uploadFile } = useUpload(onChange, folder)
  return (
    <div className={cn(styles.field, styles.uploadField)} style={style}>
      <div className={styles.uploadFlex}>
        <label>
          <span>{placeholder}</span>
          <input type="file" onChange={uploadFile} />
          {error && <div className={styles.error}>{error.message}</div>}
        </label>
        {!isNoImage && (
          <div className={styles.uploadImageContainer}>
            {isLoading ? (
              <SkeletonLoader count={1} className="w-full h-full" />
            ) : (
              value && <Image src={value} alt="image" layout="fill" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

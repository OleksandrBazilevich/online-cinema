import cn from 'classnames'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import styles from './Form.module.scss'
import { ITextEditor } from './form.types'

export const TextEditor: FC<ITextEditor> = ({
  onChange,
  value,
  placeholder,
  error,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  )
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  useEffect(() => {
    if (isUpdated) return

    const defaultValue = value || ''
    const blocksFromHtml = htmlToDraft(defaultValue)

    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    )

    const newEditorState = EditorState.createWithContent(contentState)
    setEditorState(newEditorState)
  }, [isUpdated, value])

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true)
    setEditorState(editorState)

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className={cn(styles.common, styles.editorWrapper, 'animate-fade')}>
      <label>
        <span>{placeholder}</span>
        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['inline', 'list'],
              inline: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ['bold', 'italic', 'underline', 'strikethrough'],
                bold: { className: undefined },
                italic: { className: undefined },
                underline: { className: undefined },
                strikethrough: { className: undefined },
              },
              list: {
                inDropdown: false,
                options: ['unordered', 'ordered'],
              },
            }}
          />
        </div>
        {error && <div className={styles.error}>{error.message}</div>}
      </label>
    </div>
  )
}
